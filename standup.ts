require("dotenv").config();
import * as _ from "lodash";
import { getIssues, getCommentsToday, getCommits } from "./github";
import { send } from "./slack";
import * as moment from "moment";

(async () => {
  try {
    const issues = await getIssues();
    for (const issue of issues) {
      let commitMessages: string[] = [];

      const meta = _.first(issue.body.split(/\r|\n/));
      if (meta && meta.match(/^BRANCH:/)) {
        const [, branch] = _.trim(meta).split(/:/);

        const commits = await getCommits(branch);
        const nonMergeCommits = commits.filter(c => !c.message.match(/^Merge/));
        const todaysCommits = nonMergeCommits.filter(c =>
          c.comittedAt.isSame(moment(), "day")
        );

        if (todaysCommits.length) {
          commitMessages.push(`\t_*code changes:*_\n`);
          for (const commit of todaysCommits) {
            commitMessages.push(
              `\t\t• _${commit.message} _ (\`${commit.sha.substr(0, 7)}\`)\n`
            );
          }
        }
      }

      const comments = await getCommentsToday(issue.number);
      const statusUpdates = comments.filter(c => c.body.match(/^Status:/g));

      if (!statusUpdates.length) {
        continue;
      }

      const messages: String[] = [`*${issue.title}*:\n`];

      for (const update of statusUpdates) {
        messages.push(
          `\t• _${update.body.replace(
            /^Status: /g,
            ""
          )} _ (${update.createdAt.format("h:mm a")})\n`
        );
      }

      if (commitMessages.length) messages.push(commitMessages.join(""));
      send(messages.join(""));
    }
  } catch (error) {
    console.error(error);
  }
})();

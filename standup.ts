require("dotenv").config();
import * as _ from "lodash";
import { getIssues, getCommentsToday, getCommits } from "./github";
import { send } from "./slack";
import * as moment from "moment";
import { getPRsReviewedToday } from "./reports";

(async () => {
  try {
    const issues = await getIssues();
    const posts: string[] = [];
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
      let statusUpdates = comments.filter(c => c.body.match(/^Status:/g));

      if (!statusUpdates.length && issue.title !== "Team lead stuff") {
        continue;
      }

      const messages: String[] = [`*${issue.title}*:\n`];

      for (const update of statusUpdates) {
        const updateBody = update.body.replace(/^Status: /g, "");
        messages.push(`\t• _ ${updateBody} _ \n`);
      }

      if (issue.title === "Team lead stuff") {
        const prs = _.reverse(await getPRsReviewedToday());
        for (const pr of prs) {
          const review = _.last(pr.reviews);
          if (!review) continue;

          let reviewStatus = ":nocomment:";
          switch (review.status) {
            case "COMMENTED":
              reviewStatus = ":awesomeface-disapprove:";
              break;
            case "APPROVED":
              reviewStatus = ":approved:";
              break;
            case "CHANGES_REQUESTED":
              reviewStatus = ":notapproved:";
              break;
            default:
              throw new Error("Unhandled status: " + review.status);
          }

          messages.push(`\t• _ Reviewed ${pr.title} _  ${reviewStatus} \n`);
        }
      }

      if (commitMessages.length) messages.push(commitMessages.join(""));
      posts.push(messages.join(""));
    }

    if (posts.length) {
      send(posts.join("\n"));
    }
  } catch (error) {
    console.error(error);
  }
})();

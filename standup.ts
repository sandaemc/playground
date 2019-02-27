require("dotenv").config();
import * as _ from "lodash";
import { getIssues, getCommentsToday } from "./github";
import { send } from "./slack";
import * as moment from "moment";

(async () => {
  try {
    const issues = await getIssues();
    console.log(issues);
    for (const issue of issues) {
      const comments = await getCommentsToday(issue.number);
      const statusUpdates = comments.filter(c => c.body.match(/^Status:/g));

      if (!statusUpdates.length) {
        continue;
      }

      const messages: String[] = [
        `*Status update for ${issue.title} as of ${moment().format(
          "YYYY-MM-DD"
        )}*:\n`
      ];
      for (const update of statusUpdates) {
        messages.push(
          ` * _${update.body.replace(
            /^Status: /g,
            ""
          )}_ (${update.createdAt.format("h:mm a")})\n`
        );
      }

      send(messages.join(""));
      console.log(messages.join(""));
    }
  } catch (error) {
    console.error(error);
  }
})();

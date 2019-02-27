require("dotenv").config();
import * as _ from "lodash";
import { getIssues, getCommentsToday } from "./github";
import { send } from "./slack";
import * as moment from "moment";

(async () => {
  try {
    const issues = await getIssues();
    for (const issue of issues) {
      const comments = await getCommentsToday(issue.number);
      const statusUpdates = comments.filter(c => c.body.match(/^Status:/g));

      if (!statusUpdates.length) {
        continue;
      }

      const messages: String[] = [
        `@sandaemc Status update for ${issue.title} (${moment().format(
          "YYYY-MM-DD"
        )}):\n`
      ];
      for (const update of statusUpdates) {
        messages.push(
          ` - ${update.body} (${update.createdAt.format("h:mm a")})\n`
        );
      }

      send(messages.join(""));
      console.log(messages.join(""));
    }
  } catch (error) {
    console.error(error);
  }
})();

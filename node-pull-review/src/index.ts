require("dotenv").config();
import * as jira from "./jira";
import * as slack from "./slack";
import * as github from "./github";
import * as moment from "moment";
import { ReviewStatus } from "./types";

// TODO: a github pull every 30 minutes
(async () => {
  console.log("Checking PRs...");

  const pulls = await github.getPullsReviewedToday();

  // TODO: prevent from keep on updating
  // easy if this scripts runs every hour then we shouldn't update if
  // the status update is more than an hour
  for (const { pull, review } of pulls) {
    if (review.reviewer != "sandaemc") continue;

    const ageMinutes = moment().diff(review.submittedAt, "minutes");

    if (ageMinutes <= 15) {
      await jira.transition(
        pull.branch,
        review.status === ReviewStatus.APPROVED
          ? jira.TRANSITIONS.AwaitingReviewQA
          : jira.TRANSITIONS.ReOpenIssue
      );

      const message = `${pull.branch} was ${
        ReviewStatus.APPROVED === review.status ? "approved!" : "re-openned."
      }`;

      await slack.post(message);
      console.log(message);
    }
  }
})();

require("dotenv").config();
import * as _ from "lodash";
import { getReviews, getPRs } from "./github";
//import { send } from "./slack";

(async () => {
  const dataTeamPRs = await getPRs();

  const reviews = await Promise.all(
    dataTeamPRs.map(pr => getReviews(pr.number))
  );

  const dataTeamPRsWithReviewStatus = dataTeamPRs.map(pr => ({
    ...pr,
    reviews: _.filter(
      _.flatten(reviews),
      review => review.prNumber === pr.number
    )
  }));

  const unapprovedPRs = dataTeamPRsWithReviewStatus.filter(pr => {
    const recentReview: any = _.last(pr.reviews);
    if (recentReview) {
      return recentReview.status !== "APPROVED";
    }

    return true;
  });

  const formattedList = unapprovedPRs
    .map(pr => `${pr.owner}:${pr.branch}\t\t- ${pr.title} (${pr.link})`)
    .join("\n");

  console.log(formattedList);
  /*
  send(
    "*List of pending PRs as of the moment:* \n" + "```" + formattedList + "```"
  );
  */
})();

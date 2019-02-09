require("dotenv").config();
import * as _ from "lodash";
import { getReviews, getPRs, Issue } from "./github";
import { send } from "./slack";

const dataTeamMembers = ["pcellano", "eoporto", "sandaemc", "arielmanayon"];

(async () => {
  try {
    const prs = await getPRs();

    const dataTeamPRs = prs.filter(pr => dataTeamMembers.includes(pr.owner));

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

    const groupedUnapprovedPRs = _.sortBy(
      unapprovedPRs,
      (pr: Issue) => pr.owner
    );

    const messages: string[] = ["*Open PRs*\n\n"];
    for (const member of dataTeamMembers) {
      const memberPRs = groupedUnapprovedPRs.filter(pr => pr.owner === member);

      if (memberPRs.length) {
        messages.push(`*${member}*: \n`);

        for (const pr of memberPRs) {
          if (pr.owner === member) {
            messages.push(` - ${pr.title} (${pr.link})\n`);
          }
        }
      }

      messages.push("\n");
    }

    send(messages.join(""));
  } catch (error) {
    console.error(error);
  }
})();

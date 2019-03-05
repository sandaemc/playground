import * as _ from "lodash";
import { getPRs, getReviews } from "./github";
import * as moment from "moment";

export async function getPRsReviewedToday() {
  const prs = await getPRs();

  const teamPRs = prs.filter(c =>
    c.owner.name.match(/^(sandaemc|arielmanayon|pcellano|eoporto)/)
  );

  const recentPRs = teamPRs.filter(
    c => c.updatedAt >= moment().subtract(7, "days")
  );

  const reviews = _.flatten(
    await Promise.all(recentPRs.map(pr => getReviews(pr.number)))
  );

  const prsWithReviews = recentPRs.map(pr => ({
    ...pr,
    reviews: _.filter(reviews, review => review.prNumber === pr.number)
  }));

  const reviewedToday = prsWithReviews.filter(pr => {
    const review = _.last(pr.reviews);
    if (review === undefined) {
      return false;
    }

    return review.submittedAt.isSame(moment(), "day");
  });

  return reviewedToday;
}

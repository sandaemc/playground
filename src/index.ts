require("dotenv").config();
import * as _ from "lodash";
import { getPulls, getReviews } from "./github";
import * as moment from "moment";
import { PullRequest } from "./types";

// TODO: Find PR that was reviewed today by me

const byDataTeam = (pr: PullRequest) => {
  return pr.owner.name.match(/^(arielmanayon|pcellano|eoporto)/);
};

const inTheLastSevenDays = (pr: PullRequest) => {
  return pr.updatedAt >= moment().subtract(7, "days");
};

export async function listPullsReviewedToday() {
  const prs = (await getPulls()).filter(byDataTeam).filter(inTheLastSevenDays);

  for (const pr of prs) {
    const reviews = await getReviews(pr.number);

    const latest = _.last(reviews);
    if (latest === undefined) {
      continue;
    }

    if (latest.submittedAt.isSame(moment(), "day")) {
      console.log(latest);
    }
  }
}

(async () => {
  try {
    await listPullsReviewedToday();
  } catch (error) {
    console.error(error);
  }
})();

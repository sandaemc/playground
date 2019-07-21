require("dotenv").config();
import * as Octokit from "@octokit/rest";

const api = new Octokit({
  auth: `token ${process.env.GITHUB_AUTH_TOKEN}`
});

api.repos
  .listForOrg({
    org: "octokit",
    type: "public"
  })
  .then(({ data }) => {
    console.log(data);
  });

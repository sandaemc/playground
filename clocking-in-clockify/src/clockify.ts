import fetch from "node-fetch";
import isEmpty from "lodash/isEmpty";

const CLOCKIFY_WORKSPACE_ID = process.env.CLOCKIFY_WORKSPACE_ID || "";
if (!CLOCKIFY_WORKSPACE_ID) {
  throw new Error("CLOCKIFY_WORKSPACE_ID is required");
}

const CLOCKIFY_USER_ID = process.env.CLOCKIFY_USER_ID || "";
if (!CLOCKIFY_USER_ID) {
  throw new Error("CLOCKIFY_USER_ID is required");
}

const CLOCKIFY_API_KEY = process.env.CLOCKIFY_API_KEY || "";
if (!CLOCKIFY_API_KEY) {
  throw new Error("CLOCKIFY_API_KEY is required");
}

export async function isClocked() {
  try {
    const response = await fetch(
      `https://api.clockify.me/api/v1/workspaces/${CLOCKIFY_WORKSPACE_ID}/user/${CLOCKIFY_USER_ID}/time-entries?in-progress=true`,
      {
        timeout: 5000,
        headers: {
          "X-Api-Key": CLOCKIFY_API_KEY
        }
      }
    );

    const result = await response.json();
    return !isEmpty(result);
  } catch (err) {
    throw new Error("Unable to fetch some data - " + err.message);
  }
}

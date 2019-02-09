require("dotenv").config();
import * as _ from "lodash";
import { getApprovedPRsByOwner, User } from "./github";
import { send } from "./slack";
import { openPRsFormattedMessage } from "./format";

const dataTeamMembers: User[] = [
  { name: "pcellano" },
  { name: "eoporto" },
  { name: "sandaemc" },
  { name: "arielmanayon" }
];

(async () => {
  try {
    const prs = await getApprovedPRsByOwner(dataTeamMembers);
    if (prs.length) send(openPRsFormattedMessage(prs));
  } catch (error) {
    console.error(error);
  }
})();

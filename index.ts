require("dotenv").config();
import * as _ from "lodash";
import { getUnApprovedPRsByOwner } from "./github";
import { send } from "./slack";
import { openPRsFormattedMessage } from "./format";
import { User } from "./types";

const dataTeamMembers: User[] = [
  { name: "pcellano" },
  { name: "eoporto" },
  { name: "sandaemc" },
  { name: "arielmanayon" }
];

(async () => {
  try {
    const prs = await getUnApprovedPRsByOwner(dataTeamMembers);
    if (prs.length) send(openPRsFormattedMessage(prs));
  } catch (error) {
    console.error(error);
  }
})();

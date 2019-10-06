require("dotenv").config();
import { post } from "./slack";
import { isClocked } from "./clockify";

(async () => {
  const channel = "GE8N745U3";
  const hasClocked = await isClocked();

  await post(
    channel,
    hasClocked ? "Sandae is working." : "Sandae stopped working."
  );
})();

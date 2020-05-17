import * as express from "express";
import * as controller from "./controller";

export const router = express.Router();

router.get("/", controller.getResources);
router.post("/", controller.createResource);
router.get("/:name", controller.getResource);
router.patch("/:name", controller.updateResource);

const express = require("express");
const User = require("../app/modules/user");
const router = express.Router();

router.get("/", new User().getUser);
router.put("/", new User().updateUser);
router.post("/link", new User().addLink);
router.get("/link", new User().getLinks);
router.delete("/link/:id", new User().deleteLink);

module.exports= router;
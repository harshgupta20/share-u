const express = require("express");
const Admin = require("../app/modules/admin");
const router = express.Router();

router.put("/users/:email", new Admin().updateUser);
router.post("/users", new Admin().addUser);
router.delete("/users/:email", new Admin().deleteUser);
router.get("/users", new Admin().getAllUsers);
router.get("/:id", new Admin().getUserById);

module.exports= router;
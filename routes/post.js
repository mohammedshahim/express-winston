const express = require("express");
const { getPost } = require("../controller/post");
const router = express.Router();

// Define a route handler for GET /api/posts
router.get("/", getPost);

module.exports = router;

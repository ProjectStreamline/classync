const express = require("express");
const {
  createNotice,
  getNoticesForStudent,
} = require("../controller/noticeController");

const router = express.Router();

router.post("/", createNotice);
router.get("/student", getNoticesForStudent);

module.exports = router;

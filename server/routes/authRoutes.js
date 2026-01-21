const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); 
const {
  register,
  login,
  checkPhone,
} = require("../controllers/authController");

router.post("/check-phone", checkPhone);
router.post("/register", upload.single("certificate"), register);
router.post("/login", login);

module.exports = router;

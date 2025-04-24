const express = require("express");
const router = express.Router();
const { banUser, deleteProduct, getReports } = require("../controllers/adminController");
const auth = require("../middleware/auth");

router.get("/reports", auth, getReports);
router.post("/ban/:id", auth, banUser);
router.delete("/product/:id", auth, deleteProduct);

module.exports = router;

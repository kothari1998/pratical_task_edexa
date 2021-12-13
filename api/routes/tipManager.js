const express = require("express");
const router = express.Router();
const tipManagerController = require("../controllers/tipManager");

router.post("/tip/calculate/:uid", tipManagerController.createhotel);

router.get("/:uid", tipManagerController.getproduct);

router.get("/tippercentage/:uid", tipManagerController.gettipsPercentage);

router.get("/tipsMostVisted/:uid", tipManagerController.gettipsMostVisted);

module.exports = router;
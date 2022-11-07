const express = require('express')
const router = require("express").Router()
const controller =require("../controllers/walletController.js")
const protect = require ("../middleware/authMiddleWare.js")

router.post("/topup",protect,controller.fundAccount)
router.post("/withdraw",protect,controller.withdraw)
router.post("/transfer",protect,controller.transfer)

module.exports = router;
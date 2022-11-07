const express = require('express')
const router = require("express").Router()
const controller = require("../controllers/userController.js")
router.post("/signup",controller.signUp)
router.post("/signin",controller.signIn)

module.exports = router;
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const session =  require("express-session")
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/userRoute.js")
const walletRoute = require("./routes/walletRoute.js")
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(morgan("common"))
app.use(session({
      key:"userId",
      secret:"sessionSecret",
      resave: false,
      saveUninitialized: false,
      cookie:{
            expires: 30000 *100000
      }
}))
app.use("/api/v1/users", userRoute)
app.use("/api/v1/wallet",walletRoute)
app.get("/",(req,res)=>{
      res.status(200).json("hello world")
})
app.listen(process.env.PORT || 3000,()=>{
      console.log("server is active")
})
 module.exports = app


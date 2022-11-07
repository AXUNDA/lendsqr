const knex = require("../database/db.js")
const bcrypt = require("bcryptjs")

exports.signUp = async(req,res)=>{
           const {name,email,password} = req.body
      try {
            
            const existingUser =  await  knex.select("*").from("users").where({email:email.toLowerCase()})
            console.log(existingUser)
            
            if(existingUser[0] === undefined){
                  
                  const hashedPassword = await bcrypt.hashSync(password,10)
                  console.log(1)
                  const response = await knex('users').insert({name:name,email:email.toLowerCase(),password:hashedPassword})
                  console.log(response)
                  if(response){
                       const currentUser = await  knex.select("*").from("users").where({email:email})
                       req.session.user = currentUser[0]
                       
                       const userAccount = await knex("account").insert({userID:currentUser[0].id,balance:0})
                       const getAccount = await knex.select("*").from("account").where({userID:currentUser[0].id})
                       return res.status(200).json({
                           status:"created",
                           data:{
                              name:currentUser[0].name,
                              email:currentUser[0].email,
                              accountId: getAccount[0].id,
                              accountBalance:getAccount[0].balance
                           }
                       })
                  }else{
                        return res.status(501).send("an error occurred,Please try again")

                  }
                  

            }else{
                  return res.status(501).json({
                        status:"an error occurred",
                        error:"a user with this email already exists"
                  })
                  
            }
            
      } catch (error) {
            console.log(error)
            return res.status(502).json({
                  message:"an error occurred",
                  error: error
                  
            })
            
      }

}

exports.signIn = async(req,res)=>{
             const {email,password}= req.body
      try {
            const currentUser = await  knex.select("*").from("users").where({email:email.toLowerCase()})
            const correct =  await bcrypt.compareSync(password,currentUser[0].password)
            if (correct){
                  req.session.user = currentUser[0]
                 const currentBalance = await knex.select("*").from("account").where({userID:currentUser[0].id})

                  res.status(200).json({
                        status:"logged in",
                        user:{
                              name:currentUser[0].name,
                              email:currentUser[0].email,
                              accountBalance:currentBalance[0].balance
                        }
                  })
            }else{
                  res.status(403).json({
                        status:"error",
                        message:"incorrect credentials"
                  })
            }



            
      } catch (error) {
            res.status(500).json({
                  status:" an error occurred",
                  error:"credentials not found"
            })
            
      }
}


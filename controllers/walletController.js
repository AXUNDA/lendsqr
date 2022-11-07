
const knex = require("../database/db.js")

exports.fundAccount = async(req,res)=>{
      const {amount} = req.body
      const{id} = req.session.user
      try {
            const userAccount = await knex.select("*").from("account").where({userID:id})
            await knex('account').where({userID:id}).update({
                  balance: amount+userAccount[0].balance
                })

                var date_time = new Date().toLocaleString();
             await knex('transaction').insert({date:date_time,type:"top up",amount:amount,beneficiary:"self",user_id:id})
             const transaction_history = await knex.select("*").from("transaction").where({user_id:id})
             const userBalance = await knex.select("*").from("account").where({userID:id})
            return  res.status(201).json({
                  transaction_details:transaction_history[transaction_history.length-1],
                  account_details:userBalance[0]
             })


  
 

            
      } catch (error) {
          return  res.status(404).json({
                  message:"an error occurred",
                  status:"transaction failed"
            })
            
      }
}

exports.withdraw = async(req,res)=>{
                const {amount} = req.body
                const{id} = req.session.user

      try {
            const userAccount = await knex.select("*").from("account").where({userID:id})
            if(amount > userAccount[0].balance){
                 return res.status(404).json({
                        status:"error",
                        message:"you can not withdraw more than your current balance"
                  })

            }else{
                  await knex('account').where({userID:id}).update({
                        balance: userAccount[0].balance-amount
                      })
                var date_time = new Date().toLocaleString();
             await knex('transaction').insert({date:date_time,type:"withdrawal",amount:amount,beneficiary:"self",user_id:id})
             const transaction_history = await knex.select("*").from("transaction").where({user_id:id})
             const userBalance = await knex.select("*").from("account").where({userID:id})
           return  res.status(201).json({
                  transaction_details:transaction_history[transaction_history.length - 1],
                  account_details:userBalance[0]
             })





            }

            
      } catch (error) {
            return res.status(404).json({
                  message:"an error occurred",
                  status:"transaction failed"
            })
            
      }

}
exports.transfer = async(req,res)=>{
             const {id,email} = req.session.user
             const {beneficiary,amount}= req.body
             
      try {
            if (beneficiary == email){
                  return res.status(400).json({
                        status:"transaction failed",
                        error:"you can not transfer funds to yourself,use the top up route"
                  })
            }else{
            
            const currentUserAccount = await knex.select("*").from("account").where({userID:id})
             if(amount > currentUserAccount[0].balance){
                 return res.status(400).json({
                        status:"transaction failed",
                        error:"you can not transfer more than your current balance"
                  })

             }else{
                var date_time = new Date().toLocaleString();

                  const beneficiary_details =  await knex.select("*").from("users").where({email:beneficiary})
                  
                  beneficiary_account =  await knex.select("*").from("account").where({userID:beneficiary_details[0].id})
                  
                  await knex('account').where({userID:id}).update({
                        balance: currentUserAccount[0].balance-amount
                      })

                      await knex('account').where({userID:beneficiary_details[0].id}).update({
                        balance: beneficiary_account[0].balance+amount
                      })

                    await knex('transaction').insert({date:date_time,type:"transfer",amount:amount,beneficiary:beneficiary,user_id:id})
                    await knex('transaction').insert({date:date_time,type:"credit",amount:amount,beneficiary:`self ,received from ${email}`,user_id:beneficiary_details[0].id})
                    const transaction_details = await knex.select("*").from("transaction").where({user_id:id})
                    return res.status(201).json({
                        status: 'success',
                        details:transaction_details[transaction_details.length - 1]
                    })



                      

                      

             }
            
            

            }
            
      } catch (error) {
           return res.status(500).json({
                  status:"transaction failed",
                  message:"please crosscheck beneficiary credentials",
                  error
            })
            
      }
}
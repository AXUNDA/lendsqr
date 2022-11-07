const request = require('supertest')
const app = require('../server')
describe('root endpoint', () => {
  it('should should return status of 200', async () => {
    const res = await request(app)
      .get('/')
      
    expect(res.statusCode).toEqual(200)
    
  })
})


describe('signup endpoint', () => {
  it('should create a new user and return a status code of 200', async () => {
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({
        email: "charles@example.com",
        password: '12345',
        name:"charles king"
      })
       expect(res.statusCode).toEqual(200) 
  })
})
describe('signin endpoint', () => {
  it('should sign a user in', async () => {
    const res = await request(app)
      .post('/api/v1/users/signin')
      .send({
        email: "charles@example.com",
        password: '12345',
        
      })
       expect(res.statusCode).toEqual(200) 
  })
})

describe('fund account end point', () => {
  it('should top up a users account and return a status code of 201', async () => {
    const res = await request(app)
      .post('/api/v1/wallet/topup')
      .send({
        
        amount: 500,
        
      })
      if(request.session){
       expect(res.statusCode).toEqual(201) 
       expect(res.body).toHaveProperty('transaction_details')

      }else{
       expect(res.statusCode).toEqual(400) 


      }
  })
})

describe('withdraw end point', () => {
  it('should top up a users account and return a status code of 201', async () => {
   
    const res = await request(app)
      .post('/api/v1/wallet/withdraw')
      .send({
        
        amount: 500,
        
      })
      console.log(res)
      if(request.session){
       expect(res.statusCode).toEqual(201) 
       expect(res.body).toHaveProperty('account_details')


      }else{
       expect(res.statusCode).toEqual(400) 


      }
  })
})

describe('transfer funds end point', () => {
  it('should top up a users account and return a status code of 201', async () => {
    const res = await request(app)
      .post('/api/v1/wallet/withdraw')
      .send({
        
        amount: 500,
        beneficiary:"axundah@outlook.com"
        
      })
      if(request.session){
       expect(res.statusCode).toEqual(201) 
       expect(res.body).toHaveProperty('details')


      }else{
       expect(res.statusCode).toEqual(400) 


      }
  })
})
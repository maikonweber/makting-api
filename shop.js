const axios = require('axios')
require('dotenv').config();

const moment = require('moment');
const appid = process.env.AppID
const senha = process.env.Senha
const crypto = require('crypto')

const dateNow =`1672776131`


const requestBody = `{"query":"{\nbrandOffer{\n    nodes{\n        commissionRate\n        offerName\n    }\n}\n}"}`

const endpoint = 'https://open-api.affiliate.shopee.com.br/graphql'


const signature = appid + dateNow + JSON.stringify(requestBody) + senha

console.log(signature)

const hash = crypto.createHash('sha256').update(signature).digest('hex');


console.log(hash)

const headers = {
  "content-type" : "application/json",
  "Authorization" : `SHA256 Credential=${appid}, Timestamp=${dateNow}, Signature=${hash}`
}


console.log(headers)

axios({ 
  url: endpoint,
  method: 'post',
  headers: headers,
  data: requestBody

 }).then(el => {
  console.log(el)
  console.log(el.data[`errors`])
})





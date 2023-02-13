const axios = require('axios')
require('dotenv').config();

const moment = require('moment');
const appid = process.env.AppID
const senha = process.env.Senha
const crypto = require('crypto')

var utcMoment = moment.utc();

const dateNow = '1676329017'

let parse = `
  {"query":"{
    shopeeOfferV2 {\n
      nodes {\n
        offerName\n
        imageUrl\n
        offerLink\n
        offerType\n
        categoryId\n
        commissionRate\n
      }\n
    }\n
  }"
}`


let requestBody = `{"query":"{\nbrandOffer{\n    nodes{\n        commissionRate\n        offerName\n   offerLink\n   }\n}\n}"}`

requestBody = JSON.stringify(requestBody)


console.log(requestBody)
const endpoint = 'https://open-api.affiliate.shopee.com.br/graphql'


const signature = appid + dateNow + requestBody + senha

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





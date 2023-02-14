const axios = require('axios')
require('dotenv').config();

const moment = require('moment');
const appid = process.env.AppID
const senha = process.env.Senha
const crypto = require('crypto')

let timestamp = Math.floor(Date.now() / 1000);
console.log(timestamp);


const dateNow = timestamp;


let parse = `{  shopeeOfferV2 {    nodes {      offerName      imageUrl      offerLink      offerType      categoryId    	commissionRate          }  }}`

const response = {
  "query": parse,
}

let requestBody = `{"query":"{\nbrandOffer{\n    nodes{\n        commissionRate\n        offerName\n   offerLink\n   }\n}\n}"}`

requestBody = JSON.stringify(response)


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
  data: JSON.parse(requestBody)

 }).then(el => {
  console.log(el.dataS)
})





const e = require("express");
const Redis = require("ioredis");
const redis = new Redis({
  host: 'localhost',
  port: '6379'
});



async function saveListInRedis(listName, listData) {
    listData.forEach(function(item) {
      redis.rpush(listName, JSON.stringify(item));
    })
  }


async function trimList(listName, start, end) {
    const listItem =  redis.ltrim(listName, start, end, function(err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log(`List ${listName} trimmed to range ${start}-${end}`);
        console.log(response);
        return response
        }
    });
  }

async function getAllElements(groupName, s, e) {
    const start = s || 0; // start index of the range
    const end = e || -1; // end index of the range (-1 means to the end of the list)
  
    const elements = await redis.lrange(groupName, start, end);

    return elements;
}

module.exports = {
    saveListInRedis,
    trimList,
    getAllElements
}
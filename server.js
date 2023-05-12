const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./Docs/swagger.json');
const { createLogger, format, transports } = require('winston');
const port = 3055
const logger = require('./utils/logger');
const { insertCook, getCookId, getCook_, insertTravel, selectTravel } = require('./database')
const { getAllElements } = require('./redisDatabase');


if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  })
  )
  logger.silent = true;
}

app.use(bodyParser.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/api/v1/cook-book:id', async (req, res) => {
  console.log(req.params['id'])
  const params = req.params['id'].replace(':', '')
  let result = 401
  if (params != '' && params <= 100) {
    result = await getCookId(params)
    res.send(result)
  }
  res.sendStatus(result);
})


app.get('/api/v1/cook-book', async (req, res) => {
  const result = await getCook_()
  res.send(result);
})

app.post('/api/v1/shoope-banner', async(req, res) => {
  const { start, end } = req.body
  const result = await getAllElements('ShopeeProduct', start, end)
  res.send(result);
})

app.listen(port, function () {
  logger.info("[server]: Server is running at http://localhost:".concat(port));
});

module.exports = app


const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./Docs/swagger.json');
const { createLogger, format, transports } = require('winston');
const port = 3055
const logger = require('./utils/logger');
const { insertCook, getCookId, getCook_, insertTravel, selectTravel } = require('./database')
// const { cook_book } = require('./Controllers/cook-book');

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
// app.use('/', require('./Routes/timeRoute'));

// app.post('/api/cook-book', cook_book.cook_book)

app.get("/api/travel_book:id", async (req, res) => {

  const params = req.params['id'].replace(':', '')
  let result = 401
  console.log(params)

  if (params != '' && params <= 200) {
    result = await selectTravel(params)
  }
  ;
  res.send(result)
})

// app.post('/api/cook-book', async (req, res) => {
//     let {titulo, href, resume, ingredientes, preparo } = req.body
//     const result = await insertCook(titulo, href, resume, ingredientes, preparo);

//     res.send(result);
// })

app.get('/api/cook-book:id', async (req, res) => {
  console.log(req.params['id'])
  const params = req.params['id'].replace(':', '')
  let result = 401
  if (params != '' && params <= 100) {
    result = await getCookId(params)
  }
  res.sendStatu(result);
})

app.get('/api/cook-book', async (req, res) => {
  const result = await getCook_()
  res.send(result);
})


app.listen(port, function () {
  logger.info("[server]: Server is running at http://localhost:".concat(port));
});

module.exports = app


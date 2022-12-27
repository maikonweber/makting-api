const pg = require('pg')

let client = {
   host: 'localhost',
   port: 5732,
   password:'cook',
   database: 'cook',
   user: 'cook',
};


let pool = new pg.Pool(client);

async function insertTravel(place, href, principal, another) {
   
   const string = `
      INSERT INTO travel_book (
         place, href, principal, another
      ) VALUES ($1, $2, $3, $4)
   `
   const result = await pool.query(string, [place, href, principal, JSON.stringify(another)])
   return result.rows
}

async function selectTravel(id = 1) {

   console.log(id)
   
   const string = `
    Select * from travel_book Where id = $1
   `
   const result = await pool.query(string, [id])
   return result.rows
}


async function insertCook(titulo, href, resume, ingredientes, preparo) {
   const string = `INSERT INTO cook_book (title, href, resume, ingredientes, preparo) VALUES ($1, $2, $3, $4, $5) `
   const result = await pool.query(string, [titulo, href, resume, ingredientes, preparo])
   return result.rows
}


async function getCookId(id) {
   const string = `SELECT * FROM cook_book WHERE id = $1`
   const result = await pool.query(string, [id])
   return result.rows[0]
}


async function getCook_(LIMIT = 10, OFFSET = 0) {
   const string = `SELECT *  FROM cook_book LIMIT $1 OFFSET $2`
   const result = await pool.query(string, [LIMIT, OFFSET])
   return result.rows
}

async function updateHref(id, href) {
   const string = `Update cook_book 
                  SET href = $1 Where id = $2`
   const result = await pool.query(string, [href, id])
   return result
}


module.exports = {
  updateHref, insertCook, getCookId, getCook_,insertTravel,selectTravel
}
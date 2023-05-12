CREATE TABLE cook_book (
  id SERIAL primary Key,
  title text,
  href varchar(200),
  resume text,
  ingredientes text,
  preparo text
);

CREATE TABLE permission_token (
   id INTEGER PRIMARY KEY,     
   hash TEXT DEFAULT MD5(pseudo_csvjob_encrypt(nextval('hash_id_seq')::INTEGER)::TEXT),
   name string(255) NOT NULL,
   created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE users (
  id INTEGER
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  hash_password TEXT NOT NULL,
  salt TEXT NOT NULL
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() 
)

CREATE TABLE profile_information (
  character_name  
  id user
  table_id relation 
);

CREATE TABLE persinten_table (
  id BIGINT 
  JSON JSONB
);

CREATE TABLE relation_cookie (
  id INTEGER
  id_cookie INTEGER
)


CREATE TABLE cookie_session (
  id integer PRIMARY KEY
  hash text NOT NULL  
  id_track INTEGER
)

CREATE TABLE location_session (
  id INTEGER PRIMARY KEYs  
  location
);











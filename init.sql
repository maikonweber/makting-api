CREATE TABLE cook_book (
  id SERIAL primary Key,
  title text,
  href varchar(200),
  resume text,
  ingredientes text,
  preparo text
);

CREATE TABLE travel_book (
 id SERIAL primary Key,
 place text,
 href text,
 principal text,
 another jsonb 
);
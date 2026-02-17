import 'dotenv/config';
import mysql from 'mysql2'

import express from 'express';
const router = express.Router();


const pool = mysql.createPool(
  {
    host : process.env.HOST,
    user : process.env.SQL_USER,
    password : process.env.SQL_PASS,
    database : process.env.DATABASE
  }
).promise()

/* As a user I want to view top 5 rented films of all times */
router.get('/topFiveRented', async (req, res) => {

  try
  {
    const [rows] = await pool.query(`
      select film.film_id, film.title, category.name, count(rental.rental_id) as rental_count from sakila.film
      join film_category on film.film_id=film_category.film_id
      join category on film_category.category_id=category.category_id
      join inventory on film.film_id=inventory.film_id
      join rental on inventory.inventory_id=rental.inventory_id
      group by film.film_id, category.category_id
      order by rental_count desc
      limit 5;
      `)
    console.log("returning the top 5 rented films of all times");
    return res.json(rows);
  }
  catch (err)
  {
    console.error(err);
    return res.status(500).json( {error: "Failed to query DB"} );
  }

});

/* Returns the details of a film */
router.post('/getFilm', async (req, res) => {
  if (!req.body.film_id)
    return res.status(400).json({error: "getting the film requires a film_id"});

    try
    {
      const [rows] = await pool.query(`
        select film.film_id, title, film_category.category_id, category.name from sakila.film
        join film_category on film.film_id=film_category.film_id
        join category on film_category.category_id=category.category_id
        where film.film_id = ?`,
         [req.body.film_id]);

      console.log("returning a film");
      return res.json(rows);
    }
  catch (err)
  {
    console.error(err);
    return res.status(500).json( {error: "Failed to query DB"} );
  }
});

/* As a user I want to be able to view top 5 actors that are part of films I have in the store */
router.get('/topFiveActors', async (req, res) => {
  try
  {
    const [rows] = await pool.query(`
      select actor.actor_id, actor.first_name, actor.last_name, count(distinct fa.film_id) as film_count from sakila.inventory
      left join rental rental on inventory.inventory_id = rental.inventory_id and rental.return_date is NULL
      join film_actor film_actor on inventory.film_id = film_actor.film_id
      join actor actor on film_actor.actor_id = actor.actor_id
      where rental.rental_id is NULL
      group by actor.actor_id, actor.first_name, actor.last_name
      order by film_count desc
      limit 5;`)

      console.log("returning the top 5 actors based on the unrented films");
      return res.json(rows);
  }

  catch (err)
  {
    console.error(err);
    return res.status(500).json( {error: "Failed to query DB"} );
  }
});

/* As a user I want to be able to view the actor’s details and view their top 5 rented films */
router.post('/getActor', async (req, res) => {

  if (!req.body.actor_id)
    return res.status(400).json({error: "no actor_id field to query for an actor"});

  try
  {
    const [rows] = await pool.query(`
      select film.film_id, film.title, count(rental.rental_id) as rental_count from sakila.film
      join inventory on film.film_id=inventory.film_id
      join rental on inventory.inventory_id=rental.inventory_id
      join film_actor on film.film_id=film_actor.film_id 
      where film_actor.actor_id = ?
      group by film.film_id
      order by rental_count desc
      limit 5;`,
    [req.body.actor_id])

    const [actorInfoRow] = await pool.query(`
      select actor.actor_id, actor.first_name, actor.last_name, actor.last_update from sakila.actor
      where actor.actor_id = ?
      limit 1;`,
    [req.body.actor_id])

    console.log("returning the top 5 rented films of all times and actor details");
    return res.json({ rows, actorInfoRow} );
  }
  catch (err)
  {
    console.error(err);
    return res.status(500).json( {error: "Failed to query DB"} );
  }
});

/* As a user I want to be able to search a film by name of film, name of an actor, or genre of the film */
router.get('/searchByAttribute', async (req, res) => {

  if (!req.body.film_name && !req.body.first_name && !req.body.last_name && !req.body.genre)
    return res.status(400).json({error: "search requires at least one attribute (film_id, first_name, last_name, or genre"});

  try
  {
    const [rows] = await pool.query(`
      select distinct film.film_id, film.title, category.name concat(actor.first_name, ' ', actor.last_name) as actor from sakila.film
      left join film_actor on film.film_id = film_actor.film_id
      left join actor on film_actor.actor_id = actor.actor_id
      left join film_category on film.film_id = film_category.film_id
      left join category on film_category.category_id = category.category_id
      where film.title like ? or actor.first_name like ? or actor.last_name like ? or category.name like ?;`,
    [req.body.film_name, req.body.first_name, req.body.last_name, req.body.genre])

    return res.json({ rows } );
  }

  catch (err)
  {
    console.error(err);
    return res.status(500).json( {error: "Failed to query DB"} );
  }

});

/* As a user I want to be able to rent a film out to a customer */
router.post('/rentOut', async (req, res) => {

    if (!req.body.film_id)
      return res.status(400).json({error: "Renting out a film requires a customer_id and film_id"});

  try
  {
    const [inventoryRows] = await pool.query(`
      select inventory.inventory_id from sakila.inventory
      left join rental rental
      on inventory.inventory_id = rental.inventory_id and rental.return_date is NULL
      where inventory.film_id = ? and rental.rental_id is NULL
      limit 1`,
    [req.body.film_id])

    if (inventoryRows.length == 0)
    {
      res.status(409).json( { error: "No films left of this id to rent out"} );
    }

    const inventory_id = inventoryRows[0].inventory_id;

    const [rentalResult] = await pool.execute(`
      insert into rental ( rental_date, inventory_id, customer_id, staff_id)
      values (now(), ?, ?, ? )`,
    [inventory_id, 1, (req.body.staff_id) ? req.body.staff_id : 1]);

    await pool.commit();

    return res.status(200).json( {rentalResult} );
  }

  catch (err)
  {
    await pool.rollback();
    console.error(err);
    return res.status(500).json( {error: "Failed to query DB"} );
  }
});

export default router;
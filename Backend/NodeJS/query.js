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
    res.json(rows);
  }
  catch (err)
  {
    console.error(err);
    res.status(500).json( {error: "Failed to query DB"} );
  }

});

/* Returns the details of a film */
router.get('/getFilm/:id', async (req, res) => {
    try
    {
      const [rows] = await pool.query(`
        select film.film_id, film.title, film.description, film.release_year, film.rating, film.length, category.name as category from sakila.film
        join film_category on film.film_id=film_category.film_id
        join category on film_category.category_id=category.category_id
        where film.film_id = ?`,
         [req.params.id]);

      console.log("returning a film");
      res.json(rows[0]);
    }
  catch (err)
  {
    console.error(err);
    res.status(500).json( {error: "Failed to query DB"} );
  }
});

/* As a user I want to be able to view top 5 actors that are part of films I have in the store */
router.get('/topFiveActors', async (req, res) => {

    try
    {
      const [rows] = await pool.query(`
          select actor.actor_id, actor.first_name, actor.last_name, count(rental.rental_id) as rental_count from sakila.actor
          join film_actor on actor.actor_id=film_actor.actor_id
          join inventory on film_actor.film_id=inventory.film_id
          join rental on inventory.inventory_id=rental.inventory_id
          group by actor.actor_id
          order by rental_count desc
          limit 5;
          `)
      console.log("returning the top 5 rented actors");
      res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to query DB" });
    }
});

/* As a user I want to be able to view the actor’s details and view their top 5 rented films */
router.get('/getActor/:id', async (req, res) => {

  try
  {
    const [rows] = await pool.query(`
      select actor.actor_id, actor.first_name, actor.last_name, actor.last_update from sakila.actor
      where actor.actor_id = ?
      limit 1;`,
      [req.params.id])

    const [actorTopFilms] = await pool.query(`
      select film.film_id, film.title, count(rental.rental_id) as rental_count from sakila.film
      join inventory on film.film_id=inventory.film_id
      join rental on inventory.inventory_id=rental.inventory_id
      join film_actor on film.film_id=film_actor.film_id 
      where film_actor.actor_id = ?
      group by film.film_id
      order by rental_count desc
      limit 5;`,
      [req.params.id])

    console.log("returning actor details and their top 5 films");
    res.json({ actor:rows[0], topFilms:actorTopFilms} );
  }
  catch (err)
  {
    console.error(err);
    res.status(500).json( {error: "Failed to query DB"} );
  }
});

/* As a user I want to be able to search a film by name of film, name of an actor, or genre of the film */
router.get('/searchByAttribute/:attribute', async (req, res) => {

    const attr = `%${req.params.attribute}%`;
    /*
    if (!req.body.film_name && !req.body.first_name && !req.body.last_name && !req.body.genre)
        return res.status(400).json({ error: "search requires at least one attribute (film_id, first_name, last_name, or genre" });
    */

    try {
        const [rows] = await pool.query(`
        select film.film_id, film.title, category.name, group_concat(concat(actor.first_name, " ", actor.last_name)) as actors from sakila.film
        left join film_actor on film.film_id = film_actor.film_id
        left join actor on film_actor.actor_id = actor.actor_id
        left join film_category on film.film_id = film_category.film_id
        left join category on film_category.category_id = category.category_id
        where film.title like ? or concat(actor.first_name, ' ', actor.last_name) like ? or category.name like ?
        group by film.film_id, film.title, category.name;`,
        [attr, attr, attr, attr])

        return res.json(rows);
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to query DB" });
    }

});

/* As a user I want to be able to rent a film out to a customer */
router.post('/rentOut', async (req, res) => {

    if (!req.body.film_id)
        return res.status(400).json({ error: "Renting out a film requires a customer_id and film_id" });

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [inventoryRows] = await connection.query(`
        select inventory.inventory_id from sakila.inventory
        left join rental rental
        on inventory.inventory_id = rental.inventory_id and rental.return_date is NULL
        where inventory.film_id = ? and rental.rental_id is NULL
        limit 1`,
            [req.body.film_id])

        if (inventoryRows.length == 0) {
            await connection.rollback();
            res.status(409).json({ error: "No films left of this id to rent out" });
        }

        const inventory_id = inventoryRows[0].inventory_id;

        const [rentalResult] = await connection.execute(`
        insert into rental ( rental_date, inventory_id, customer_id, staff_id)
        values (now(), ?, ?, ? )`,
            [inventory_id, req.body.customer_id, req.body.staff_id || 1]);

        await connection.commit();

        return res.status(200).json({ rentalResult });
    }

    catch (err) {
        await connection.rollback();
        console.error(err);
        return res.status(500).json({ error: "Failed to query DB" });
    } finally {
        connection.release()
    }
});

export default router;
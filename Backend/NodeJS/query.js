import 'dotenv/config';
import mysql from 'mysql2'

import express from 'express';
const router = express.Router();

const pool = mysql.createPool(
  {
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.MYSQLPASS,
    database : process.env.DATABASE
  }
).promise()

/* As a user I want to view top 5 rented films of all times */
router.get('/topFiveRented', (req, res) => {

  console.log("returning the top 5 rented films of all times");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});

/* Returns the details of a film */
router.get('/getFilm', (req, res) => {

  console.log("returning info about a movie");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});

/* As a user I want to be able to view top 5 actors that are part of films I have in the store */
router.get('/topFiveActors', (req, res) => {

  console.log("returning the top 5 actors that are part of the films in the store");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});

/* As a user I want to be able to view the actor’s details and view their top 5 rented films */
router.get('/getActor', (req, res) => {

  console.log("returning info about a actor");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});

/* As a user I want to be able to search a film by name of film, name of an actor, or genre of the film */
router.get('/searchByAttribute', (req, res) => {

  console.log("returning films by some attribute");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});

/* As a user I want to be able to rent a film out to a customer */
router.post('/rentOut', (req, res) => {

  console.log("Renting a film");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});

export default router;
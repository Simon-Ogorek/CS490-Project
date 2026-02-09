
/* As a user I want to view top 5 rented films of all times */
app.post('/query/topFiveRented', (req, res) => {

  console.log("returning the top 5 rented films of all times");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});

/* Returns the details of a film */
app.post('/query/getFilm', (req, res) => {

  console.log("returning info about a movie");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});

/* As a user I want to be able to view top 5 actors that are part of films I have in the store */
app.post('/query/topFiveActors', (req, res) => {

  console.log("returning the top 5 actors that are part of the films in the store");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});

/* As a user I want to be able to view the actor’s details and view their top 5 rented films */
app.post('/query/getActor', (req, res) => {

  console.log("returning info about a actor");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});

/* As a user I want to be able to search a film by name of film, name of an actor, or genre of the film */
app.post('/query/searchByAttribute', (req, res) => {

  console.log("returning films by some attribute");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});

/* As a user I want to be able to rent a film out to a customer */
app.post('/query/rentOut', (req, res) => {

  console.log("Renting a film");

  const responseData = { success: true, message: 'Data updated' };
  res.json(responseData);
});
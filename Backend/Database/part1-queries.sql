# QUERY 1
select film.film_id, title, film_category.category_id, category.name from sakila.film
join film_category on film.film_id=film_category.film_id
join category on film_category.category_id=category.category_id;

# QUERY 2
select category.name, count(film.film_id) from sakila.category
join film_category on category.category_id=film_category.category_id
join film on film_category.film_id=film.film_id
group by category.category_id;

# QUERY 3
select actor.actor_id, actor.first_name, actor.last_name, count(film.film_id) as movies from sakila.actor
join film_actor on actor.actor_id=film_actor.actor_id 
join film on film_actor.film_id=film.film_id
group by actor.actor_id
order by movies desc;

# QUERY 4
select store.store_id, film.film_id, count(film.film_id) as DVD from sakila.store
join inventory on store.store_id=inventory.store_id 
join film on inventory.film_id=film.film_id
group by store.store_id, film.film_id
order by store.store_id;

# QUERY 5
select * from sakila.rental;

# QUERY 6
select film.film_id, film.title, category.name, count(rental.rental_id) as rental_count from sakila.film
join film_category on film.film_id=film_category.film_id
join category on film_category.category_id=category.category_id
join inventory on film.film_id=inventory.film_id
join rental on inventory.inventory_id=rental.inventory_id
group by film.film_id, category.category_id
order by rental_count desc
limit 5;

# QUERY 7
with best_actor as (
	select film_actor.actor_id from sakila.film_actor
	group by film_actor.actor_id 
	order by count(film_actor.film_id) desc
	limit 1
)
select film.film_id, film.title, count(rental.rental_id) as rental_count from sakila.film
join inventory on film.film_id=inventory.film_id
join rental on inventory.inventory_id=rental.inventory_id
join film_actor on film.film_id=film_actor.film_id 
join best_actor on film_actor.actor_id=best_actor.actor_id
group by film.film_id
order by rental_count desc
limit 5;

# QUERY 8
select customer.customer_id, customer.first_name, customer.last_name, count(rental.rental_id) as count from sakila.customer
join rental on rental.customer_id=customer.customer_id 
group by customer.customer_id
order by count desc
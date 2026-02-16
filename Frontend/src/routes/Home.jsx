import { useEffect, useState } from "react"
import { BiFilm } from "react-icons/bi"
import { FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"

const Home = () => {
    const [films, setFilms] = useState([])
    const [actors, setActors] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/query/topFiveRented")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setFilms(data)
            })
            .catch(err => console.error("Error fetching films:", err))

        fetch("http://localhost:8080/query/topFiveActors")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setActors(data)
            })
            .catch(err => console.error("Error fetching actors:", err))
    }, [])

    return (
        <div className="min-h-screen bg-slate-50 w-full flex">
            <div className="flex flex-col items-start max-w-3xl gap-5">
                <h1 className="text-6xl font-bold text-black text-center mt-20">Top 5 Rented Films</h1>
                <div className="flex flex-row gap-6 overflow-x-auto whitespace-nowrap">
                    {films.map((film) => (
                        <Link key={film.film_id} to={`/films/${film.film_id}`}>
                            <div className="flex flex-col items-center text-blue-500 hover:text-blue-700 transition">
                                <BiFilm className="text-6xl" />
                                <h3 className="text-xl font-semibold">
                                    {film.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {film.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Rentals: {film.rental_count}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <h1 className="text-6xl font-bold text-black text-center mt-20">Top 5 Actors</h1>
                <div className="flex flex-row gap-6 overflow-x-auto whitespace-nowrap">
                    {actors.map((actor) => (
                        <Link key={actor.actor_id} to={`/films/${actor.actor_id}`}>
                            <div className="flex flex-col items-center text-blue-500 hover:text-blue-700 transition">
                                <FaUser className="text-6xl" />
                                <h3 className="text-xl font-semibold">
                                    {actor.first_name} {actor.last_name}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Rentals: {actor.rental_count}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
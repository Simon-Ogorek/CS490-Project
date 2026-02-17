import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ActorDetails = () => {
    const { id } = useParams()
    const [actor, setActor] = useState(null)
    const [topFilms, setTopFilms] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/query/getActor/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setActor(data.actor)
                setTopFilms(data.topFilms)
            })
            .catch(err => console.error(err))
    }, [id])



    if (!actor) {
        return <div className="p-10 text-xl">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-slate-50 p-10 mt-10">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">

                <h1 className="text-4xl font-bold mb-4">
                    Name: {actor.first_name} {actor.last_name}
                </h1>

                <h2 className="text-2xl font-semibold mb-4">
                    Top 5 Rented Films
                </h2>

                <div className="flex flex-col gap-4">
                    {topFilms.map(film => (
                        <Link key={film.film_id} to={`/films/${film.film_id}`} className="p-4 bg-slate-100 rounded hover:bg-slate-200 transition">
                            <div className="flex justify-between">
                                <span className="font-semibold">
                                    {film.title}
                                </span>
                                <span className="text-gray-500">
                                    Rentals: {film.rental_count}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ActorDetails
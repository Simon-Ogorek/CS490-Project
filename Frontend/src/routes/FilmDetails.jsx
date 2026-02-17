import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const FilmDetails = () => {
    const { id } = useParams()
    const [film, setFilm] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8080/query/getFilm/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setFilm(data)
            })
            .catch(err => console.error(err))
    }, [id])

    if (!film) {
        return <div className="p-10 text-xl">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-slate-50 p-10 mt-10">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">

                <h1 className="text-4xl font-bold mb-4">
                    {film.title}
                </h1>

                <p className="text-gray-600 mb-2">
                    Length: {film.length} mins
                </p>

                <p className="text-gray-600 mb-2">
                    Category: {film.category}
                </p>

                <p className="text-gray-600 mb-2">
                    Release Year: {film.release_year}
                </p>

                <p className="text-gray-600 mb-2">
                    Rating: {film.rating}
                </p>

                <p className="mt-4 text-gray-800">
                    {film.description}
                </p>

            </div>
        </div>
    )
}

export default FilmDetails
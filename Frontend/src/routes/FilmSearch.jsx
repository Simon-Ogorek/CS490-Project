import React, { useState } from "react"
import Searchbar from "./../components/Searchbar"
import { Link } from "react-router-dom"

const FilmSearch = () => {

    const [results, setResults] = useState([])

    if (!results || results == []) {
        return <div className="p-10 text-xl">No results found.</div>
    }

    return (
        <div className="min-h-screen bg-slate-50 w-full flex justify-center">
            <div className="flex flex-col items-start max-w-3xl gap-5">
                <h1 className="text-6xl font-bold text-black text-center mt-20">Film Search</h1>
                <div className="search-bar-container">
                    <Searchbar setResults={setResults} />
                </div>

                <div className="flex flex-col gap-4">
                    {results.map(result => (
                        <Link to={`/films/${result.film_id}`} className="p-4 bg-slate-100 rounded hover:bg-slate-200 transition">
                            <div className="flex justify-between">
                                <span className="font-semibold">
                                    {result.title} ({result.first_name} {result.last_name})
                                </span>
                                <span className="text-gray-500">
                                    Category: {result.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div> 
        </div>
    )
}

export default FilmSearch
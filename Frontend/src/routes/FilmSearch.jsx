import React from "react"
import Searchbar from "./../components/Searchbar"

const FilmSearch = () => {
    return (
        <div className="min-h-screen bg-slate-50 w-full flex justify-center">
            <div className="flex flex-col items-start max-w-3xl gap-5">
                <h1 className="text-6xl font-bold text-black text-center mt-20">Film Search</h1>
                <div className="search-bar-container">
                    <Searchbar />
                    <div>Search Results</div>
                </div>
            </div> 
        </div>
    )
}

export default FilmSearch
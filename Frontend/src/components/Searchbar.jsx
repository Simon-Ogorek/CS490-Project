import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"

import "./Searchbar.css"

const Searchbar = () => {
    const [input, setInput] = useState("")

    // function to search things that should be searched
    //const fetchData = (value) =>

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input placeholder="Search by film name, actor, or genre..." value={input} onChange={(e) => setInput(e.target.value)} />

        </div>
    )
}

export default Searchbar
import { useParams } from "react-router-dom"
import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"

import "./Searchbar.css"

const Searchbar = ({ setResults }) => {

    const [input, setInput] = useState("")

    const fetchData = (attribute) => {
        fetch(`http://localhost:8080/query/searchByAttribute/${attribute}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setResults(data)
            })
            .catch(err => console.error(err))
    }
     
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input placeholder="Search by film name, actor, or genre..." value={input} onChange={(e) => handleChange(e.target.value)} />
        </div>
    )
}

export default Searchbar
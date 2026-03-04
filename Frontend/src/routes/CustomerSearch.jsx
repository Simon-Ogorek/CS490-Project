import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const CustomerSearch = () => {
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState(1)

    const [searchId, setSearchId] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8080/query/getCustomers?page=${page}&limit=6`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: searchId,
                first_name: firstName,
                last_name: lastName
            })
        })
            .then(res => res.json())
            .then(data => setCustomers(data))
            .catch(err => console.error(err))
    }, [page, searchId, firstName, lastName])

    return (
        <div className="min-h-screen bg-slate-50 p-10 mt-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">

                <div className="flex gap-60 mb-6 items-center">
                    <h1 className="text-3xl font-bold mb-6">
                        Customers
                    </h1>
                    <Link to="/" className="py-1 px-3 text-lg font-semibold text-blue-500 hover:text-white rounded-2xl hover:bg-blue-500 transition duration-300">
                        Add New Customer
                    </Link>
                </div>

                <div className="flex gap-4 mb-6">
                    <input
                        type="number"
                        placeholder="Enter ID"
                        value={searchId}
                        onChange={(e) => {
                            setSearchId(e.target.value)
                            setPage(1)
                        }}
                        className="border p-2 rounded w-32"
                    />

                    <input
                        type="text"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                            setPage(1)
                        }}
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                            setPage(1)
                        }}
                        className="border p-2 rounded"
                    />
                </div>

                {customers.map(customer => (
                    <Link
                        key={customer.customer_id}
                        to={`/customers/${customer.customer_id}`}
                        className="block border-b py-3 hover:bg-slate-100 transition"
                    >
                        {customer.first_name} {customer.last_name}
                    </Link>
                ))}

                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Previous
                    </button>

                    <button
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CustomerSearch
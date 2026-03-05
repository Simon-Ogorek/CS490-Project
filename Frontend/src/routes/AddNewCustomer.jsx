import { useParams } from "react-router-dom"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const AddNewCustomer = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/query/addCustomer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    first_name: firstName,
                    last_name: lastName,
                    email: email
                })
            })

            if (!response.ok) {
                throw new Error("Failed to add customer")
            }

            alert("Customer added successfully!")
            //navigate(`/customers/${customer.customer.customer_id}`)
            navigate("/customersearch")
        }
        catch (err) {
            console.error(err)
            alert("Error adding customer")
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 p-10 mt-10">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">

                <h1 className="text-4xl font-bold mb-4">
                    Add New Customer
                </h1>

                <p className="text-gray-600 mb-2">
                    First Name:
                </p>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Enter first name"
                />

                <p className="text-gray-600 mb-2">
                    Last Name:
                </p>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Enter last name"
                />

                <p className="text-gray-600 mb-2">
                    Email:
                </p>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Enter email"
                />

                <button className="flex flex-col items-center text-blue-500 hover:text-blue-700 transition mt-3">
                    <Link onClick={handleSave} className="text-xl font-semibold">
                        Save
                    </Link>
                </button>

                <button className="flex flex-col items-center text-red-500 hover:text-red-700 transition mt-3">
                    <Link className="text-xl font-semibold">
                        Cancel
                    </Link>
                </button>
                

            </div>
        </div>
    )
}

export default AddNewCustomer
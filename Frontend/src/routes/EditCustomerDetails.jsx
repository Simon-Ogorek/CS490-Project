import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const EditCustomerDetails = () => {
    const { id } = useParams()

    const [customer, setCustomer] = useState(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8080/query/getCustomerDetails/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCustomer(data)
                setFirstName(data.customer.first_name)
                setLastName(data.customer.last_name)
                setEmail(data.customer.email)
            })
            .catch(err => console.error(err))
    }, [id])

    if (!customer) {
        return <div className="p-10 text-xl">Loading...</div>
    }

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/query/editCustomer`, {
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
                throw new Error("Failed to update")
            }

            alert("Customer updated successfully!")
        }
        catch (err) {
            console.error(err)
            alert("Error updating customer")
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 p-10 mt-10">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">

                <h1 className="text-4xl font-bold mb-4">
                    Edit Customer Details
                </h1>

                <p className="text-gray-600 mb-2">
                    First Name:
                </p>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="First name"
                />

                <p className="text-gray-600 mb-2">
                    Last Name:
                </p>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Last name"
                />

                <p className="text-gray-600 mb-2">
                    Email:
                </p>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Email"
                />

                <button className="flex flex-col items-center text-blue-500 hover:text-blue-700 transition mt-3">
                    <Link to={`/customers/${customer.customer.customer_id}`} className="text-xl font-semibold">
                        Save
                    </Link>
                </button>

                <button className="flex flex-col items-center text-red-500 hover:text-red-700 transition mt-3">
                    <Link to="/customersearch" className="text-xl font-semibold">
                        Delete Customer
                    </Link>
                </button>

            </div>
        </div>
    )
}

export default EditCustomerDetails
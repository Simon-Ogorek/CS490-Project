import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const CustomerDetails = () => {
    const { id } = useParams()
    const [customer, setCustomer] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8080/query/getCustomerDetails/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCustomer(data)
            })
            .catch(err => console.error(err))
    }, [id])

    if (!customer) {
        return <div className="p-10 text-xl">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-slate-50 p-10 mt-10">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">

                <h1 className="text-4xl font-bold mb-4">
                    {customer.customer.first_name} {customer.customer.last_name}
                </h1>

                <p className="text-gray-600 mb-2">
                    Email address: {customer.customer.email}
                </p>

                <button className="flex flex-col items-center text-blue-500 hover:text-blue-700 transition mt-3">
                    <Link to={`/editcustomer/${customer.customer.customer_id}`} className="text-xl font-semibold">
                        Edit
                    </Link>
                </button>

                {customer.rentals && customer.rentals.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-3">Rental History</h2>
                        {customer.rentals.map(rental => (
                            <div
                                key={rental.rental_id}
                                className="border-b py-2"
                            >
                                Rental ID: {rental.rental_id} <br />
                                Rental Date: {new Date(rental.rental_date).toLocaleDateString()} <br />
                                Return Date: {rental.return_date
                                    ? new Date(rental.return_date).toLocaleDateString()
                                    : "Not Returned"}
                            </div>
                        ))}
                    </div>
                )}

                {!customer.rentals || customer.rentals.length <= 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-3">Rental History</h2>
                        <div className="border-b py-2" >
                            This customer has no rentals yet.
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomerDetails
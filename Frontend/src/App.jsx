import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar"
import Home from "./routes/Home"
import FilmSearch from "./routes/FilmSearch"
import FilmDetails from "./routes/FilmDetails"
import ActorDetails from "./routes/ActorDetails"
import CustomerSearch from "./routes/CustomerSearch"
import CustomerDetails from "./routes/CustomerDetails"
import EditCustomerDetails from "./routes/EditCustomerDetails"
import AddNewCustomer from "./routes/AddNewCustomer"

function App() {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-grey-50">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/filmsearch" element={<FilmSearch />} />
                    <Route path="/films/:id" element={<FilmDetails />} />
                    <Route path="/actors/:id" element={<ActorDetails />} />
                    <Route path="/customersearch" element={<CustomerSearch />} />
                    <Route path="/customers/:id" element={<CustomerDetails />} />
                    <Route path="/editcustomer/:id" element={<EditCustomerDetails />} />
                    <Route path="/addcustomer" element={<AddNewCustomer />} />
                </Routes>
            </div>
        </>
    )
}

export default App

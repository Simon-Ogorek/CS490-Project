import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar"
import Home from "./routes/Home"
function App() {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-grey-50">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </>
    )
}

export default App

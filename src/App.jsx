import { Route, BrowserRouter as Router, Routes  } from "react-router-dom";

const App = () => {
  return (
    <main className=" bg-slate-300/20">
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={"Home"} />
                  <Route path="/about" element={"about"} />
            <Route path="/project" element={"project"} />
                  <Route path="/contact" element={"contact"} />
        </Routes>
    </Router>

    </main>
  )
}

export default App
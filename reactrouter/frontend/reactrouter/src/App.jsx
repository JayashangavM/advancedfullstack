import { Link, Route, Routes } from "react-router-dom";
import Home from "./home.jsx";
import Book from "./book.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>React Router Example</h1>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/book">Book</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </div>
  );
}

export default App;

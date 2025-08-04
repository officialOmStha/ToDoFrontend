import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import TodoList from "./components/ToDoList"
import Register from "./components/Register"
import Navbar from "./components/Navbar"

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todo" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App

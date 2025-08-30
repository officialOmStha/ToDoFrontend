import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Login"
import TodoList from "./components/ToDoList"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import MobileNav from "./components/MobileNav"

function App() {
  const token = localStorage.getItem("token")

  return (
    <BrowserRouter>
      <Navbar />
      <MobileNav />
      <Routes>
        {/* 👇 If logged in already, redirect "/" to /todo */}
        <Route path="/" element={token ? <Navigate to="/todo" replace /> : <Login />} />

        <Route path="/register" element={<Register />} />

        {/* 👇 Protect /todo with ProRout */}
        <Route
          path="/todo"
          element={
              <TodoList />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

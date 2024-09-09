import "./App.css"
import React, { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Searchbar from "./components/Searchbar"
import MovieCarousel from "./components/MovieCarousel"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Loginpage"
import SignupPage from "./pages/Signuppage"
import Homepage from "./pages/Homepage"

const API_KEY = process.env.REACT_APP_OMDB_API_KEY
const BASE_URL = process.env.REACT_APP_API_BASE_URL

function App() {
  const [defaultMovies, setDefaultMovies] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [isSearchActive, setIsSearchActive] = useState(false)

  // Fetch default movies
  useEffect(() => {
    console.log("API", API_KEY)
    const fetchDefaultMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/?s=horror&apikey=${API_KEY}`
        )
        const data = response.data
        if (data.Search) {
          setDefaultMovies(data.Search.slice(0, 10))
        } else {
          setDefaultMovies([])
        }
      } catch (error) {
        console.error("There was an error when fetching default movies:", error)
      }
    }

    fetchDefaultMovies()
  }, [])

  // Handle search functionality
  const handleSearch = async (query) => {
    setIsSearchActive(true)
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      )
      const data = await response.json()
      if (data.Search) {
        setSearchResults(data.Search)
      } else {
        setSearchResults([])
      }
    } catch (error) {
      console.error("Error fetching search results:", error)
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          {/* <Route path = "/" element={<></>} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>

        {/* <Searchbar onSearch={handleSearch} /> */}
        <MovieCarousel
          movies={isSearchActive ? searchResults : defaultMovies}
        />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

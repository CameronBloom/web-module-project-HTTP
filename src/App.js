import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // pass this function in via props
  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => (movie.id !== id)))
  }

  const addToFavorites = (movie) => {

  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="movies" element={<MovieList movies={ movies } />} />
            <Route path="movies/:id" element={<Movie deleteMovie={ deleteMovie } setMovies={ setMovies } />} />
            <Route path="movies/add" element={<AddMovieForm setMovies={ setMovies } />} />
            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={ setMovies } />} />      
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;

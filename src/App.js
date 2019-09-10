import React, { useState, useEffect } from 'react';
import './App.css';

const Description = ({id}) => {
  const [plot, setPlot] = useState('loading');
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=b7c4947c`)
      .then(response => response.json())
      .then(movie => {
        setPlot(movie.Plot);
      });
  }, [id])
  return (
    <div>
      {plot}
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch('https://www.omdbapi.com/?s=world&apikey=b7c4947c')
      .then(response => response.json())
      .then(data => {
        setMovies(data.Search)
      });
  }, []);
  return (
    <div className="App">
      {movies.map( (movie,index) => (
        <div key={index}>
          <h2>{movie.Title} ({movie.Year}) ({movie.Type})</h2>
          <Description
            id={movie.imdbID}
          />
        </div>
      ))}
    </div>
  );
}

export default App;

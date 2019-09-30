import React, { useState, useEffect } from 'react';
import loader from '../logo.svg';

    // array sort helper
    function compareYear(a, b) {
        const yearA = a.Year;
        const yearB = b.Year;

        let comparison = 0;
        if (yearA > yearB) {
            comparison = 1;
        } else if (yearA < yearB) {
            comparison = -1;
        }
        return comparison;
    }

    // fetch errors handler helper
    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

const Description = ({id}) => {
    const [plot, setPlot] = useState('');
    useEffect(() => {
      fetch(`https://www.omdbapi.com/?i=${id}&apikey=b7c4947c`)
        .then(handleErrors)
        .then(response => response.json())
        .then(movie => {
          setPlot(movie.Plot);
        })
        .catch(error => console.log(error) );
    }, [id]);
    return (
      <figcaption>
        {plot}
      </figcaption>
    );
  }

export default function Movies(props) {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
      fetch(`https://www.omdbapi.com/?s=${props.searching}&apikey=b7c4947c`)
        .then(handleErrors)
        .then(response => response.json())
        .then(data => {
          setMovies(data.Search)
        })
        .catch(error => console.log(error) );
        return () => {
            setMovies([]);
        };
    }, [props.searching]);

    if (movies)
    {
        if (movies.length === 0)
        {
            return (
                <div id="loaderBlock">
                    <img src={loader} className="result-loader" alt="loader" />
                </div>
            );
        }
        else
        {
            return (
                <div id="moviesResult" className="columns is-multiline">
                    {movies.sort(compareYear).map( (movie,index) => (
                        <figure key={index} className="movie-block column is-four-fifths-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
                            <h2 className="title is-4">{movie.Title} ({movie.Year})</h2>
                            <img src={movie.Poster} alt="" />
                            <Description id={movie.imdbID} />
                        </figure>
                    ))}
                </div>
            );
        }
    }
    else
    {
        return (
            <div className="notification is-info">
                Sorry, no results for this time, try again
            </div>
        );
    }

}
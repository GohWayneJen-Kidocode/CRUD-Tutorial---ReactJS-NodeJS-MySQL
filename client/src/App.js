import React, { useState, useEffect } from "react" ;
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieReviewList, setMovieList] = useState([])

  const [newReview, setNewReview] = useState("")

  useEffect(() =>{
    Axios.get('http://localhost:3000/api/get').then((response) => {
      setMovieList(response.data)
    })
  }, [])

  const submitReview = () => {
    Axios.post('http://localhost:3000/api/insert',{
      movieName: movieName,
      review: review,
    });
      setMovieList([...movieReviewList, {movieName: movieName, review: review}]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3000/api/delete/$(movie)`)
  }

  const updateReview = (movie) => {
    Axios.put("http://localhost:3000/api/update", {
      movieName: movie,
      review: newReview
    })
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className='form'>
        <label>Movie Name</label>
        <input type="text" name="movieName" onChange={(e) => {setMovieName(e.target.value);}} />
        <label>Movie Review</label>
        <input type="text" name="review" onChange={(e) => {setReview(e.target.value);}} />

        <button onClick={submitReview}>Submit</button>
        {movieReviewList.map((val) => {
          return (<div className="card">
            <h1>{val.movieName}</h1>
            <p>{val.review}</p>
            <button onClick={() => {deleteReview(val.movieName)}}>DELETE</button>
            <input type="text" id="updateInput" placeholder="Edit Review" onChange={(e)=> {
              setNewReview(e.target.value);
            }}/>
            <button onClick={()=>{
              updateReview(val.movieName)
            }}>Update</button>
          </div>)
        })}
      </div>
    </div>
  );
}

export default App;
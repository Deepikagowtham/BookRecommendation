import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FaStar } from 'react-icons/fa'; // For star icons
import { IoIosSend } from 'react-icons/io'; // Updated send icon
import { IoMdCloseCircle } from 'react-icons/io'; // Importing close icon

function Recommend() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    bookname: '',
    author: '',
    comment: '',
    stars: 0,
    googleLink: '',
    amazonLink: '',
    otherLink: ''
  });
  const [hover, setHover] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [flipCardId, setFlipCardId] = useState(null); // Track the card to flip

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/recommendations');
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/recommend', formData);
      setShowForm(false);
      fetchRecommendations();
      setFormData({
        email: '',
        bookname: '',
        author: '',
        comment: '',
        stars: 0,
        googleLink: '',
        amazonLink: '',
        otherLink: ''
      });
    } catch (error) {
      console.error('Error submitting recommendation:', error);
    }
  };

  const handleCardClick = (id) => {
    setFlipCardId(flipCardId === id ? null : id); // Flip the card
  };

  return (
    <div className="container mt-5">
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        Recommend a Book
      </button>

      {showForm && (
        <div className="card p-4 mb-4 position-relative form-card">
          <h3 className="card-title">Recommend a Book</h3>
          <IoMdCloseCircle 
            className="position-absolute" 
            style={{ top: '10px', right: '10px', cursor: 'pointer', color: 'red' }} 
            size={24} 
            onClick={() => setShowForm(false)} // Close the form
          />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email or Phone</label>
              <input
                type="text"
                name="email"
                className="form-control custom-input"
                placeholder="Enter email or phone"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Book Name</label>
              <input
                type="text"
                name="bookname"
                className="form-control custom-input"
                placeholder="Enter book name"
                value={formData.bookname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                name="author"
                className="form-control custom-input"
                placeholder="Enter author's name"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                name="comment"
                className="form-control custom-input"
                placeholder="Enter your comment"
                value={formData.comment}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Links for Google, Amazon, and Other */}
            <div className="form-group">
              <label>Google Books Link</label>
              <input
                type="text"
                name="googleLink"
                className="form-control custom-input"
                placeholder="Enter Google Books Link"
                value={formData.googleLink}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Amazon Link</label>
              <input
                type="text"
                name="amazonLink"
                className="form-control custom-input"
                placeholder="Enter Amazon Link"
                value={formData.amazonLink}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Other Link</label>
              <input
                type="text"
                name="otherLink"
                className="form-control custom-input"
                placeholder="Enter Other Link"
                value={formData.otherLink}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <div className="star-rating">
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="stars"
                        value={ratingValue}
                        onClick={() => setFormData({ ...formData, stars: ratingValue })}
                        style={{ display: 'none' }}
                      />
                      <FaStar
                        className="star"
                        size={30}
                        color={ratingValue <= (hover || formData.stars) ? '#ffc107' : '#e4e5e9'}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              <IoIosSend size={24} /> Recommend
            </button>
          </form>
        </div>
      )}
<div className="row">
  {recommendations.map((rec) => (
    <div className="card" key={rec.id} onClick={() => handleCardClick(rec.id)}>
      <div className={`flip-card ${flipCardId === rec.id ? 'flipped' : ''}`}>
        <div className="flip-card-inner">
          <div className="card-front card-body">
            <h5 className="card-title">{rec.bookname}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Author: {rec.author}</h6>
            <p className="card-text">Comment: {rec.comment}</p>
            <p className="card-text">
              <strong>Rating: </strong>
              {[...Array(5)].map((star, i) => (
                <FaStar
                  key={i}
                  size={20}
                  color={i + 1 <= rec.stars ? '#ffc107' : '#e4e5e9'}
                />
              ))}
            </p>
          </div>

          {/* Card Back - Displaying Links */}
          <div className="card-back card-body">
            <h5 >Book Links</h5>
            {rec.googleLink && (
              <p>
                <strong>Google Books:</strong> 
                <a href={rec.googleLink} target="_blank" rel="noopener noreferrer" className="card-link">
                  View on Google Books
                </a>
              </p>
            )}
            {rec.amazonLink && (
              <p>
                <strong>Amazon:</strong> 
                <a href={rec.amazonLink} target="_blank" rel="noopener noreferrer" className="card-link">
                  View on Amazon
                </a>
              </p>
            )}
            {rec.otherLink && (
              <p>
                <strong>Other:</strong> 
                <a href={rec.otherLink} target="_blank" rel="noopener noreferrer" className="card-link">
                  View Other Link
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


    </div>
  );
}

export default Recommend;
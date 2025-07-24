import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsPage.css';
import Navbar from '../components/Navbar'; // Optional Navbar
import { Accordion, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import isTokenExpired from '../utils/isTokenExpired';

const NewsPage = ({ isDarkMode, onToggleDarkMode }) => {
  const [newsBySource, setNewsBySource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Check if the token is expired on component mount
    if (isTokenExpired()) {
      navigate('/login'); // Redirect to login if token is expired
      return; // Stop further execution if token is expired
    }

    axios.get('http://localhost:5000/api/news')
      .then(res => {
        setNewsBySource(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [navigate]); // Add navigate to dependency array

  return (
    <>
      <Navbar isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
      <div className="container my-5">
        <h3 className="text-center text-teal mb-4 ">📰 Today's News by Newspaper</h3>

        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Accordion defaultActiveKey="0">
            {newsBySource.map((source, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header>
                  <strong>{source.name.toUpperCase()}</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    {source.articles.map((article, aIdx) => (
                      <div className="col-12 col-md-6 col-lg-4 mb-4" key={aIdx}>
                        <div className="card news-card h-100 shadow-sm">
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{article.title}</h5>
                            <p className="card-text">{article.description}</p>
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="mt-auto btn btn-teal w-100 w-md-auto">
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </div>
    </>
  );
};

export default NewsPage;

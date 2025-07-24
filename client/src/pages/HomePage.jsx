import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Navbar from '../components/Navbar';

const HomePage = ({ isDarkMode, onToggleDarkMode }) => {
    return (
        <div className={`d-flex flex-column min-vh-100 w-100${isDarkMode ? ' bg-dark text-light' : ''}`}>
            {/* Navbar */}
            <Navbar isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
            {/* Hero Section */}
            <div className="container text-center py-5 mt-3 hero-section rounded" style={{ background: '#fff', color: '#008080' }}>
                <h1 className="display-4 fw-bold mb-4" style={{ color: '#008080' }}>Stay Informed, Stay Organized</h1>
                <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px', color: '#222' }}>
                    DailySync is your one-stop platform to stay updated with the latest news, notes, and articles from multiple sources in one place. Access educational content, stay informed with current headlines, and discover insightful updates—all with a single click.
                </p>
            </div>
            {/* Features Section */}
            <div className="container py-5">
                <div className="row text-center mb-5">
                    <div className="col-12">
                        <h2 className="display-5 fw-bold text-teal">Why Choose DailySync?</h2>
                        <p className="lead text-muted">Here’s how DailySync helps you stay ahead:</p>
                    </div>
                </div>
                <div className="row g-4">
                    {/* Feature 1 */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-light h-100 feature-card">
                            <div className="card-body">
                                <h5 className="card-title">Stay Updated</h5>
                                <p className="card-text">
                                    Access the latest headlines and breaking news to stay informed about the world, all in one place.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-light h-100 feature-card">
                            <div className="card-body">
                                <h5 className="card-title">Educational Content</h5>
                                <p className="card-text">
                                    Find educational content that fits your interests, helping you grow your knowledge every day.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card shadow-sm border-light h-100 feature-card">
                            <div className="card-body">
                                <h5 className="card-title">Insights & Trends</h5>
                                <p className="card-text">
                                    Get insights and explore trending topics from a wide range of trusted sources tailored for you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Call to Action */}
            <div className="container text-center py-5 mb-3 cta-section rounded" style={{ background: '#f4f6f9', color: '#008080' }}>
                <h2 className="fw-bold mb-4">Join the DailySync Community</h2>
                <p className="lead mb-4" style={{ color: '#222' }}>Get the latest news, notes, and insights in one place. Stay organized, stay informed, and stay ahead.</p>
                <Link to="/register" className="btn btn-lg btn-light text-teal w-100 w-md-auto">Start Exploring</Link>
            </div>
        </div>
    );
};

export default HomePage;

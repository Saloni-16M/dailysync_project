import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaPlusCircle, FaEdit, FaStickyNote, FaSearch } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './NotesPage.css';
import isTokenExpired from '../utils/isTokenExpired';
// import { Navbar } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Toast, Modal, Button, Spinner } from 'react-bootstrap';
const NotesPage = ({ isDarkMode, onToggleDarkMode }) => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('');
  const [editModalShow, setEditModalShow] = useState(false);
  const [editNote, setEditNote] = useState({ _id: '', title: '', content: '' });
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      if (isTokenExpired()) {
        navigate('/login');
        return;
      }
      const res = await axios.get(`${apiUrl}/notes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotes(res.data);
    } catch (error) {
      setToastMessage('Failed to fetch notes.');
      setToastVariant('danger');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async e => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/notes`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setToastMessage('Note added successfully!');
      setToastVariant('success');
      setShowToast(true);
      setForm({ title: '', content: '' });
      await fetchNotes();
    } catch (error) {
      setToastMessage('Failed to add note.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`${apiUrl}/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setToastMessage('Note deleted successfully!');
      setToastVariant('success');
      setShowToast(true);
      fetchNotes();
    } catch (error) {
      setToastMessage('Failed to delete note.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  const handleEditClick = (note) => {
    setEditNote(note);
    setEditModalShow(true);
  };

  const handleEditChange = (e) => {
    setEditNote({ ...editNote, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`${apiUrl}/notes/${editNote._id}`, {
        title: editNote.title,
        content: editNote.content
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setToastMessage('Note updated successfully!');
      setToastVariant('success');
      setShowToast(true);
      setEditModalShow(false);
      fetchNotes();
    } catch (error) {
      setToastMessage('Failed to update note.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Filter notes by search
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  // Floating Add Note Button handler
  const handleFabClick = () => {
    document.getElementById('add-note-title')?.focus();
  };

  return (<>
  <Navbar onToggleDarkMode={onToggleDarkMode} isDarkMode={isDarkMode} />
    <div className={`container mt-5 position-relative${isDarkMode ? ' bg-dark text-light' : ''}`}>
      <h3 className="text-center text-teal mb-4">Your Notes</h3>
      {/* Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8">
          <div className={`card search-bar-card shadow-sm p-3 mb-3${isDarkMode ? ' bg-secondary text-light' : ' bg-white'}`}
               style={{ borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0" style={{ fontSize: 18, color: isDarkMode ? '#4fd1c5' : '#008080' }}>
                <FaSearch />
              </span>
              <input
                type="text"
                className={`form-control border-0${isDarkMode ? ' bg-dark text-light' : ''}`}
                placeholder="Search notes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ fontSize: 17, background: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Add Note Form */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8">
          <div className={`card add-note-card shadow-sm p-4 mb-4${isDarkMode ? ' bg-secondary text-light' : ' bg-white'}`}
               style={{ borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
            <div className="d-flex align-items-center mb-3">
              <FaStickyNote className="me-2 text-teal" style={{ fontSize: 24 }} />
              <h5 className="mb-0 fw-bold">Add a New Note</h5>
            </div>
            <form onSubmit={handleAddNote}>
              <div className="mb-3">
                <input
                  id="add-note-title"
                  type="text"
                  className={`form-control mb-2${isDarkMode ? ' bg-dark text-light' : ''}`}
                  placeholder="Title"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
                <textarea
                  className={`form-control mb-2${isDarkMode ? ' bg-dark text-light' : ''}`}
                  placeholder="Content"
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-teal px-4 py-2 d-flex align-items-center gap-2" type="submit">
                  <FaPlusCircle /> Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Toast Feedback */}
      <Toast show={showToast} onClose={() => setShowToast(false)} bg={toastVariant} delay={2000} autohide style={{ position: 'absolute', top: 10, right: 10, zIndex: 9999 }}>
        <Toast.Body className="text-white">{toastMessage}</Toast.Body>
      </Toast>
      {/* Edit Note Modal */}
      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton className={isDarkMode ? 'bg-dark text-light' : ''}>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
          <input
            type="text"
            name="title"
            className={`form-control mb-2${isDarkMode ? ' bg-dark text-light' : ''}`}
            placeholder="Title"
            value={editNote.title}
            onChange={handleEditChange}
            required
          />
          <textarea
            name="content"
            className={`form-control mb-2${isDarkMode ? ' bg-dark text-light' : ''}`}
            placeholder="Content"
            value={editNote.content}
            onChange={handleEditChange}
            required
          />
        </Modal.Body>
        <Modal.Footer className={isDarkMode ? 'bg-dark text-light' : ''}>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Floating Add Note Button */}
      <button className="fab-add-note" type="button" onClick={handleFabClick} title="Add a note">
        <FaStickyNote />
      </button>
      {/* Display Notes */}
      <div className="row">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <Spinner animation="border" variant={isDarkMode ? 'light' : 'primary'} />
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center text-muted py-5">
            <div className="notes-empty-illustration">📝</div>
            <h5>No notes found.</h5>
            <p>Start by adding a new note!</p>
          </div>
        ) : (
          <TransitionGroup component={null}>
            {filteredNotes.map(note => (
              <CSSTransition key={note._id} timeout={300} classNames="fade">
                <div className="col-12 col-md-6 mb-4">
                  <div className="card notes-card shadow-sm p-3 rounded h-100">
                    <div className="mb-2">
                      <span className={`note-tag ${getRandomCategory(note._id)}`}>{getRandomCategory(note._id).toUpperCase()}</span>
                    </div>
                    <h5 className="card-title text-teal">{note.title}</h5>
                    <p className="card-text">{note.content}</p>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-primary btn-sm w-100 w-md-auto" 
                        onClick={() => handleEditClick(note)}>
                        <FaEdit className="me-2" /> Edit
                      </button>
                      <button 
                        className="btn btn-danger btn-sm w-100 w-md-auto" 
                        onClick={() => handleDelete(note._id)}>
                        <FaTrash className="me-2" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    </div>
    </>
  );
};

// Demo categories for tags
const categories = ['work', 'idea', 'personal'];
function getRandomCategory(id) {
  // Use id to get consistent random for demo
  const idx = id ? id.charCodeAt(0) % categories.length : Math.floor(Math.random() * categories.length);
  return categories[idx];
}

export default NotesPage;

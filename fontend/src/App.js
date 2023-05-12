import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Books from './components/Books';
import { Route, Routes } from 'react-router-dom';
import Book from './components/Book';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
function App() {
  return (
    <>   
    <div className="App">
      <Routes> 
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<Book />} />
      </Routes>
    </div>
    </>

  );
}

export default App;

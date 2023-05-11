import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Books from './components/Books';
import { Route, Routes } from 'react-router-dom';
import Book from './components/Book';
function App() {
  return (
    <>   
    <div className="App">
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<Book />} />
      </Routes>
    </div>
    </>

  );
}

export default App;

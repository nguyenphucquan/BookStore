import React from 'react';
import './App.css';
import Books from './components/Books';
import { Route, Routes } from 'react-router-dom';
import Book from './components/Book';
import LoginForm from './components/LoginForm';
import Hello from './components/Hello';
import LogoutForm from './components/LogoutForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<LogoutForm />} />
        <Route path="/hello" element={<Hello />} />

      </Routes>
    </div>
  );
}

export default App;

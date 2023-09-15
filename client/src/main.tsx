import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use BrowserRouter, Routes, and Route
import './index.css';
import App from './App';
import { UserContextProvider } from './context/UserContext';

// eslint-disable-next-line react-refresh/only-export-components
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/api" element={<App />} />
    <Route path="/login" element={<App />} />
    <Route path="/api/login" element={<App />} />
    <Route path="/dashboard" element={<App />} />
  </Routes>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserContextProvider>
  </React.StrictMode>
);

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddReview from './components/Reviews/AddReview';
import EditReview from './components/Reviews/EditReview';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/Routing/PrivateRoute';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/add-review" element={
            <PrivateRoute>
              <AddReview />
            </PrivateRoute>
          } />
          <Route path="/edit-review/:id" element={
            <PrivateRoute>
              <EditReview />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
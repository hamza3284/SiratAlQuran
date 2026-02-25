import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';import GetGuidancePage from './pages/GetGuidancePage';
import AyatsPage from './pages/AyatsPage';
import AyatDetail from './pages/AyatDetail';
import ContactPage from './pages/ContactPage';

// Protected Components
import Journal from './components/Journal';
import PrivateRoute from './components/PrivateRoute';

// Admin Components
import AdminRoute from './context/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import ThemesList from './pages/admin/ThemesList';
import ThemeForm from './pages/admin/ThemeForm';
import AyatsList from './pages/admin/AyatsList';
import AyatForm from './pages/admin/AyatForm';
import ContactsList from './pages/admin/ContactsList';



function Root() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guidance" element={<GetGuidancePage />} />
        <Route path="/ayats" element={<AyatsPage />} />
        <Route path="/ayats/:id" element={<AyatDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/journal"
          element={
            <PrivateRoute>
              <Journal />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Nested Admin Routes */}
          <Route index element={<Navigate to="/admin/themes" replace />} />
          <Route path="themes" element={<ThemesList />} />
          <Route path="themes/new" element={<ThemeForm />} />
          <Route path="themes/:id/edit" element={<ThemeForm />} />
          <Route path="ayats" element={<AyatsList />} />
          <Route path="ayats/new" element={<AyatForm />} />
          <Route path="ayats/:id/edit" element={<AyatForm />} />
          <Route path="contacts" element={<ContactsList />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default Root;

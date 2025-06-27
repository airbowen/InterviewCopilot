import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Login from './pages/Login';
import ModeSelection from './pages/ModeSelection';
import Interview from './pages/Interview';
import Analysis from './pages/Analysis';
import IELTSEvaluation from './pages/IELTSEvaluation';
import Assistant from './pages/Assistant';
import Dashboard from './pages/Dashboard';
import InterviewPractice from './pages/InterviewPractice';
import IELTSAssessment from './pages/IELTSAssessment';
import Report from './pages/Report';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/login" element={<Login />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mode" 
            element={
              <ProtectedRoute>
                <ModeSelection />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/interview" 
            element={
              <ProtectedRoute>
                <Interview />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/interview-practice" 
            element={
              <ProtectedRoute>
                <InterviewPractice />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analysis" 
            element={
              <ProtectedRoute>
                <Analysis />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ielts" 
            element={
              <ProtectedRoute>
                <IELTSEvaluation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ielts-assessment" 
            element={
              <ProtectedRoute>
                <IELTSAssessment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/report" 
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
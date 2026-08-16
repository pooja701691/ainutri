import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Layouts
import MainLayout from './layouts/MainLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';

// Pages
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AnalyzeFood from './pages/AnalyzeFood.jsx';
import AnalysisResult from './pages/AnalysisResult.jsx';
import FoodHistory from './pages/FoodHistory.jsx';
import FoodDetails from './pages/FoodDetails.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        {/* Custom rounded, styled toasts for a premium UI feel */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#1f2937',
              borderRadius: '20px',
              border: '1px solid #f1f5f9',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
              fontSize: '13px',
              fontWeight: '600',
              padding: '12px 20px'
            }
          }}
        />
        
        <Routes>
          {/* Public Home & Landing Pages */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Guest Authentication Pages */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected Client Dashboard Pages */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analyze" element={<AnalyzeFood />} />
              <Route path="/analysis-result" element={<AnalysisResult />} />
              <Route path="/history" element={<FoodHistory />} />
              <Route path="/food/:id" element={<FoodDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

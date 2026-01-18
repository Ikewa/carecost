import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';


// --- IMPORT THE REAL PAGES ---
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import HealthLog from './pages/HealthLog';
import Budget from './pages/Budget';
import Analytics from './pages/Analytics';

// Placeholder for pages we haven't built yet

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 1. Connect the Dashboard */}
          <Route index element={<Dashboard />} />
          
          {/* 2. Connect the Marketplace */}
          <Route path="market" element={<Marketplace />} />
          
          {/* 3. Connect the Health Log */}
          <Route path="health" element={<HealthLog />} />

          <Route path="budget" element={<Budget />} />
          
          {/* Placeholders */}
          
          <Route path="analytics" element={<Analytics />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
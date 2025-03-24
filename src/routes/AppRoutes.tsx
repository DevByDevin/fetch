import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Login } from '../pages/Login';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<div />} />
      <Route path="/contact" element={<div />} />
    </Routes>
  );
};

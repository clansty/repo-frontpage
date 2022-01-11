import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Package from './Package';

export default () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path=":arch/:package" element={<Package />} />
      </Route>
    </Routes>
  );
};

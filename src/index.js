// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Header from './Header';
import PassCorrection from './ShiftB';
import Model_Summary from './Modal_Summary';
import Email from './Email';
import ShiftA from './ShitfA';
import ShiftB from './ShiftB';
import ShiftC from './ShiftC';
import Pending_Works from './PendingWorks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Header' element={<Header />} />
        <Route path='/Pass_Correction' element={<PassCorrection />} />
        <Route path='/Model_Summary' element={<Model_Summary />} />
        <Route path='/Email' element={<Email />} />
        <Route path='/ShiftA' element={<ShiftA />} />
        <Route path='/ShiftB' element={<ShiftB />} />
        <Route path='/ShiftC' element={<ShiftC />} />
        <Route path='/Pending_Works' element={<Pending_Works />} />

      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

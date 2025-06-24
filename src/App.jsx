import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatorPageWithPreview from './pages/CreatorPageWithPreview';
import InvitationPage from './pages/InvitationPageRedirect';
import FinalInvitationPage from './pages/FinalInvitationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatorPageWithPreview />} />
        <Route path="/invitation" element={<InvitationPage />} />
        <Route path="/invitation/final" element={<FinalInvitationPage />} />
      </Routes>
    </Router>
  );
}

export default App;

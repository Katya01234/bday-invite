import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
// InvitePage создадим чуть позже
import InvitePage from './pages/InvitePage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/invite" element={<InvitePage />} />
      </Routes>
    </Router>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import ExpensesPage from './features/expenses/ExpensesPage';
import InsightsPage from './features/insights/InsightsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute><ExpensesPage /></ProtectedRoute>
      } />
      <Route path="/insights" element={
        <ProtectedRoute><InsightsPage /></ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
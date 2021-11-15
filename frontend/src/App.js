import './App.css';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import 'react-notifications/lib/notifications.css';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function GetApiUrl() {
  switch(process.env.NODE_ENV) {
    case 'production':
      return 'https://prod.com';
    case 'development':
    default:
      return 'http://127.0.0.1:8081';
  }
}

function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<LoginForm apiUrl={GetApiUrl()}/>}/>
          <Route path="/login" element={<LoginForm apiUrl={GetApiUrl()}/>}/>
          <Route path="/login/signUpSuccess" element={<LoginForm apiUrl={GetApiUrl()} signUpSuccess={true}/>}/>
          <Route path="/signup" element={<SignUp apiUrl={GetApiUrl()} navigate={navigate}/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;

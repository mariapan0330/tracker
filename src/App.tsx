import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewEntryForm from "./components/NewEntryForm";

function App() {
  const [userExists, setUserExists] = useState<boolean | undefined>();
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      setUserExists(auth.currentUser?.email !== undefined);
    });
  }, [userExists]);

  return (
    <Router>
      <div className="bg-gradient-to-t from-cyan-700 to-blue-950">
        <NavBar />
        <Routes>
          <Route path="/" element={userExists ? <Home /> : <Auth />} />
          <Route path="/new-entry-form" element={<NewEntryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

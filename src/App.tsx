import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewEntryForm from "./components/NewEntryForm";
import Footer from "./components/Footer";

function App() {
  const [userExists, setUserExists] = useState<boolean | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserExists(!!user?.email);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userExists]);

  return (
    <Router>
      <div
        className={`bg-gradient-to-t from-cyan-700 to-blue-950 h-screen transition-opacity ${
          loading ? "opacity-100" : "opacity-0 hidden"
        }`}
      ></div>
      <div
        className={`bg-gradient-to-t from-cyan-800 to-blue-950 relative max-w-screen overflow-x-hidden`}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={userExists ? <Home /> : <Auth />} />
          <Route path="/new-entry-form" element={<NewEntryForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

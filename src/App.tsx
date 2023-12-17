import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

function App() {
  const [userExists, setUserExists] = useState<boolean | undefined>();
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      setUserExists(auth.currentUser?.email !== undefined);
    });
  }, [userExists]);

  return (
    <div className="bg-gradient-to-t from-cyan-700 to-blue-950">
      <NavBar />
      {userExists ? <Home /> : <Auth />}
    </div>
  );
}

export default App;

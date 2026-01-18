import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import ProductList from './components/ProductList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Toolbar from './components/Toolbar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      if (isRegistering) {
        return;
      }

      if (currentUser) {
        setUser(currentUser);
        setView("store");
      } else {
        setUser(null);

        if (view === "store") {
          setView("login");
        }
      }
    });

    return () => unsubscribe();
  }, [isRegistering, view]);


  const handleLogout = () => {
    signOut(auth).then(() => {
      setView("login");
    });
  };


  const handleRegisterStart = () => {
    setIsRegistering(true);
  };


  const handleRegisterComplete = () => {
    setIsRegistering(false);
    setRegisterError("");
    setView("login");
  };


  const handleRegisterSuccess = (message) => {
    setRegisterSuccess(message);
    setRegisterError("");
  };


  const handleRegisterError = (message) => {
    setRegisterError(message);
    setRegisterSuccess("");
  };

  return (
    <div className='container my-5'>

      {user && <Toolbar user={user} onLogout={handleLogout} />}


      {!user && view === "login" && <Login onLogin={setUser} />}


      {!user && view === "register" && (
        <Register
          onRegisterStart={handleRegisterStart}
          onRegistered={handleRegisterComplete}
          onSuccess={handleRegisterSuccess}
          onError={handleRegisterError}
        />
      )}


      {user && <ProductList />}


      {!user && (
        <div className="text-center mt-3">
          {view === "login" ? (
            <p>
              ¿No tienes cuenta?{" "}
              <button className="btn btn-link" onClick={() => setView("register")}>
                Regístrate
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{" "}
              <button className="btn btn-link" onClick={() => { setView("login"); setRegisterSuccess(""); setRegisterError(""); }}>
                Inicia sesión
              </button>
            </p>
          )}
        </div>
      )}


      {!user && view === "register" && (
        <div className="d-flex justify-content-center">
          {registerSuccess && (
            <div className="alert alert-success text-center mt-3 shadow-sm" role="alert">
              <i className="bi bi-check-circle-fill me-2"></i>
              {registerSuccess}
            </div>
          )}


          {registerError && (
            <div className="alert alert-danger text-center mt-3 shadow-sm" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {registerError}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;


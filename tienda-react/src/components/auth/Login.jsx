import { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [, forceUpdate] = useState({});

    const validator = useRef(
        new SimpleReactValidator({
            element: (message) => <p className="text-danger">{message}</p>,
            messages: {
                required: "El campo de :attribute es obligatorio",
                email: "El :attribute ingresado no es válido",
            },
        })
    );

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        if (!validator.current.allValid()) {
            validator.current.showMessages();
            forceUpdate({});
            return;
        }

        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false);
                if (onLogin) onLogin(userCredential.user);
            })
            .catch(() => {

                setError("Usuario o contraseña incorrectos");
                setLoading(false);
            });
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="card auth-card p-4 shadow-sm">
                <h3 className="card-title text-center mb-4">Iniciar sesión</h3>
                <form onSubmit={handleLogin} noValidate>
                    <div className="mb-3 inputs">
                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        {validator.current.message("correo", email, "required|email")}
                    </div>

                    <div className="mb-3 inputs">
                        <input
                            type="password"
                            name="contraseña"
                            placeholder="Contraseña"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                        {validator.current.message("contraseña", password, "required")}
                    </div>
                    <div className="mb-3 global-error">
                        {error && <p className="text-danger">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading && (
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        )}
                        {loading ? "Ingresando..." : "Iniciar sesión"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

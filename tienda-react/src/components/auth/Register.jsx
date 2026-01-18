import { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth } from "../../firebase";

function Register({ onRegisterStart, onSuccess, onError }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [, forceUpdate] = useState({});


    const validator = useRef(
        new SimpleReactValidator({
            element: (message) => <p className="text-danger small mb-0">{message}</p>,
            messages: {
                required: "El campo de :attribute es obligatorio",
                min: "El campo :attribute debe tener al menos :min caracteres",
                email: "Debe ingresar un :attribute válido",
                in: "Las contraseñas no coinciden",
            },
        })
    );


    const getErrorMessage = (errorCode) => {
        const errorMessages = {
            "auth/email-already-in-use": "Este correo ya está registrado. Intenta iniciar sesión.",
            "auth/invalid-email": "El correo electrónico no es válido.",
            "auth/operation-not-allowed": "Operación no permitida.",
            "auth/weak-password": "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.",
            "auth/network-request-failed": "Error de conexión. Verifica tu internet.",
            "auth/too-many-requests": "Demasiados intentos. Intenta más tarde.",
        };

        return errorMessages[errorCode] || "Ocurrió un error inesperado. Intenta nuevamente.";
    };


    const handleRegister = (e) => {
        e.preventDefault();

        if (onError) onError("");
        if (onSuccess) onSuccess("");

        if (!validator.current.allValid()) {
            validator.current.showMessages();
            forceUpdate({});
            return;
        }

        if (password !== confirmPassword) {
            if (onError) onError("Las contraseñas no coinciden");
            return;
        }


        const userEmail = email;
        const userPassword = password;
        const displayName = username;

        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        validator.current.hideMessages();

        setLoading(true);
        if (onRegisterStart) {
            onRegisterStart();
        }


        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                return updateProfile(userCredential.user, { displayName: displayName });
            })
            .then(() => {
                return signOut(auth);
            })
            .then(() => {
                if (onSuccess) onSuccess("¡Registro exitoso! Ya puedes iniciar sesión con tu cuenta.");
                setLoading(false);
            })
            .catch((err) => {
                if (onError) onError(getErrorMessage(err.code));
                setLoading(false);
            });
    };


    return (
        <div className="d-flex justify-content-center">
            <div className="card auth-card p-4 shadow-sm">
                
                <h3 className="card-title text-center mb-4">Registro</h3>

                <form onSubmit={handleRegister} noValidate>
                    <div className="mb-3 inputs">
                        <input
                            type="text"
                            name="nombre de usuario"
                            placeholder="Nombre de usuario"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                        />
                        {validator.current.message("nombre de usuario", username, "required|min:3")}
                    </div>


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
                        {validator.current.message("contraseña", password, "required|min:6")}
                    </div>


                    <div className="mb-3 inputs">
                        <input
                            type="password"
                            name="confirmar contraseña"
                            placeholder="Confirmar contraseña"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                        />
                        {validator.current.message(
                            "confirmar contraseña",
                            confirmPassword,
                            `required|in:${password}`
                        )}
                    </div>


                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading && (
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        )}
                        {loading ? "Procesando..." : "Registrarse"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
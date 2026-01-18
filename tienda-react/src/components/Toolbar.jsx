
function Toolbar({ user, onLogout }) {
    return (

        <div className="toolbar d-flex justify-content-between align-items-center p-3 mb-4 shadow-sm bg-white rounded">
            <div className="toolbar-user">
                <span className="toolbar-greeting">Bienvenido/a</span>
                <span className="toolbar-username">{user.displayName}</span>
            </div>


            <h1 className="toolbar-title m-0 text-center w-bold text-dark fs-3">TodoPC React</h1>


            <button className="btn btn-outline-danger btn-logout" onClick={onLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Cerrar sesión
            </button>
        </div>
    );
}
export default Toolbar;
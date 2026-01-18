
function Cart({ carrito, onRemove }) {
    const total = carrito.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );


    return (
        <div className="card cart-card mt-5 shadow-sm">
            <div className="card-body">

                <h5 className="card-title text-center mb-4">Carrito</h5>

                {carrito.length === 0 ? (
                    <p className="text-muted text-center"><em>El carrito está vacío</em></p>
                ) : (
                    <ul className="list-group mb-3">
                        {carrito.map((item) => (
                            <li key={item.id} className="list-group-item cart-item d-flex align-items-center flex-wrap">
                                {item.imagenUrl && (
                                    <img
                                        src={item.imagenUrl}
                                        alt={item.nombre}
                                        className="cart-item-img me-3"
                                    />
                                )}


                                <div className="d-flex flex-grow-1 align-items-center justify-content-between flex-wrap cart-item-info">
                                    <span className="cart-item-name"><strong>{item.nombre}</strong></span>
                                    <span className="cart-item-quantity">Cantidad: {item.cantidad}</span>
                                    <span className="cart-item-price">
                                        $ {(item.precio * item.cantidad).toLocaleString("es-CL")}
                                    </span>
                                </div>


                                <button className="btn btn-outline-danger btn-sm ms-2 mt-2 mt-md-0" onClick={() => onRemove(item.id)}>
                                    <i className="bi bi-cart-x-fill"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}


                <div className="text-center mt-3 p-2 bg-light rounded">
                    <h6>
                        Total: <strong>${total.toLocaleString("es-CL")}</strong>
                    </h6>
                </div>
            </div>
        </div>
    );
}

export default Cart;

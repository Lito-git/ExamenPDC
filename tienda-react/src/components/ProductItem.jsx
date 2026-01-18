
function ProductItem({ producto, onAdd }) {
    return (

        <div className="card product-card d-flex flex-column h-100">

            <img
                src={producto.imagenUrl}
                className="card-img-top"
                alt={producto.nombre}
            />


            <div className="card-body d-flex flex-column justify-content-between flex-grow-1 text-center">
                <div>
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion}</p>
                </div>
            </div>


            <ul className="list-group list-group-flush text-center">
                <li className="list-group-item">
                    <strong>$ {producto.precio.toLocaleString("es-CL")}</strong>
                    <br />
                    Disponibles: {producto.stock}
                </li>
            </ul>


            <div className="card-footer d-grid mt-2">
                <button
                    className="btn btn-outline-primary btn-md w-100"
                    onClick={() => onAdd(producto)}
                    disabled={producto.stock === 0}
                >
                    {producto.stock === 0 ? "Agotado" : "Agregar al carrito"}
                </button>
            </div>
        </div>
    );
}

export default ProductItem;

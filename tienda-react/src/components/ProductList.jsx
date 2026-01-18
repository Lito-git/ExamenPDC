import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import ProductItem from "./ProductItem";
import Cart from "./Cart";

function ProductList() {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const productosRef = collection(db, "productos");

        const unsubscribe = onSnapshot(
            productosRef,
            (querySnapshot) => {
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProductos(data);
            },
            (error) => console.error("Error al obtener productos:", error)
        );

        return () => unsubscribe();
    }, []);


    const agregarAlCarrito = (producto) => {
        if (producto.stock <= 0) return;

        const productoRef = doc(db, "productos", producto.id);

        getDoc(productoRef)
            .then((docSnap) => {
                if (!docSnap.exists()) return;

                const stockActual = docSnap.data().stock;
                if (stockActual <= 0) return;

                return updateDoc(productoRef, {
                    stock: stockActual - 1
                });
            })
            .then(() => {
                setCarrito(prev => {
                    const existe = prev.find(item => item.id === producto.id);

                    if (existe) {
                        return prev.map(item =>
                            item.id === producto.id
                                ? { ...item, cantidad: item.cantidad + 1 }
                                : item
                        );
                    }

                    return [...prev, { ...producto, cantidad: 1 }];
                });
            })
            .catch(console.error);
    };


    const quitarDelCarrito = (id) => {
        const item = carrito.find(i => i.id === id);
        if (!item) return;

        const productoRef = doc(db, "productos", id);

        getDoc(productoRef)
            .then((docSnap) => {
                if (!docSnap.exists()) return;

                const stockActual = docSnap.data().stock;

                return updateDoc(productoRef, {
                    stock: stockActual + item.cantidad
                });
            })
            .then(() => {
                setCarrito(prev => prev.filter(i => i.id !== id));
            })
            .catch(console.error);
    };

    
    return (
        <>
            <div className="d-flex flex-wrap justify-content-center product-list">
                {productos.map(producto => (
                    <div key={producto.id}>
                        <ProductItem
                            producto={producto}
                            onAdd={agregarAlCarrito}
                        />
                    </div>
                ))}
            </div>


            <Cart carrito={carrito} onRemove={quitarDelCarrito} />
        </>
    );
}

export default ProductList;

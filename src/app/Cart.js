import {useReducer} from "react";

const products = [
    {
        id: 1, 
        name: 'Bombilla cuadrada',
        price: 5.47
    },
    {
        id: 2, 
        name: 'Bombilla redonda',
        price: 2.99
    },
    {
        id: 3, 
        name: 'Bombilla fina',
        price: 7.75
    }
]
export default function Cart(){
    const initialValue = [{
        id: 1, 
        name: 'Bombilla cuadrada',
        price: 5.47,
        quantity: 2
    }]
    const [cart, dispatch] = useReducer(cartReducer, initialValue);
    
    function cartReducer(state, action){
        switch(action.type){
            case('handleAdd'):{
                let existe = false;
                const newCart = state.map((product) => {
                    if(product.id == action.product.id){
                        existe = true;
                        return {...product, quantity:product.quantity+1}
                    }else{
                        return product;
                    }
                })
                if(existe){
                    return newCart;
                }else{

                    return [...state, {...action.product, quantity:1}]
                }
            }
            case('handleRemove'):{
                let desaparece = false;
                let newCart = state.map((product) => {
                    if(product.id == action.productId){
                        if(product.quantity == 1){
                            desaparece = true
                        }
                        return {...product, quantity:product.quantity-1}
                    }else{
                        return product;
                    }
                })
                if(desaparece){
                    newCart = state.filter((product) => product.id != action.productId);
                }
                return newCart;
            }
            case('handleDelete'):{
                const newCart = state.filter((product) => product.id != action.productId);
                return newCart;
            }
        }
    }

    return <div>
        <h2>Catálogo</h2>
        <ol>
            {products.map((product) => 
            <li key={product.id}>
                <p>{product.name}{'    '}{product.price}$</p>
                <button onClick={() => dispatch({type:'handleAdd', product:product})}>Añadir a la cesta</button>
            </li>
            )}
        </ol>
        <h2>Carrito</h2>
        <ul>
            {cart.map((product) => 
            <li key={product.id}>
                <p>{product.name}{'    '}{product.price}$/ud{'    '}  
                <button onClick={() => dispatch({type:'handleRemove', productId:product.id})}>-</button>    
                    {product.quantity}{product.quantity == 1? 'ud':'uds'}
                <button onClick={() => dispatch({type:'handleAdd', product:product})}>+</button>{'    '}
                    {product.price*product.quantity}$ total{'    '}
                <button onClick={() => dispatch({type:'handleDelete', productId:product.id})}>ELIMINAR</button></p>
            </li>
            )}
        </ul>
    </div>
}
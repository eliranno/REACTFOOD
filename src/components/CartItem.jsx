import { useContext } from "react"
import CartContext from "../context/CartContextProvider"

export default function CartItem({item, ...props}) {

    const cartContext = useContext(CartContext);

    function increaseQuantity() {
        cartContext.addItem(item);
    }

    function decreaseQuantity() {
        cartContext.removeItem(item);
    }

    return <li className='cart-item'>
        <p>{item.name} - {item.count} X {item.price}</p>
        <p className="cart-item-actions">
            <button onClick={decreaseQuantity}>-</button>
            <span>QTY</span>
            <button onClick={increaseQuantity}>+</button>
        </p>
    </li>

}
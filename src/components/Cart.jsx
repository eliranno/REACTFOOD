import { useContext, useState } from "react";
import Modal from "./Modal";
import CartContext from "../context/CartContextProvider";
import Button from "./Button";
import UserProgresContext from "../context/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart(props) {
    const {open} = props;
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgresContext)
    const cartTotal = cartContext.items.reduce((total,item)=> total + item.count * item.price, 0);

    function handleCloseCart() {
        userProgressContext.hideCart();
    }

    function showCheckout() {
        userProgressContext.showCheckout();
    }


    return (
        <Modal open={userProgressContext.progress === 'cart'} className='cart' onClose={userProgressContext.progress === 'cart' ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {
                    cartContext.items.map(
                        (item) => (<CartItem key={item.id} item={item} />)
                    )
                }
                <p className="cart-total">${cartTotal}</p>
                <p className="modal-actions">
                    <Button textOnly onClick={handleCloseCart}>Close</Button>
                    {cartContext.items.length > 0 && <Button onClick={showCheckout}>Go to Checkout</Button>}
                </p>
            </ul>
        </Modal>
    );
}
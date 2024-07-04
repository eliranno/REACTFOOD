import { useContext, useRef, useState } from "react"
import Modal from "./Modal"
import CartContext from "../context/CartContextProvider";
import { USDollar } from "../util/formatting";
import Input from "./Input";
import UserProgresContext from "../context/UserProgressContext";
import Button from "./Button";

export default function Checkout() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgresContext);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);

    const cartTotal = cartContext.items.reduce((total,item)=> total + item.count * item.price, 0);

    function handleClose() {
        userProgressContext.hideCheckout();
    }
    function onSubmitHandlder(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const custumerData = Object.fromEntries(fd);

        const payload = {
            order : {
                items: [... cartContext.items.map(
                    (item)=> {
                        return {
                            ...item,
                            quantity: item.count,
                        }
                    }
                )],
                customer: custumerData,
            }
        };
        const response =  fetch("http://localhost:3000/orders", { 
            method:'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        userProgressContext.hideCheckout();
    }

    function handleEmailValidation(event) {
        const email = event.target?.value;
        if (email.length > 0 && email.indexOf('@') === -1) {
            setIsInvalidEmail(true);
        } else if (isInvalidEmail) {
            setIsInvalidEmail(false);
        }


    }

    return(
        <Modal open={userProgressContext.progress === 'checkout'} onClose={handleClose}> 
            <form onSubmit={onSubmitHandlder}>
                <h2>Checkout</h2>
                <p>Total Amount: {USDollar.format(cartTotal)}</p>

                <Input label="Full Name" type='text' id='name' />
                <Input label="Email Address" type='email' id='email' onBlur={handleEmailValidation}/>
                {isInvalidEmail && <p className="invalid-input">Email Address is Invalid</p>}
                <Input label='street' type='text' id='street' />
                <div className="control-row">
                    <Input label='Postal Code' type='text' id='postal-code'/>
                    <Input label='City' type='text' id='city'/>
                </div>

                <p className="modal-actions">
                    <Button type='button' textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit</Button>
                </p>

            </form>
        </Modal>
    );
}
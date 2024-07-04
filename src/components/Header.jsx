import { useContext } from 'react';
import logo from '../assets/logo.jpg'
import Button from './Button';
import CartContext from '../context/CartContextProvider';
import UserProgresContext from '../context/UserProgressContext';


function Header() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgresContext);
    const totalItems = cartContext.items.reduce((total, item) => total + item.count, 0);

    function showCart() {
        userProgressContext.showCart();
    }

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logo} alt='store logo'/>
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={showCart}>Cart ({totalItems})</Button>
            </nav>
        </header>
    );
}

export default Header;
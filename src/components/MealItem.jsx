import { useContext } from 'react';
import {USDollar} from '../util/formatting'
import Button from './Button';
import CartContext from '../context/CartContextProvider';

function MealItem(props) {
    const cartContext = useContext(CartContext);
    const {meal} = props

    return (
        <li key={meal.id} className="meal-item">
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt='meal-img' />
            <div>
            <h3>{meal.name}</h3>
            <p className="meal-item-price">{USDollar.format(meal.price)}</p>
            <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
            <Button onClick={()=>cartContext.addItem(meal)}>Add to Cart</Button>
            </p>
        </article>
    </li> 
    );
}

export default MealItem
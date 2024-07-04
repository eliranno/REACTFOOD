import { createContext, useReducer } from 'react';

const CartContext = createContext({
    items: [],
    addItem: ()=>{},
    removeItem: ()=>{},
});

const initialstate = {
    items : []
}

const cartReducer = (state, action) =>{
    const copyItems = [...state.items.map(item=>{return {...item}})];
    switch (action.type) {
        case 'ADD_ITEM':
            const itemIndex = copyItems.findIndex(
                (item)=>item.id === action.item.id
            );
            if(itemIndex > -1) {
                copyItems[itemIndex].count+=1;
            } 
            else {
                const newItem = {
                    id : action.item.id,
                    price : action.item.price,
                    name : action.item.name,
                    count : 1,
                }
                copyItems.push(newItem);

            }
            return {
                ...state,
                items: copyItems
            };
        case 'REMOVE_ITEM':
            const index = state.items.findIndex(item=> item.id === action.id);
            if(index > -1) {
                if(copyItems[index].count === 1){
                    copyItems.splice(index,1);
                }
                else {
                    copyItems[index].count-=1;
                }
            }
            return {
                ...state,
                items: copyItems
            };
        default:
            return state;
    }
};

export function CartContextProvider(props) {
    const {children} = props

    const [state, dispatch] = useReducer(
        cartReducer, {
            items: [],
        }
      );


    function removeItem(item) {
        const payload = {
            type: 'REMOVE_ITEM',
            id : item.id,
        }
        dispatch(payload);

    }
    function addItem(item) {
        const payload ={
            type : 'ADD_ITEM',
            item,
        };
        dispatch(payload);

    }
    const contextValue = {
        addItem,
        removeItem,
        items : state.items
    };

    return (
        <CartContext.Provider value = {contextValue}>
            {children}
        </CartContext.Provider>
    );

}

export default CartContext;
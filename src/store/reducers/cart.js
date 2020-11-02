import { act } from 'react-test-renderer'
import CartItem from '../../model/CartItem'
import {ADD_QUANTITY, ADD_TO_CART} from '../actions/cartAction'



const initialState = {
    items: {},
    totalAmount : 0

}
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addProduct = action.payload.product
            const quantity = action.payload.quantity
            const itemCart = new CartItem(
                quantity,
                addProduct.price * quantity,
                addProduct.nameProduct,
                addProduct.image,
                addProduct.price
            )
            return {
                ...state,
                items: {...state.items ,  [addProduct.id]: itemCart },
                totalAmount :state.totalAmount + itemCart.sum 
            }
        case ADD_QUANTITY: 
            const selectedCartItem = state.items[action.payload];
            let updatedCartItem = new CartItem(
                selectedCartItem.quantity + 1,
                selectedCartItem.productPrice,
                selectedCartItem.productTitle,
                selectedCartItem.productImage,
                selectedCartItem.sum + selectedCartItem.productPrice
                )
                let updatedCartItems = { ...state.items, [action.payload]: updatedCartItem };
                return {
                    ...state,
                    items: updatedCartItems,
                    totalAmount: state.totalAmount + updatedCartItem.sum
                };    
    }
    

    return state;
}
import CartItem from '../../model/CartItem';
import {
  ADD_QUANTITY,
  ADD_TO_CART,
  CHECK_OUT,
  SUB_QUANTITY,
} from '../actions/cartAction';

const initialState = {
  items: {},
  totalAmount: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.items[action.payload.product.id]) {
        const updatedItem = state.items[action.payload.product.id];
        let newUpdate = new CartItem(
          updatedItem.quantity + action.payload.quantity,
          updatedItem.sum,
          updatedItem.productTitle,
          updatedItem.productImage,
          updatedItem.productPrice,
        );
        return {
          ...state,
          items: {...state.items, [action.payload.product.id]: newUpdate},
          totalAmount:
            state.totalAmount +
            updatedItem.productPrice * action.payload.quantity,
        };
      } else {
        const addProduct = action.payload.product;
        const quantity = action.payload.quantity;
        const itemCart = new CartItem(
          quantity,
          addProduct.price * quantity,
          addProduct.nameProduct,
          addProduct.image,
          addProduct.price,
        );
        return {
          ...state,
          items: {...state.items, [addProduct.id]: itemCart},
          totalAmount: state.totalAmount + itemCart.sum,
        };
      }
    case ADD_QUANTITY:
      const selectedCartItem = state.items[action.payload];
      let updatedCartItem = new CartItem(
        selectedCartItem.quantity + 1,
        selectedCartItem.productPrice * selectedCartItem.quantity,
        selectedCartItem.productTitle,
        selectedCartItem.productImage,
        selectedCartItem.productPrice,
      );
      let updatedCartItems = {
        ...state.items,
        [action.payload]: updatedCartItem,
      };
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount + updatedCartItem.productPrice,
      };
    case SUB_QUANTITY:
      const selectItem = state.items[action.payload];
      const currentQty = selectItem.quantity;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectItem.quantity - 1,
          selectItem.sum - selectItem.productPrice,
          selectItem.productTitle,
          selectItem.productImage,
          selectItem.productPrice,
        );
        let updatedCartItems = {
          ...state.items,
          [action.payload]: updatedCartItem,
        };
        return {
          ...state,
          items: updatedCartItems,
          totalAmount: state.totalAmount - selectItem.productPrice,
        };
      } else {
        let updatedCartItems = {...state.items};
        delete updatedCartItems[action.payload];
        return {
          ...state,
          items: updatedCartItems,
          totalAmount: state.totalAmount - selectItem.productPrice,
        };
      }
    case CHECK_OUT:
      return initialState;
  }

  return state;
};

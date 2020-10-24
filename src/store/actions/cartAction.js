export const ADD_TO_CART = "ADD_TO_CART"
export const ADD_QUANTITY ="ADD_QUANTITY"

export const addToCart = (product ,quantity) => {
    return {
        type: ADD_TO_CART,
        payload : {product , quantity}
    }
}
export const addQuantity = (productId) => {
    return {
        type: ADD_QUANTITY,
        payload : productId
    }
}

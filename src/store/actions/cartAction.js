export const ADD_TO_CART = "ADD_TO_CART"
export const ADD_QUANTITY = "ADD_QUANTITY"
export const SUB_QUANTITY ="SUB_QUANTITY"
export const CHECK_OUT = "CHECK_OUT"
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
export const subQuantity = (productId) => {
    return {
        type: SUB_QUANTITY,
        payload : productId
    }
}
export const checkOut = () => {
    return {
        type : CHECK_OUT
    }
}

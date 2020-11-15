export const SIGN_IN = "SIGN_IN"
export const SIGN_OUT = "SIGN_OUT"
export const RESTORE_TOKEN = "RESTORE_TOKEN"

export const signIn = (token , profile) => {
    return {
        type: SIGN_IN,
        payload : {token , profile}
    }
}
export const signOut = () => {
    return {
        type: SIGN_OUT,
    }
}
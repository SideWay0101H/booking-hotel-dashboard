export const controlLoading = (status) =>{
    return {
        type: "CONTROL_LOADING",
        status
    }
}

export const uploadAvatar = (newAvatar) =>{
    return {
        type: 'UPDATE_AVATAR',
        payload: newAvatar
    }
} 
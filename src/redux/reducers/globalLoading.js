const intitialState = {
    status: false,
}

const globalLoading = (state = intitialState,action) =>{
    switch(action.type){
        case "CONTROL_LOADING":
             state = {
                status: action.status
             }
             return state  
        default :
             return state
    }
}

export default globalLoading
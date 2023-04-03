const GET_USER= 'users/GET_USER'

const getuseraction = (payload) => {
    return {
        type:GET_USER,
        payload
    }
}

export const getuserthunk = (id) => async dispatch =>{
    const response = await fetch(`/api/users/${id}`)
    if (response.ok){
        const data = await response.json()
        dispatch(getuseraction(data))
        return data
    }

}

const initialstate= {}

export  const userInfo = (state = initialstate, action) =>{
    const newstate= {...state}
    switch (action.type){
        case GET_USER:
            return action.payload

        default:
            return state


    }
}
export default userInfo

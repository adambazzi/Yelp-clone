
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const REMOVE_REVIEWS = 'reviews/REMOVE_REVIEWS'
const GET_SINGLE_REVIEW = 'reviews/GET_SINGLE_REVIEW'
const DELETE_SINGLE_REVIEW = 'reviews/DELETE_SINGLE_REVIEW'
// action creators
const loadReviews = payload => ({
    type: LOAD_REVIEWS,
    payload
});


const addReview = payload => ({
    type: ADD_REVIEW,
    payload
});

const removeReviews = () => ({
    type: REMOVE_REVIEWS
  })

  const getSingleReview = payload => ({
    type: GET_SINGLE_REVIEW,
    payload
  })
const deletereviewaction = (payload) => ({
        type:DELETE_SINGLE_REVIEW,
        payload
    })


// thunk functions
export const getReviews = () => async dispatch => {
    const response = await fetch('/api/reviews');
    if (response.ok) {
        const payload = await response.json();

        dispatch(loadReviews(payload))
    }
}

export const postReview = (id, post) => async dispatch => {
    const response = await fetch(`/api/businesses/${id}/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(addReview(data))
        return data;
    }
};

export const clearReviews = () => async dispatch => {
    dispatch(removeReviews())
}

export const readASingleReview = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`)

    if (response.ok) {
        const data = await response.json();

        dispatch(getSingleReview(data));
        return data;
    }
}

export const editReview = (id, review) => async dispatch =>{
    const response = await fetch (`/api/reviews/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(review)
    })
    if (response.ok){
        const data = await response.json()
        dispatch(addReview(data))
        return data
    }
}

export const deletereviewthunk = (id) => async dispatch =>{
    const response = await fetch(`/api/reviews/${id}`,{
        method:"DELETE",
        headers: { "Content-Type": "application/json" },
    })
    if (response.ok){
        const data = response.json()
        dispatch(deletereviewaction(id))
        return data
    }
}

const initialState = {}


const reviewReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case DELETE_SINGLE_REVIEW:
            delete newState[action.payload]
            return newState
        case GET_SINGLE_REVIEW:
            const review= action.payload
            return review
        case LOAD_REVIEWS:
            const reviews = action.payload
            return reviews
        case ADD_REVIEW:
            newState[action.payload.id] = action.payload;
            return newState;
        case REMOVE_REVIEWS:
            return {}
        default:
            return state;
    }
}

export default reviewReducer;

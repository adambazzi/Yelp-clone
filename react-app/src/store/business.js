

const LOAD_BUSINESSES = 'businesses/LOAD_BUSINESSES'
const ADD_BUSINESS = 'businesses/ADD_BUSINESS'
const LOAD_CURRENT_USER_BUSINESSES = 'businesses/LOAD_CURRENT_USER_BUSINESSES'
const Load_Single_Businness_Details = 'businesses/Load_Single_Businness_Details'
const LOAD_FILTERED = 'businesses/LOAD_FILTERED'
const REMOVE_BUSINESS = 'businesses/REMOVE_BUSINESS'

// Deletening one business from alll businesses
const DELETE_BUSINESS_FROM_ALL ='businesses/DELETE_BUSINESS_FROM_ALL'

// action creators
const loadBusinesses = payload => ({
  type: LOAD_BUSINESSES,
  payload
});


const addBusiness = payload => ({
  type: ADD_BUSINESS,
  payload
});


const loadUserBusinesses = payload => ({
  type: LOAD_CURRENT_USER_BUSINESSES,
  payload
});

export const loadSingleBusiness = payload =>({
  type:Load_Single_Businness_Details,
  payload
})


const deleteonebusiness = (idpayload) =>{
  return{
    type:DELETE_BUSINESS_FROM_ALL,
    idpayload
  }
}


export const loadFiltered = payload =>({
  type: LOAD_FILTERED,
  payload
})

const removeBusiness = () => ({
  type: REMOVE_BUSINESS
})

//thunk functions
export const getBusinesses = () => async dispatch => {
  const response = await fetch('/api/businesses');
  if (response.ok) {
    const payload = await response.json();
    dispatch(loadBusinesses(payload));
  }
};


export const createBusiness = (business) => async dispatch => {
  // const { name, description, features, address, city, state, lng, lat, price, categories,owner_id, image } = business
  const response = await fetch('/api/businesses', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(business)
  })

  if (response.ok) {
    const data = await response.json()

    dispatch(addBusiness(data))
    return data;
  }


};

export const updateBusiness = (id, business) => async dispatch => {
  const response = await fetch(`/api/businesses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(business)
  });

  if (response.ok) {
    const data = response.json();
    dispatch(addBusiness(data));
    return data;
  }
}


export const getUserBusinesses = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}/current`)

  if (response.ok) {
    const data = await response.json();
    dispatch(loadUserBusinesses(data))
    return data
  }
}


export const getSingleBusiness = (id) => async dispatch =>{
  const response = await fetch(`/api/businesses/${id}`)
  if (response.ok){
    const data = await response.json()
    dispatch(loadSingleBusiness(data))
    return data
  }
}

export const clearBusiness = () => async dispatch => {
  dispatch(removeBusiness())
}

export const removebuinessfunc = (id) => async dispatch =>{
  const response = await fetch (`/api/businesses/${id}`,{
    method:"DELETE",
    headers: { 'Content-Type': 'application/json' },
  })
  if (response.ok){
    dispatch(deleteonebusiness(id))
  }
}



const initialState = {
  all_businesses: {},
  business: {},
  filtered_businesses: {}
};


const businessesReducer = (state = initialState, action) => {
  let newState = {...state}
  const all_businesses = {};
  switch (action.type) {
    case DELETE_BUSINESS_FROM_ALL:
      delete newState.all_businesses[action.idpayload]
      return newState
    case Load_Single_Businness_Details:
      newState.business=action.payload
      return newState

    case LOAD_CURRENT_USER_BUSINESSES:
      action.payload.forEach(business => (all_businesses[business.id] = business));

      return {
        ...state,
        all_businesses
      }

    case ADD_BUSINESS:
      newState.all_businesses[action.payload.id] = action.payload;
      return newState;
    case LOAD_BUSINESSES:

      action.payload.businesses.forEach(business => (all_businesses[business.id] = business));
      return {
        ...state,
        all_businesses,
        filtered_businesses: all_businesses
      }
    case LOAD_FILTERED:
      const filtered_businesses = {}
      action.payload.forEach(biz=> filtered_businesses[biz.id] = biz)
      return {
        ...state,
        filtered_businesses
      }
    case REMOVE_BUSINESS:
      const clearBusiness = {}
      return {
          ...state,
          business: clearBusiness
      }
    default:
      return state;
  }
}

export default businessesReducer;



const LOAD_RECENT_ACTIVITY = 'recentActivity/LOAD_RECENT_ACTIVITY'
const REMOVE_RECENT_ACTIVITY = 'recentActivity/REMOVE_RECENT_ACTIVITY'

// action creators
const loadRecentActivity = payload => ({
  type: LOAD_RECENT_ACTIVITY,
  payload
});

const removeRecentActivity = () => ({
    type: REMOVE_RECENT_ACTIVITY
})

//thunk functions
export const getRecentActivity = () => async dispatch => {
  const response = await fetch('/api/activity/recent');
  if (response.ok) {
    const payload = await response.json();
    dispatch(loadRecentActivity(payload));
  }
};

export const clearRecentActivity = () => async dispatch => {
    dispatch(removeRecentActivity())
  }

const initialState = [];

const recentActivityReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_RECENT_ACTIVITY:
        return [...state, ...action.payload];
      case REMOVE_RECENT_ACTIVITY:
        return []
      default:
        return state;
    }
  };

export default recentActivityReducer;

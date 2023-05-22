import { LOCATION_CHANGE } from './actions';


function connectRouter(history) {
  let initialState = {
    location: history.location,
    action: history.action
  }
  return function (state = initialState, { type, payload }) {
    if (type === LOCATION_CHANGE) {
      let { location, action } = payload
      return { ...state, location, action };
    }
    return state;
  }
}
export default connectRouter;
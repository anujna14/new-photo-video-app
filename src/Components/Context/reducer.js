import { SEARCH_PHOTO_VIDEO } from "./action.types";
export default (state, action) => {
  switch (action.type) {
    case SEARCH_PHOTO_VIDEO:
      return action.payload;
    default:
      return state;
  }
};

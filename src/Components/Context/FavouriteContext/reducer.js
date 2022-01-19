import { ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE } from "./action.types";

export default (state, action) => {
  switch (action.type) {
    case ADD_TO_FAVOURITE:
      const alreadyFav = state.favourites.some(
        (fav) => fav.id === action.payload.id
      );
      const updatedState = alreadyFav
        ? state.favourites
        : state.favourites.concat(action.payload);
      // console.log("updatedState", updatedState);
      return {
        favouriteChecked: true,
        favourites: updatedState,
      };
    case REMOVE_FROM_FAVOURITE:
      // console.log("Action Payload for remove Filter", action.payload);
      const removeFromFav = state.favourites.filter(
        (fav) => fav.id !== action.payload
      );

      // console.log("removeFromFav", removeFromFav);
      return {
        favouriteChecked: false,
        favourites: removeFromFav,
      };
    default:
      return state;
  }
};

// export default (state, action) => {
//   if (action.type === ADD_TO_FAVOURITE) {
//     const alreadyFav = state.favourites.some(
//       (fav) => fav.id === action.payload.id
//     );
//     const updatedState = alreadyFav
//       ? state.favourites
//       : state.favourites.concat(action.payload);
//     return {
//       favouriteChecked: false,
//       favourites: updatedState,
//     };
//   }
// };

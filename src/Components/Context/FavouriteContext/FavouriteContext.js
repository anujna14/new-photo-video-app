import { createContext, useState } from "react";

export const FavouriteContext = createContext({
  favourites: [],
  addFav: (favItem) => {},
  removeFav: (itemId) => {},
  isFav: (itemId) => {},
});

const FavouriteContextProvider = (props) => {
  const [userFavourites, setUserFavourites] = useState([]);
  const addFavItem = (favItem) => {
    setUserFavourites((prevFav) => {
      return prevFav.concat(favItem);
    });
  };
  const removeFavItem = (itemId) => {
    setUserFavourites((prevFav) => {
      return prevFav.filter((item) => item.id !== itemId);
    });
  };

  const isItemIsFav = (itemId) => {
    return userFavourites.some((item) => item.id === itemId);
  };

  const contextValue = {
    favourites: userFavourites,
    addFav: addFavItem,
    removeFav: removeFavItem,
    isFav: isItemIsFav,
  };
  return (
    <FavouriteContext.Provider value={contextValue}>
      {props.children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteContextProvider;

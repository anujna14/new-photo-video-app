import React, { useReducer } from "react";
import { SearchContext } from "./Components/Context/SearchContext";
import SearchReducer from "./Components/Context/reducer";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import VideosHome from "./Components/Videos/VideosHome";
import Favourites from "./Components/Favourites/Favourites";
import Header from "./Components/Header/Header";
import Navigation from "./Components/Content/Navigation";
import Footer from "./Components/Footer/Footer";
import PhotoDetailsPage from "./Components/Home/PhotoDetailsPage";
import VideoDetailsPage from "./Components/Videos/VideoDetailsPage";
import { FavouriteContext } from "./Components/Context/FavouriteContext/FavouriteContext";
import FavorateReducer from "./Components/Context/FavouriteContext/reducer";
function App() {
  const initialState = {
    favouriteChecked: false,
    favourites: [],
  };
  const [searchItem, dispatch] = useReducer(SearchReducer, "mountains");
  const [favouriteitems, Favouritedispatch] = useReducer(
    FavorateReducer,
    initialState
  );
  return (
    <SearchContext.Provider value={{ searchItem, dispatch }}>
      <FavouriteContext.Provider value={{ favouriteitems, Favouritedispatch }}>
        <Header />
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/photos/:id" exact component={PhotoDetailsPage} />
          <Route path="/videos" exact component={VideosHome} />
          <Route path="/videos/:id" exact component={VideoDetailsPage} />
          <Route path="/favourites" exact component={Favourites} />
        </Switch>
      </FavouriteContext.Provider>
      <Footer />
    </SearchContext.Provider>
  );
}

export default App;

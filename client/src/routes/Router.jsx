import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import CardsPage from "../cards/pages/CardsPage";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import SignUpPage from "../users/pages/SignUpPage";
import LoginPage from "../users/pages/LoginPage";
import CardDetailsPage from "../cards/pages/CardDetailsPage";
import MyCardsPage from "../cards/pages/MyCardsPage";
import CreateCardPage from "../cards/pages/CreateCardPage";
import EditCardPage from "../cards/pages/EditCardPage";
import MyFavoriteCards from "../cards/pages/myFavoriteCards";
import UserProfilePage from "../profile/pages/UserProfilePage";
import Cards from "../cards/components/Cards";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<CardsPage />} />
      <Route path={ROUTES.FAV_CARDS} element={<MyFavoriteCards />} />
      <Route path={ROUTES.CARDS} element={<CardsPage />} />
      <Route path={ROUTES.MY_CARDS} element={<MyCardsPage />} />
      <Route path={ROUTES.CREATE_CARD} element={<CreateCardPage />} />
      <Route path={ROUTES.USER_PROFILE} element={<UserProfilePage />} />
      <Route path={`${ROUTES.EDIT_CARD}/:id`} element={<EditCardPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={`${ROUTES.CARD_INFO}/:id/:title/:url`}
        element={<CardDetailsPage />}
      />
      <Route path={ROUTES.LOGO} element={<Cards />} />
      <Route path={ROUTES.LOGOICON} element={<Cards />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;

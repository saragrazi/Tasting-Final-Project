import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import Spinner from "../components/Spinner";

const CardsPage = lazy(() => import("../cards/pages/CardsPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const SignUpPage = lazy(() => import("../users/pages/SignUpPage"));
const LoginPage = lazy(() => import("../users/pages/LoginPage"));
const CardDetailsPage = lazy(() => import("../cards/pages/CardDetailsPage"));
const MyCardsPage = lazy(() => import("../cards/pages/MyCardsPage"));
const CreateCardPage = lazy(() => import("../cards/pages/CreateCardPage"));
const EditCardPage = lazy(() => import("../cards/pages/EditCardPage"));
const MyFavoriteCards = lazy(() => import("../cards/pages/myFavoriteCards"));
const UserProfilePage = lazy(() => import("../profile/pages/UserProfilePage"));
const Cards = lazy(() => import("../cards/components/Cards"));
const UsersManagementPage = lazy(() => import("../users/pages/UsersManagementPage"));

const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path={ROUTES.ROOT} element={<CardsPage />} />
        <Route path={ROUTES.FAV_CARDS} element={<MyFavoriteCards />} />
        <Route path={ROUTES.CARDS} element={<CardsPage />} />
        <Route path={ROUTES.MY_CARDS} element={<MyCardsPage />} />
        <Route path={ROUTES.CREATE_CARD} element={<CreateCardPage />} />
        <Route path={ROUTES.USER_PROFILE} element={<UserProfilePage />} />
        <Route path={ROUTES.USERS_MANAGEMENT} element={<UsersManagementPage />} />
        <Route path={`${ROUTES.EDIT_CARD}/:id`} element={<EditCardPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={`${ROUTES.CARD_INFO}/:id/:title`}
          element={<CardDetailsPage />}
        />
        <Route path={ROUTES.LOGO} element={<Cards />} />
        <Route path={ROUTES.LOGOICON} element={<Cards />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;

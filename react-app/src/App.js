import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AllBusinessPage from "./components/AllBusinessPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FilterSearch from "./components/FilterSearch";
import HomePage from "./components/HomePage";
import CreateBusinessForm from "./components/CreateBusiness";
import WriteReviewForm from "./components/WriteReview";
import ManageBusinesses from "./components/ManageBusinesses";
import UpdateBusiness from "./components/UpdateBusiness/updatebusiness";
import SingleBusiness from "./components/SingleBusinessPage";
import UpdateReviewForm from "./components/UpdateReview";
import UserProfilePage from "./components/ProfilePage";
import AboutVGANPage from "./components/AboutVGANPage";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
const categories=['Chiness','THai', 'salam', 'mellim']
  return (
    <>
      <Navigation isLoaded={isLoaded} categories={categories} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <HomePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/testing">
            <FilterSearch/>
          </Route>
          <Route exact path="/businesses">
            <AllBusinessPage />
          </Route>
          <Route path="/businesses/new">
            <CreateBusinessForm />
          </Route>
          <Route exact path="/businesses/:id" >
            <SingleBusiness />
          </Route>
          <Route path="/businesses/:id/edit" >
            <UpdateBusiness />
          </Route>
          <Route exact path="/businesses/:id/reviews/new">
            <WriteReviewForm />
          </Route>
          <Route exact path="/users/:userId/" >
            <UserProfilePage />
          </Route>
          <Route exact path="/about" >
            <AboutVGANPage />
          </Route>
          {/* <Route path="/users/:userId/businesses" >
            <ManageBusinesses />
          </Route> */}
          <Route path="/reviews/:id/edit" >
            <UpdateReviewForm />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;

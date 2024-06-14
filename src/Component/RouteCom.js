import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import UserRegister from "../pages/UserRegister";
import Dashboard from "../pages/Dashboard";
import AllCompanies from "../pages/admin/AllCompanies";
import AddCompany from "../pages/admin/AddCompany";
import ViewCompany from "../pages/admin/ViewCompany";
import PrivateRoute from "../Routing/PrivateRoute";
import CompanyUsers from "../pages/company/CompanyUsers";
import ViewCompanyUser from "../pages/company/ViewCompanyUser";
import ApproveRequest from "../pages/admin/ApproveRequest";
import Role from "../pages/company/Role";
import Features from "../pages/company/Features";
import Products from "../pages/Products";
import Feedbacks from "../pages/Feedbacks";
import AddFeedback from "../pages/AddFeedback";
import ViewProduct from "../pages/ViewProduct";
import SingleFeature from "../pages/SingleFeature";
import AllFeatures from "../pages/AllFeatures";
import Users from "../pages/admin/Users";
import ViewUser from "../pages/admin/ViewUser";
import ViewCompanyUsers from "../pages/admin/ViewCompanyUsers";
import ViewCompanyFeatures from "../pages/admin/ViewCompanyFeatures";
import CompanyRequest from "../pages/company/CompanyRequest";
import FeatureDatatable from "../pages/FeatureDatatable";
import FeatureChartReport from "../pages/FeatureChartReport";
import StripeSetting from "../pages/StripeSetting";
import SearchArea from "../pages/SearchArea";
import NotFound from "../pages/NotFound";
import { Navigate } from "react-router-dom";
import CompanyDetails from "../pages/CompanyDetails";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import FeatureWishes from "../pages/FeatureWishes";
import ManageSubscriptionPlans from "../pages/admin/ManageSubscriptionPlans";
import ShowCase from "../pages/company/ShowCase";
import SearchCompanyFeatureComp from "./Search/SearchCompanyFeatureComp";
import FrontShowCase from "./front/FrontShowCase";
import ThemeSettingComp from "./theme/ThemeSettingComp";
import MenuComp from "./menu/MenuComp";
import TeamComp from "./team/TeamComp";
import AssignFeatureComp from "../pages/AssignFeatureComp";

const RouteCom = () => {
  return (
    <Routes>
      {/* START:: Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />
      <Route exact path="/" element={<Home />} />
      <Route path="/:company_name/showcase" element={<FrontShowCase/>}/>
      <Route exact path="/feature-wishes" element={<FeatureWishes />} />
      {/* END */}

      <Route exact path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* START:: Super Admin Routes */}
      <Route exact path="/" element={<PrivateRoute />}>
        <Route path="/admin/companies" element={<AllCompanies />} />
        <Route path="/admin/add-company" element={<AddCompany />} />
        <Route exact path="/admin/company/:id" element={<ViewCompany />} />
        <Route path="/admin/approve-request" element={<ApproveRequest />} />
        <Route path="/admin/users" element={<Users />} />
        <Route exact path="/admin/user/:id" element={<ViewUser />} />
        <Route
          exact
          path="/admin/company-users/:id"
          element={<ViewCompanyUsers />}
        />
         {/* for team */}
         <Route path="/teams" element={<TeamComp />} />
        <Route
          exact
          path="/admin/company-features/:id"
          element={<ViewCompanyFeatures />}
        />
        <Route
          exact
          path="/admin/subscription/manage"
          element={<ManageSubscriptionPlans />}
        />
        {/*for theme Setting */}
        <Route path="/theme/setting" element={<ThemeSettingComp />} />
        <Route path="/admin/set/menu" element={<MenuComp/>}/>
        <Route path="/assign/features" element={<AssignFeatureComp/>}/>
      </Route>
      {/* END:: Super Admin Routes */}
      <Route exact path="/" element={<PrivateRoute />}>
        <Route exact path="/company/all-users" element={<CompanyUsers />} />
        <Route exact path="/company/user/:id" element={<ViewCompanyUser />} />
        <Route exact path="/company/roles" element={<Role />} />
        <Route exact path="/company/features" element={<Features />} />
        <Route
          exact 
          path="/company/approve-requests"
          element={<CompanyRequest />}
        />
      </Route>
      {/* START::  */}

      <Route exact path="/" element={<PrivateRoute />}>
        <Route exact path="/products" element={<Products />} />
        {/* <Route exact path="/products/:id" element={<ViewProduct />} /> */}
        <Route
          exact
          path="/dashboard/:filter_type/:id"
          element={<ViewProduct />}
        />
        <Route exact path="/feedback" element={<Feedbacks />} />
        <Route exact path="/feedback/add" element={<AddFeedback />} />
        <Route exact path="/wish/:id" element={<SingleFeature />} />
        <Route exact path="/features" element={<AllFeatures />} />
        <Route exact path="/feature/all" element={<FeatureDatatable />} />
        <Route
          exact
          path="/feature-report/:id"
          element={<FeatureChartReport />}
        />
        <Route
          exact
          path="/company-profile/settings"
          element={<StripeSetting />}
        />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/search" element={<SearchArea />} />
        <Route exact path="/dashboard/company/:id" element={<SearchCompanyFeatureComp />} />
      </Route>
      {/* <Route exact path="/:company_slug" element={<CompanyDetails />} /> */}
      <Route exact path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default RouteCom;

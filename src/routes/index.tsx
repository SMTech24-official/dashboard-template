import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "../components/layouts/Dashboard";
import UnderConstruction from "../components/others/underConstructions";
import SignInPage from "../components/signIn/SignIn";
import BookingList from "../pages/BookingList";
import Dashboard from "../pages/Dashboard";
import ServicesList from "../pages/ServicePage";
import AddService from "../components/service/AddServices";
import CliniciansTable from "../components/clinicians/CliniciansTable";
import BlogPage from "../pages/Blog";
import AddBlogs from "../components/blog/AddBlogs";
import BlogDetails from "../pages/BlogDetails";
import LocationManagement from "../components/location/LocationTable";
import AddCliniciansTable from "../components/clinicians/AddCliniciansTable";
import Clinician from "../pages/Clinician";
import ClinicianDashboardLayout from "../components/layouts/ClinicianLayout";
import ClinicianBookingList from "../pages/ClinicianBooking";
import MyProfile from "../pages/MyProfile";

const RouterProvider: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignInPage />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index={true} element={<Dashboard />} />
                    <Route path="booking-list" element={<BookingList />} />
                    <Route index element={<UnderConstruction name="Service" />} />
                    <Route path="add-service" element={<AddService />} />
                    <Route path="all-service" element={<ServicesList />} />
                    <Route path="locations" element={<LocationManagement />} />
                    {/* <Route path="add-location" element={<UnderConstruction name="Add Location" />} /> */}
                    <Route path="all-location" element={<LocationManagement />} />
                    {/* <Route index element={<UnderConstruction name="Teams" />} />
                    <Route path="add-members" element={<UnderConstruction name="Add members" />} />
                    <Route path="all-members" element={<UnderConstruction name="All memberss" />} /> */}
                    <Route index element={<UnderConstruction name="Clinician" />} />
                    <Route path="add-clinicians" element={<AddCliniciansTable />} />
                    <Route path="all-clinicians" element={<CliniciansTable />} />
                    <Route index element={<UnderConstruction name="Blog" />} />
                    <Route path="add-blog" element={<AddBlogs />} />
                    <Route path="add-blog" element={<AddBlogs />} />
                    <Route path="blog/:id" element={<BlogDetails />} />
                    <Route path="all-blog" element={<BlogPage />} />
                </Route>

                <Route path="/clinician" element={<ClinicianDashboardLayout />}>
                    <Route index={true} element={<Clinician />} />
                    <Route path="booking-list" element={<ClinicianBookingList />} />
                    <Route path="my-profile" element={<MyProfile />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default RouterProvider;
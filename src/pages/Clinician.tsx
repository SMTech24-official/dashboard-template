import { Link } from "react-router-dom";
import ConnectCalendarCard from "../components/role-Clinician/Calender";
import ClinMetricCards from "../components/role-Clinician/cinMetricsCard";
import { useGetDashboardStatisticsQuery } from "../Redux/apis/dashboard/dashboardapi";
import ClinicianBookingList from "./ClinicianBooking";


const Clinician = () => {

    const { data: dashboardData } = useGetDashboardStatisticsQuery({});
    console.log(dashboardData, "dashboard");

    const statusData = dashboardData?.data?.all;
    console.log(dashboardData?.data?.day);


    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <ClinMetricCards
                    bookingCount={String(statusData?.booking)}
                />
                <ConnectCalendarCard />
            </div>



            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Booking List</h2>
                <Link
                    to={"/clinician/booking-list"}
                    className="bg-primary/80 hover:bg-primary text-white rounded-full px-4 py-2"
                >
                    See All
                </Link>
            </div>


            <ClinicianBookingList />
        </div>
    );
};

export default Clinician;

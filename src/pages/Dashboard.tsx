/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LineGraph from "../components/graph/LineGraph";
import MetricCards from "../components/metricaCard/MetricsCard";
import { useGetDashboardStatisticsQuery } from "../Redux/apis/dashboard/dashboardapi";
import {
  transformApiDataToMonthlyChart,
  transformApiDataToWeeklyChart,
  transformApiDataToYearlyChart,
} from "../utils/dataFormatHelper";
import BookingList from "./BookingList";

const dataWeekly = [
  { day: "Mon", Booking: 40, Clinician: 24, Location: 14, Services: 35 },
  { day: "Tue", Booking: 30, Clinician: 13, Location: 22, Services: 18 },
  { day: "Wed", Booking: 50, Clinician: 39, Location: 10, Services: 27 },
  { day: "Thu", Booking: 70, Clinician: 25, Location: 45, Services: 50 },
  { day: "Fri", Booking: 90, Clinician: 54, Location: 33, Services: 40 },
  { day: "Sat", Booking: 20, Clinician: 30, Location: 15, Services: 10 },
  { day: "Sun", Booking: 80, Clinician: 43, Location: 25, Services: 60 },
];


const Dashboard = () => {
  const [filterType, setFilterType] = useState<string>("Weekly");

  const [selectedData, setSelectedData] = useState<any>(dataWeekly);

  const { data: dashboardData } = useGetDashboardStatisticsQuery({
    days:
      filterType === "Weekly"
        ? 7
        : filterType === "Monthly"
          ? 30
          : filterType === "Yearly"
            ? 365
            : 7,
  });
  console.log(dashboardData, "dashboard");

  const statusData = dashboardData?.data?.all;
  console.log(dashboardData?.data?.day);

  useEffect(() => {
    if (dashboardData) {
      if (filterType === "Weekly") {
        const dataWeekly1 = transformApiDataToWeeklyChart(
          dashboardData?.data?.day
        );
        setSelectedData(dataWeekly1);
      } else if (filterType === "Monthly") {
        const dataWeekly1 = transformApiDataToMonthlyChart(
          dashboardData?.data?.day
        );
        setSelectedData(dataWeekly1);
      } else if (filterType === "Yearly") {
        const dataWeekly1 = transformApiDataToYearlyChart(
          dashboardData?.data?.day
        );
        setSelectedData(dataWeekly1);
      }
    }
  }, [dashboardData, filterType]);

  const handleFilterChange = (value: string) => {
    setFilterType(value);
    if (value === "Weekly") setSelectedData(dataWeekly);
  };

  const selectOptions = [
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  const lineConfigs = [
    { dataKey: "Booking", stroke: "#8884d8" },
    { dataKey: "Clinician", stroke: "#82ca9d" },
    { dataKey: "Services", stroke: "#6b21a8" },
    { dataKey: "Location", stroke: "#ffc658" },
  ];


  return (
    <div className="space-y-4">
      <MetricCards
        bookingCount={String(statusData?.booking)}
        cliniciansCount={statusData?.clinician}
        servicesCount={String(statusData?.service)}
        locationsCount={statusData?.location}
      />
      <LineGraph
        selectOptions={selectOptions}
        handleFilterChange={handleFilterChange}
        selectedData={selectedData}
        defaultValue="Weekly"
        lineConfigs={lineConfigs}
      />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Booking List</h2>
        <Link
          to={"/dashboard/booking-list"}
          className="bg-primary/80 hover:bg-primary text-white rounded-full px-4 py-2"
        >
          See All
        </Link>
      </div>
      <BookingList />
    </div>
  );
};

export default Dashboard;

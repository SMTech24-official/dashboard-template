/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import LineGraph from "../components/graph/LineGraph";
import MetricCards from "../components/metricaCard/MetricsCard";
import BookingListTable from "../components/booking/table/Bookingtable";

const dataWeekly = [
    { day: "Mon", Booking: 40, Clinicians: 24, Location: 14, Services: 35 },
    { day: "Tue", Booking: 30, Clinicians: 13, Location: 22, Services: 18 },
    { day: "Wed", Booking: 50, Clinicians: 39, Location: 10, Services: 27 },
    { day: "Thu", Booking: 70, Clinicians: 25, Location: 45, Services: 50 },
    { day: "Fri", Booking: 90, Clinicians: 54, Location: 33, Services: 40 },
    { day: "Sat", Booking: 20, Clinicians: 30, Location: 15, Services: 10 },
    { day: "Sun", Booking: 80, Clinicians: 43, Location: 25, Services: 60 },
];

const dataMonthly = [
    { day: "Week 1", Booking: 300, Clinicians: 180, Location: 100, Services: 280 },
    { day: "Week 2", Booking: 240, Clinicians: 140, Location: 80, Services: 200 },
    { day: "Week 3", Booking: 350, Clinicians: 210, Location: 150, Services: 300 },
    { day: "Week 4", Booking: 400, Clinicians: 250, Location: 200, Services: 370 },
];

const dataYearly = [
    { day: "Jan", Booking: 800, Clinicians: 500, Location: 300, Services: 700 },
    { day: "Feb", Booking: 700, Clinicians: 420, Location: 280, Services: 650 },
    { day: "Mar", Booking: 900, Clinicians: 600, Location: 500, Services: 850 },
    { day: "Apr", Booking: 750, Clinicians: 450, Location: 400, Services: 720 },
    { day: "May", Booking: 1000, Clinicians: 650, Location: 550, Services: 950 },
    { day: "Jun", Booking: 850, Clinicians: 530, Location: 430, Services: 820 },
    { day: "Jul", Booking: 950, Clinicians: 580, Location: 500, Services: 880 },
    { day: "Aug", Booking: 1100, Clinicians: 700, Location: 600, Services: 1050 },
    { day: "Sep", Booking: 900, Clinicians: 590, Location: 500, Services: 870 },
    { day: "Oct", Booking: 1000, Clinicians: 630, Location: 550, Services: 940 },
    { day: "Nov", Booking: 850, Clinicians: 540, Location: 430, Services: 820 },
    { day: "Dec", Booking: 1200, Clinicians: 750, Location: 650, Services: 1150 },
];


// Sample data
const data = [
    {
        key: '1',
        userName: 'John Doe',
        phoneNumber: '+1 234 567 8901',
        email: 'john@example.com',
        message: 'Looking for anxiety counseling',
        dateTime: '2023-06-15 10:30 AM',
        therapistName: 'Dr. Sarah Smith'
    },
    {
        key: '2',
        userName: 'Jane Smith',
        phoneNumber: '+1 345 678 9012',
        email: 'jane@example.com',
        message: 'Marriage counseling needed',
        dateTime: '2023-06-16 02:15 PM',
        therapistName: 'Dr. Michael Johnson'
    },
    {
        key: '3',
        userName: 'Robert Brown',
        phoneNumber: '+1 456 789 0123',
        email: 'robert@example.com',
        message: 'Depression therapy consultation',
        dateTime: '2023-06-17 11:00 AM',
        therapistName: 'Dr. Emily Davis'
    },
    {
        key: '4',
        userName: 'Alice Wilson',
        phoneNumber: '+1 567 890 1234',
        email: 'alice@example.com',
        message: 'Stress management sessions',
        dateTime: '2023-06-18 03:45 PM',
        therapistName: 'Dr. James Wilson'
    },
    {
        key: '5',
        userName: 'David Taylor',
        phoneNumber: '+1 678 901 2345',
        email: 'david@example.com',
        message: 'Couples therapy appointment',
        dateTime: '2023-06-19 09:30 AM',
        therapistName: 'Dr. Sarah Smith'
    },
];


const Dashboard = () => {

    const [selectedData, setSelectedData] = useState(dataWeekly);

    const handleFilterChange = (value: string) => {
        if (value === "Weekly") setSelectedData(dataWeekly);
        else if (value === "Monthly") setSelectedData(dataMonthly);
        else if (value === "Yearly") setSelectedData(dataYearly);
    };

    const selectOptions = [
        { value: "Weekly", label: "Weekly" },
        { value: "Monthly", label: "Monthly" },
        { value: "Yearly", label: "Yearly" },
    ];

    const lineConfigs = [
        { dataKey: "Booking", stroke: "#8884d8" },
        { dataKey: "Clinicians", stroke: "#82ca9d" },
        { dataKey: "Services", stroke: "#6b21a8" },
        { dataKey: "Location", stroke: "#ffc658" },
    ];


    const handleView = (record: any) => {
        console.log('Viewing record:', record);
        // Add your view logic here (e.g., open modal, navigate to detail page)
    };

    return (
        <div className="space-y-4">
            <MetricCards
                bookingCount="1,245"
                cliniciansCount={89}
                servicesCount="24"
                locationsCount={15}
            />
            <LineGraph
                selectOptions={selectOptions}
                handleFilterChange={handleFilterChange}
                selectedData={selectedData}
                defaultValue="Weekly"
                lineConfigs={lineConfigs}
            />
            <BookingListTable
                data={data}
                onView={handleView}
            />
        </div>
    );
};

export default Dashboard;
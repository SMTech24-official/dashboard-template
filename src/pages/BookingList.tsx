/* eslint-disable @typescript-eslint/no-explicit-any */
import BookingListTable from "../components/booking/table/Bookingtable";

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


const BookingList = () => {

    const handleView = (record: any) => {
        console.log('Viewing record:', record);
        // Add your view logic here (e.g., open modal, navigate to detail page)
    };


    return (
        <div>
            <BookingListTable
                data={data}
                onView={handleView}
            />
        </div>
    );
};

export default BookingList;
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface BookingData {
    key: string;
    userName: string;
    phoneNumber: string;
    email: string;
    message: string;
    dateTime: string;
    therapistName: string;
}

interface BookingListTableProps {
    data: BookingData[];
    onView?: (record: BookingData) => void; // Callback for view action
}

const BookingListTable: React.FC<BookingListTableProps> = ({ data, onView }) => {
    const columns: ColumnsType<BookingData> = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            render: (text) => (
                <div className="max-w-xs truncate" title={text}>
                    {text}
                </div>
            ),
        },
        {
            title: 'Date & Time',
            dataIndex: 'dateTime',
            key: 'dateTime',
            sorter: (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
        },
        {
            title: 'Therapist Name',
            dataIndex: 'therapistName',
            key: 'therapistName',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <Button
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={() => onView && onView(record)}
                    className="text-primary hover:text-primary/80"
                >
                    View
                </Button>
            ),
        },
    ];

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Booking List</h2>
                <Link to={"/dashboard/booking-list"} className="bg-primary/80 hover:bg-primary text-white rounded-full px-4 py-2">
                    See All
                </Link>
            </div>

            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 'max-content' }}
                className="custom-table"
            />
        </div>
    );
};

export default BookingListTable;
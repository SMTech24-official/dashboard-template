import { EyeOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';

interface Booking {
    id: string;
    clinicianId: string;
    googleEventId?: string;  // Optional as it might not always be present
    date: string | Date;     // Can be string (from API) or Date (after parsing)
    startTime: string | Date;
    endTime: string | Date;
    userName: string;
    phoneNumber: string;
    userEmail: string;
    message: string;
    timeZone: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    clinician?: {
        id: string;
        name: string;
        email: string;
        image?: string;     // Optional profile image URL
    };
}

interface BookingListTableProps {
    data: Booking[];
    onView?: (record: Booking) => void;
    loading?: boolean;
}

const BookingListTable: React.FC<BookingListTableProps> = ({ data, onView, loading }) => {
    const columns: ColumnsType<Booking> = [
        {
            title: 'User',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (value) => format(new Date(value), 'PP'),
        },
        {
            title: 'Time',
            key: 'time',
            render: (_, record) => (
                <>
                    {format(new Date(record.startTime), 'p')} - {format(new Date(record.endTime), 'p')}
                </>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button icon={<EyeOutlined />} onClick={() => onView?.(record)}>
                    View
                </Button>
            ),
        },
    ];

    return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />;
};

export default BookingListTable
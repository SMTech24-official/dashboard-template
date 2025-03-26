import { EyeOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';

interface Booking {
    id: string;
    clinicianId: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    userName: string;
    phoneNumber: string;
    userEmail: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    clinician?: { // Optional nested clinician data
        name: string;
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
            dataIndex: 'userEmail',
            key: 'userEmail',
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
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date: Date) => format(date, 'MMM dd, yyyy'),
            sorter: (a, b) => a.date.getTime() - b.date.getTime(),
        },
        {
            title: 'Time Slot',
            key: 'timeSlot',
            render: (_, record) => (
                <span>
                    {format(record.startTime, 'hh:mm a')} - {format(record.endTime, 'hh:mm a')}
                </span>
            ),
        },
        {
            title: 'Therapist',
            key: 'therapistName',
            render: (_, record) => record.clinician?.name || 'N/A',
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
                    onClick={() => onView?.(record)}
                    className="text-primary hover:text-primary/80"
                >
                    View
                </Button>
            ),
        },
    ];

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <Table
                columns={columns}
                dataSource={data.map(item => ({ ...item, key: item.id }))}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
                className="custom-table"
                loading={loading}
            />
        </div>
    );
};

export default BookingListTable;
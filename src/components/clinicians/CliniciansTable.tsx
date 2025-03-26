import { DeleteOutlined, EditOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Clinicians } from '../../types/types';

const cliniciansData: Clinicians[] = [
    {
        id: '1',
        userId: 'user1',
        email: 'jane.cooper@example.com',
        name: 'Jane Cooper',
        practice: 'Mindful Therapy',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        qualifications: 'PhD, LPC',
        descriptions: 'Specializes in cognitive behavioral therapy for adults',
        about: '10 years of experience helping clients with anxiety and depression',
        portfolioLink: 'https://portfolio.example.com/jane',
        therapeuticMethods: ['CBT', 'Mindfulness'],
        specialities: ['Anxiety', 'Depression'],
        serviceTypes: ['Individual', 'Couples'],
        agesServed: ['Adults', 'Teens'],
        location: 'New York, NY',
        availabilityDay: 'Monday-Friday',
        availabilityTime: '9am-5pm',
        telehealthOnly: false,
        createdAt: new Date('2020-01-15'),
        updatedAt: new Date('2023-05-20'),
    },
    {
        id: '2',
        userId: 'user1',
        email: 'jane.cooper@example.com',
        name: 'Jane Cooper',
        practice: 'Mindful Therapy',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        qualifications: 'PhD, LPC',
        descriptions: 'Specializes in cognitive behavioral therapy for adults',
        about: '10 years of experience helping clients with anxiety and depression',
        portfolioLink: 'https://portfolio.example.com/jane',
        therapeuticMethods: ['CBT', 'Mindfulness'],
        specialities: ['Anxiety', 'Depression'],
        serviceTypes: ['Individual', 'Couples'],
        agesServed: ['Adults', 'Teens'],
        location: 'New York, NY',
        availabilityDay: 'Monday-Friday',
        availabilityTime: '9am-5pm',
        telehealthOnly: false,
        createdAt: new Date('2020-01-15'),
        updatedAt: new Date('2023-05-20'),
    },
    {
        id: '3',
        userId: 'user1',
        email: 'jane.cooper@example.com',
        name: 'Jane Cooper',
        practice: 'Mindful Therapy',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        qualifications: 'PhD, LPC',
        descriptions: 'Specializes in cognitive behavioral therapy for adults',
        about: '10 years of experience helping clients with anxiety and depression',
        portfolioLink: 'https://portfolio.example.com/jane',
        therapeuticMethods: ['CBT', 'Mindfulness'],
        specialities: ['Anxiety', 'Depression'],
        serviceTypes: ['Individual', 'Couples'],
        agesServed: ['Adults', 'Teens'],
        location: 'New York, NY',
        availabilityDay: 'Monday-Friday',
        availabilityTime: '9am-5pm',
        telehealthOnly: false,
        createdAt: new Date('2020-01-15'),
        updatedAt: new Date('2023-05-20'),
    },

];

const CliniciansTable: React.FC = () => {
    const handleView = (record: Clinicians) => {
        message.info(`Viewing ${record.name}'s profile`);
        // Add your view logic here
    };

    const handleEdit = (record: Clinicians) => {
        message.success(`Editing ${record.name}'s details`);
        // Add your edit logic here
    };

    const handleDelete = (record: Clinicians) => {
        message.success(`${record.name}'s record deleted`);
        // Add your delete logic here
    };

    const columns: ColumnsType<Clinicians> = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
                <Image
                    src={image}
                    width={50}
                    height={50}
                    style={{ borderRadius: '50%' }}
                    alt="Profile"
                    fallback="https://via.placeholder.com/50"
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: Clinicians, b: Clinicians) => a.name.localeCompare(b.name),
        },
        {
            title: 'Practice',
            dataIndex: 'practice',
            key: 'practice',
            render: (practice: string | undefined) => practice || 'N/A',
        },
        {
            title: 'Specialities',
            dataIndex: 'specialities',
            key: 'specialities',
            render: (specialities: string[] | undefined) => (
                <Space size={[0, 4]} wrap>
                    {specialities?.map(spec => (
                        <Tag key={spec} color="blue">{spec}</Tag>
                    )) || 'N/A'}
                </Space>
            ),
        },
        {
            title: 'Qualifications',
            dataIndex: 'qualifications',
            key: 'qualifications',
            render: (qualifications: string | undefined) => qualifications || 'N/A',
        },
        {
            title: 'Portfolio',
            dataIndex: 'portfolioLink',
            key: 'portfolioLink',
            render: (link: string | undefined) => link ? (
                <Button
                    type="link"
                    icon={<LinkOutlined />}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            ) : 'N/A',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right' as const,
            render: (_, record: Clinicians) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record)}
                        title="View Details"
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Are you sure to delete this record?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            danger
                            title="Delete"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className='p-4 bg-white rounded-lg shadow-md'>
            <Table<Clinicians>
                columns={columns}
                dataSource={cliniciansData}
                rowKey="id"
                pagination={{ pageSize: 5, showSizeChanger: true }}
                scroll={{ x: 'max-content' }}
                className="custom-table"
            />
        </div>
    );
};

export default CliniciansTable;
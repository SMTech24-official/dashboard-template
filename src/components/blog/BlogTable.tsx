import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Blog } from '../../types/types';


const BlogTable = ({ blogData }: { blogData: Blog[] }) => {
    const handleView = (record: Blog) => {
        message.info(`Viewing blog: ${record.title}`);
        // Add your view logic here
    };

    const handleEdit = (record: Blog) => {
        message.success(`Editing blog: ${record.title}`);
        // Add your edit logic here
    };

    const handleDelete = (record: Blog) => {
        message.success(`Deleted blog: ${record.title}`);
        // Add your delete logic here
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const columns: ColumnsType<Blog> = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 120,
            render: (image: string) => (
                <Image
                    src={image}
                    width={100}
                    height={60}
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                    alt="Blog cover"
                    fallback="https://via.placeholder.com/100x60"
                    preview={false}
                />
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a: Blog, b: Blog) => a.title.localeCompare(b.title),
            render: (title: string) => <span className="font-medium">{title}</span>,
        },
        {
            title: 'Description',
            dataIndex: 'descriptions',
            key: 'descriptions',
            ellipsis: true,
            width: 300,
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: Date) => (
                <Tag color="blue">{formatDate(date)}</Tag>
            ),
            sorter: (a: Blog, b: Blog) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
        {
            title: 'Updated',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date: Date) => (
                <Tag color={new Date(date).getTime() > Date.now() - 86400000 * 7 ? 'green' : 'orange'}>
                    {formatDate(date)}
                </Tag>
            ),
            sorter: (a: Blog, b: Blog) =>
                new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right' as const,
            width: 150,
            render: (_, record: Blog) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record)}
                        title="View"
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Are you sure to delete this blog?"
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
        <div className="p-4 bg-white rounded-lg shadow-md">
            <Table<Blog>
                columns={columns}
                dataSource={blogData}
                rowKey="id"
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    showTotal: (total) => `Total ${total} blogs`,
                }}
                scroll={{ x: 'max-content' }}
                className="custom-table"
            />
        </div>
    );
};

export default BlogTable;
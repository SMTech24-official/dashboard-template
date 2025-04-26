/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import { useState } from 'react';

const LocationManagement = () => {
    const [locations, setLocations] = useState([
        {
            "id": "9ae0bb74-6134-45df-ac17-6f25942a5fe6",
            "location": "Location 46",
            "createdAt": "2025-03-20T15:57:52.659753",
            "updatedAt": "2025-03-27T15:57:52.659768"
        },
        {
            "id": "d3d802be-5f2f-4517-9623-2bc2a263aa54",
            "location": "Location 78",
            "createdAt": "2025-03-07T15:57:52.659871",
            "updatedAt": "2025-03-27T15:57:52.659886"
        },
        {
            "id": "bff723c5-39ff-45a1-a046-ab1b30c90473",
            "location": "Location 62",
            "createdAt": "2025-03-11T15:57:52.659927",
            "updatedAt": "2025-03-27T15:57:52.659931"
        },
        {
            "id": "88bed626-9faf-4a1d-8a06-cba793eefe42",
            "location": "Location 34",
            "createdAt": "2025-03-08T15:57:52.659961",
            "updatedAt": "2025-03-27T15:57:52.659970"
        },
        {
            "id": "3f331be1-e260-4622-8802-88325044a3a5",
            "location": "Location 74",
            "createdAt": "2025-02-27T15:57:52.660007",
            "updatedAt": "2025-03-27T15:57:52.660019"
        },
        {
            "id": "4600d763-d714-4fb1-bcce-30e8260233b1",
            "location": "Location 64",
            "createdAt": "2025-03-02T15:57:52.660040",
            "updatedAt": "2025-03-27T15:57:52.660043"
        },
        {
            "id": "fcfda9f4-ea79-4729-83c0-76481988e446",
            "location": "Location 77",
            "createdAt": "2025-02-27T15:57:52.660064",
            "updatedAt": "2025-03-27T15:57:52.660068"
        },
        {
            "id": "a8575da9-7145-4d05-8f79-819f172fe9e2",
            "location": "Location 67",
            "createdAt": "2025-03-07T15:57:52.660226",
            "updatedAt": "2025-03-27T15:57:52.660243"
        },
        {
            "id": "fceafafd-bc47-4a87-b9d6-1d6081730c4f",
            "location": "Location 80",
            "createdAt": "2025-02-28T15:57:52.660434",
            "updatedAt": "2025-03-27T15:57:52.660445"
        },
        {
            "id": "b9cfb2b3-7a28-43a0-bcb3-cf5c88493460",
            "location": "Location 12",
            "createdAt": "2025-03-21T15:57:52.660467",
            "updatedAt": "2025-03-27T15:57:52.660473"
        },
        {
            "id": "22c989b7-f0d1-4ebb-9573-3dccdff8b737",
            "location": "Location 32",
            "createdAt": "2025-02-25T15:57:52.660490",
            "updatedAt": "2025-03-27T15:57:52.660495"
        },
        {
            "id": "f1742b0e-9abf-46af-bddc-2c8e49ca2243",
            "location": "Location 93",
            "createdAt": "2025-03-13T15:57:52.660517",
            "updatedAt": "2025-03-27T15:57:52.660522"
        },
        {
            "id": "f3d09f6c-5ac3-4ddc-8d70-31097e3f15b4",
            "location": "Location 92",
            "createdAt": "2025-03-13T15:57:52.660535",
            "updatedAt": "2025-03-27T15:57:52.660541"
        },
        {
            "id": "7412c7ac-1cd5-4af3-83c9-983bc0e65e84",
            "location": "Location 74",
            "createdAt": "2025-02-26T15:57:52.660555",
            "updatedAt": "2025-03-27T15:57:52.660560"
        },
        {
            "id": "a4808c09-ae70-4ca9-9cb5-b15ff91659c0",
            "location": "Location 57",
            "createdAt": "2025-03-15T15:57:52.660575",
            "updatedAt": "2025-03-27T15:57:52.660582"
        },
        {
            "id": "423bca01-9be9-4d02-86f0-b23f425a3f0c",
            "location": "Location 83",
            "createdAt": "2025-03-08T15:57:52.660606",
            "updatedAt": "2025-03-27T15:57:52.660612"
        },
        {
            "id": "15043007-83b4-4dcc-8a03-2caef360fa9f",
            "location": "Location 82",
            "createdAt": "2025-03-04T15:57:52.660639",
            "updatedAt": "2025-03-27T15:57:52.660644"
        },
        {
            "id": "2ce111b6-c66e-479a-a585-080d75da55c6",
            "location": "Location 93",
            "createdAt": "2025-03-19T15:57:52.660660",
            "updatedAt": "2025-03-27T15:57:52.660665"
        },
        {
            "id": "e7834197-5065-42ef-bc2c-0c25a614cc86",
            "location": "Location 24",
            "createdAt": "2025-03-25T15:57:52.660679",
            "updatedAt": "2025-03-27T15:57:52.660684"
        },
        {
            "id": "5e7c88ca-4152-46d0-a6f3-b59a6288f43d",
            "location": "Location 86",
            "createdAt": "2025-03-14T15:57:52.660699",
            "updatedAt": "2025-03-27T15:57:52.660705"
        }
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<any | null>(null);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    const columns = [
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: Date) => new Date(text).toLocaleString(),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: Date) => new Date(text).toLocaleString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                const newLocation = {
                    id: generateId(),
                    location: values.location,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                setLocations([...locations, newLocation]);
                form.resetFields();
                setIsModalVisible(false);
                message.success('Location added successfully');
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleEdit = (record: any) => {
        setCurrentRecord(record);
        editForm.setFieldsValue({
            location: record.location,
        });
        setIsEditModalVisible(true);
    };

    const handleEditOk = () => {
        editForm
            .validateFields()
            .then((values: any) => {
                const updatedLocations = locations.map((item) =>
                    item.id === currentRecord?.id
                        ? {
                            ...item,
                            location: values.location,
                            updatedAt: new Date().toISOString(),
                        }
                        : item
                );
                setLocations(updatedLocations);
                editForm.resetFields();
                setIsEditModalVisible(false);
                message.success('Location updated successfully');
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleEditCancel = () => {
        editForm.resetFields();
        setIsEditModalVisible(false);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this location?',
            content: 'This action cannot be undone',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setLocations(locations.filter((item) => item.id !== id));
                message.success('Location deleted successfully');
            },
        });
    };

    const generateId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <h2></h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Add Location
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={locations}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />

            {/* Add Location Modal */}
            <Modal
                title="Add New Location"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="location"
                        label="Location Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the location name!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter location name" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit Location Modal */}
            <Modal
                title="Edit Location"
                visible={isEditModalVisible}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
            >
                <Form form={editForm} layout="vertical">
                    <Form.Item
                        name="location"
                        label="Location Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the location name!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter location name" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default LocationManagement;
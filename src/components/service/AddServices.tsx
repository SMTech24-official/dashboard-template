/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
    BoldOutlined,
    CodeOutlined,
    ItalicOutlined,
    LinkOutlined,
    OrderedListOutlined,
    SaveOutlined,
    StrikethroughOutlined,
    UnderlineOutlined,
    UnorderedListOutlined,
    UploadOutlined
} from '@ant-design/icons';
import {
    Button,
    Card,
    Divider,
    Flex,
    Form,
    Input,
    message,
    Select,
    Space,
    Upload
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const fontOptions = ['Poppins', 'Arial', 'Times New Roman', 'Courier New'];
const sizeOptions = ['Normal', 'Small', 'Large', 'H1', 'H2', 'H3'];

const AddService = () => {
    const [form] = Form.useForm();

    const handleSave = () => {
        message.success('Content saved successfully!');
    };

    const beforeUpload = (file: any) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        }
        return isImage;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <Card className="max-w-4xl mx-auto" bodyStyle={{ padding: 24 }}>
                <Form form={form} layout="vertical">
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Form.Item label="Title" name="title">
                            <Input required placeholder="Enter title" />
                        </Form.Item>

                        <Form.Item label="Subtitle" name="subtitle">
                            <Input placeholder="Enter subtitle" />
                        </Form.Item>

                        <Flex gap={24}>
                            <Form.Item label="Description" name="description" style={{ flex: 1 }}>
                                <TextArea
                                    placeholder="Enter description"
                                    autoSize={{ minRows: 4, maxRows: 6 }}
                                />
                            </Form.Item>

                            <Space direction="vertical" size="middle">
                                <Form.Item label="Icon">
                                    <Upload
                                        name="icon"
                                        listType="picture-card"
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}
                                    >
                                        <div>
                                            <UploadOutlined />
                                            <div style={{ marginTop: 8 }}>Upload Icon</div>
                                        </div>
                                    </Upload>
                                </Form.Item>

                                <Form.Item label="Image">
                                    <Upload
                                        name="image"
                                        listType="picture-card"
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}
                                    >
                                        <div>
                                            <UploadOutlined />
                                            <div style={{ marginTop: 8 }}>Upload Image</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            </Space>
                        </Flex>

                        <Form.Item label="Detailed description">
                            <Card
                                bordered={false}
                                bodyStyle={{ padding: 0 }}
                                className="editor-container"
                            >
                                <div className="editor-toolbar">
                                    <Space size={0}>
                                        <Select defaultValue="Poppins" style={{ width: 120 }}>
                                            {fontOptions.map(font => (
                                                <Option key={font} value={font}>{font}</Option>
                                            ))}
                                        </Select>

                                        <Select defaultValue="Normal" style={{ width: 90 }}>
                                            {sizeOptions.map(size => (
                                                <Option key={size} value={size}>{size}</Option>
                                            ))}
                                        </Select>

                                        <Divider type="vertical" />

                                        <Button icon={<BoldOutlined />} type="text" />
                                        <Button icon={<ItalicOutlined />} type="text" />
                                        <Button icon={<UnderlineOutlined />} type="text" />
                                        <Button icon={<StrikethroughOutlined />} type="text" />
                                        <Button icon={<LinkOutlined />} type="text" />
                                        <Button icon={<UnorderedListOutlined />} type="text" />
                                        <Button icon={<OrderedListOutlined />} type="text" />
                                        <Button icon={<AlignLeftOutlined />} type="text" />
                                        <Button icon={<AlignCenterOutlined />} type="text" />
                                        <Button icon={<AlignRightOutlined />} type="text" />
                                        <Button icon={<CodeOutlined />} type="text" />
                                    </Space>
                                </div>

                                <Form.Item name="content" noStyle>
                                    <TextArea
                                        placeholder="Compose your content here..."
                                        autoSize={{ minRows: 10 }}
                                        bordered={false}
                                        style={{ padding: 16 }}
                                    />
                                </Form.Item>
                            </Card>
                        </Form.Item>

                        <Form.Item>
                            <Flex justify="flex-end">
                                <Button
                                    type="primary"
                                    icon={<SaveOutlined />}
                                    onClick={handleSave}
                                    size="large"
                                >
                                    Save
                                </Button>
                            </Flex>
                        </Form.Item>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default AddService;
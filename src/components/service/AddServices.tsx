/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Card,
    Flex,
    Form,
    Input,
    message,
    Space,
    UploadFile
} from 'antd';
import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from 'react';
import { LuSave } from 'react-icons/lu';
import UploadImages from '../uploadImages/UploadImages';
import { useCreateServiceMutation } from '../../Redux/apis/service.ts/serviceApi';

const { TextArea } = Input;

const AddService = () => {
    const [form] = Form.useForm();
    const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);
    const [iconFileList, setIconFileList] = useState<UploadFile[]>([]);
    const [createService, { isLoading }] = useCreateServiceMutation();
    const editor = useRef<any>(null);
    const [content, setContent] = useState('');

    const config = useMemo(
        () => ({
            readonly: false,
            dropdownFullScreen: true,
            height: "300px",
        }),
        []
    );



    const handleSave = async () => {
        try {
            const formData = await form.validateFields();

            // Create FormData object for file upload
            const payload = new FormData();

            // Append text fields
            payload.append('title', formData.title);
            if (formData.subtitle) payload.append('subtitle', formData.subtitle);
            payload.append('descriptions', formData.description);
            payload.append('detailedDescription', content);

            // Append files if they exist
            if (thumbnailFileList.length > 0 && thumbnailFileList[0].originFileObj) {
                payload.append('image', thumbnailFileList[0].originFileObj as File);
            }

            if (iconFileList.length > 0 && iconFileList[0].originFileObj) {
                payload.append('icon', iconFileList[0].originFileObj as File);
            }

            console.log("Form Submission Data:", Object.fromEntries(payload.entries()));

            // Call the mutation
            const response = await createService(payload);

            if ('data' in response) {
                message.success('Service created successfully!');
                form.resetFields();
                setThumbnailFileList([]);
                setIconFileList([]);
                setContent('');
            } else if ('error' in response) {
                throw response.error;
            }
        } catch (error) {
            console.error('Error creating service:', error);
            message.error('Failed to create service. Please try again.');
        }
    };



    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <Card className="max-w-4xl mx-auto" bodyStyle={{ padding: 24 }}>
                <Form form={form} layout="vertical">
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Title is required' }]}
                        >
                            <Input placeholder="Enter title" />
                        </Form.Item>

                        <Form.Item label="Subtitle" name="subtitle">
                            <Input placeholder="Enter subtitle" />
                        </Form.Item>

                        <Flex gap={24}>
                            <Form.Item
                                label="Description"
                                name="description"
                                style={{ flex: 1 }}
                                rules={[{ required: true, message: 'Description is required' }]}
                            >
                                <TextArea
                                    placeholder="Enter description"
                                    autoSize={{ minRows: 10, maxRows: 6 }}
                                />
                            </Form.Item>

                            <Space direction="vertical" size="middle">
                                <UploadImages
                                    multiple={false}
                                    limit={1}
                                    fileList={thumbnailFileList}
                                    setFileList={setThumbnailFileList}
                                    title="Upload Thumbnail Image *"

                                />

                                <UploadImages
                                    multiple={false}
                                    limit={1}
                                    fileList={iconFileList}
                                    setFileList={setIconFileList}
                                    title="Upload Icon *"
                                />
                            </Space>
                        </Flex>

                        <Form.Item label="Detailed description">
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                onBlur={(newContent: string) => setContent(newContent)}
                                onChange={(newContent: string) => setContent(newContent)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Flex justify="flex-end">
                                <Button
                                    type="primary"
                                    icon={<LuSave />}
                                    onClick={handleSave}
                                    size="large"
                                    className='bg-primary'
                                    loading={isLoading}
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
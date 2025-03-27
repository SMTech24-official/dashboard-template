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

/* eslint-disable @typescript-eslint/no-explicit-any */
import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from 'react';
import { LuSave } from 'react-icons/lu';
import UploadImages from '../uploadImages/UploadImages';

const { TextArea } = Input;

const AddService = () => {
    const [form] = Form.useForm();
    const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);
    const [iconFileList, setIconFileList] = useState<UploadFile[]>([]);

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
            const formData = await form.validateFields(); // Validate form fields

            const payload = {
                ...formData,
                detailedDescription: content,
                thumbnail: thumbnailFileList.length ? thumbnailFileList[0] : null,
                icon: iconFileList.length ? iconFileList[0] : null,
            };

            console.log("Form Submission Data:", payload);
            message.success('Content saved successfully!');
        } catch (error) {
            console.log(error);
            message.error('Please fill out all required fields and try again.');
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
                                onBlur={(newContent: any) => setContent(newContent)}
                                onChange={(newContent: any) => setContent(newContent)}
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

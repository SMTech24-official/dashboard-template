/* eslint-disable @typescript-eslint/no-explicit-any */
// EditService.tsx
import {
    Button,
    Card,
    Flex,
    Form,
    Input,
    Space,
    UploadFile
} from 'antd';
import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from 'react';
import { LuSave } from 'react-icons/lu';
import UploadImages from '../uploadImages/UploadImages';

const { TextArea } = Input;

interface EditServiceProps {
    service: any;
    onSave: (values: any) => Promise<void>;
    loading: boolean;
    onCancel: () => void;
}

const EditService = ({ service, onSave, loading, onCancel }: EditServiceProps) => {
    const [form] = Form.useForm();
    const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);
    const [iconFileList, setIconFileList] = useState<UploadFile[]>([]);

    const editor = useRef<any>(null);
    const config = useMemo(
        () => ({
            readonly: false,
            dropdownFullScreen: true,
            height: "300px",
        }),
        []
    );

    // Initialize form with service data
    useEffect(() => {
        form.setFieldsValue({
            title: service.title,
            subtitle: service.subtitle,
            descriptions: service.descriptions,
            detailedDescription: service.detailedDescription,
        });
        if (service.icon) {
            setIconFileList([{ uid: '-1', name: 'icon', status: 'done', url: service.icon }]);
        }
        if (service.thumbnail) {
            setThumbnailFileList([{ uid: '-1', name: 'thumbnail', status: 'done', url: service.thumbnail }]);
        }
    }, [service, form]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const iconUrl = iconFileList[0]?.url || iconFileList[0]?.response?.url;
            const thumbnailUrl = thumbnailFileList[0]?.url || thumbnailFileList[0]?.response?.url;
            
            await onSave({
                ...values,
                icon: iconUrl,
                thumbnail: thumbnailUrl
            });
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
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

                    <Form.Item
                        label="Short Description"
                        name="descriptions"
                        rules={[{ required: true, message: 'Description is required' }]}
                    >
                        <TextArea
                            placeholder="Enter short description"
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>

                    <Flex gap={24}>
                        <Form.Item 
                            label="Detailed description" 
                            name="detailedDescription"
                            style={{ flex: 1 }}
                        >
                            <JoditEditor
                                ref={editor}
                                value={form.getFieldValue('detailedDescription')}
                                config={config}
                                onBlur={(newContent) => form.setFieldValue('detailedDescription', newContent)}
                            />
                        </Form.Item>

                        <Space direction="vertical" size="middle">
                            <UploadImages
                                multiple={false}
                                limit={1}
                                fileList={thumbnailFileList}
                                setFileList={setThumbnailFileList}
                                title="Upload Thumbnail Image"
                            />

                            <UploadImages
                                multiple={false}
                                limit={1}
                                fileList={iconFileList}
                                setFileList={setIconFileList}
                                title="Upload Icon"
                            />
                        </Space>
                    </Flex>

                    <Form.Item>
                        <Flex justify="flex-end" gap={16}>
                            <Button onClick={onCancel} size="large">
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                icon={<LuSave />}
                                onClick={handleSave}
                                size="large"
                                loading={loading}
                                className='bg-primary'
                            >
                                Save Changes
                            </Button>
                        </Flex>
                    </Form.Item>
                </Space>
            </Form>
        </Card>
    );
};

export default EditService;
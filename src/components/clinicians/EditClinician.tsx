/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Form, FormInstance, Image, Input, message, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { Clinicians } from '../../types/types';

const { Option } = Select;




const EditClinician = ({ editingClinician, form }: { editingClinician: Clinicians | null, form: FormInstance<any> }) => {

    // Fixed upload props
    const uploadProps = {
        beforeUpload: (file: File) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('You can only upload image files!');
            }
            return isImage || Upload.LIST_IGNORE;
        },
        onChange: (info: any) => {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                // Handle the uploaded file here
                form.setFieldsValue({
                    image: URL.createObjectURL(info.file.originFileObj)
                });
            }
        },
        showUploadList: false,
    };

    return (
        <div>
            <Divider className="my-4" />

            <Form form={form} layout="vertical">
                <div className="flex gap-6 mb-6">
                    <div className="w-1/4">
                        <Form.Item name="image" label="Profile Image">
                            <div className="flex flex-col items-center">
                                <Image
                                    src={form.getFieldValue('image')}
                                    width={150}
                                    height={150}
                                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                                    alt="Profile"
                                    fallback="https://via.placeholder.com/150"
                                    className="mb-4"
                                />
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>Change Photo</Button>
                                </Upload>
                            </div>
                        </Form.Item>
                    </div>

                    <div className="w-3/4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                name="name"
                                label="Full Name"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, type: 'email' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="practice"
                                label="Practice"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="qualifications"
                                label="Qualifications"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="location"
                                label="Location"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="portfolioLink"
                                label="Portfolio Link"
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                {/* Rest of the form sections... */}
                {/* Professional Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Form.Item name="therapeuticMethods" label="Therapeutic Methods">
                        <Select mode="multiple">
                            {['CBT', 'Mindfulness', 'DBT', 'Psychodynamic', 'ACT', 'EMDR'].map(method => (
                                <Option key={method} value={method}>{method}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="specialities" label="Specialities">
                        <Select mode="multiple">
                            {['Anxiety', 'Depression', 'Trauma', 'Relationships', 'PTSD', 'OCD'].map(spec => (
                                <Option key={spec} value={spec}>{spec}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="serviceTypes" label="Service Types">
                        <Select mode="multiple">
                            {['Individual', 'Couples', 'Family', 'Group', 'Workshops'].map(type => (
                                <Option key={type} value={type}>{type}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <Divider orientation="left" className="!text-base !font-medium !mt-8">
                    Professional Summary
                </Divider>
                <Form.Item
                    name="descriptions"
                    rules={[{ required: true, message: 'Please enter a professional summary' }]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Enter clinician's professional summary (minimum 100 characters)"
                        showCount
                        minLength={100}
                        maxLength={500}
                        style={{ resize: 'vertical' }}
                        className="!min-h-[120px]"
                    />
                </Form.Item>

                {/* Enhanced About Section */}
                <Divider orientation="left" className="!text-base !font-medium !mt-8">
                    Detailed Background
                </Divider>
                <Form.Item
                    name="about"
                    rules={[{ required: true, message: 'Please enter detailed background information' }]}
                >
                    <TextArea
                        rows={6}
                        placeholder="Provide detailed information about the clinician's background, experience, and approach (minimum 200 characters)"
                        showCount
                        minLength={200}
                        maxLength={1500}
                        style={{ resize: 'vertical' }}
                        className="!min-h-[180px]"
                    />
                </Form.Item>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item label="Created At">
                        <DatePicker
                            value={dayjs(editingClinician?.createdAt)}
                            disabled
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item label="Last Updated">
                        <DatePicker
                            value={dayjs(editingClinician?.updatedAt)}
                            disabled
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default EditClinician;
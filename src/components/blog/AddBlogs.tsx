/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Form, Input, message, Space, UploadFile } from "antd";
import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";
import { Blog } from "../../types/types";
import UploadImages from "../uploadImages/UploadImages";
import { useCreateBlogMutation } from "../../Redux/apis/blog/blogApi";
import { toast } from "sonner";

const AddBlogs = () => {
  const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editor = useRef<any>(null);
  const [form] = Form.useForm();

  //   api call
  const [createBlog] = useCreateBlogMutation();

  const config = useMemo(
    () => ({
      readonly: false,
      dropdownFullScreen: true,
      height: "300px",
    }),
    []
  );

  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields();

      console.log(formData, content, thumbnailFileList[0]?.originFileObj);
      //   return;
      setIsSubmitting(true);

      const payload = new FormData();

      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof Blog];
        if (value !== undefined && value !== null) {
          payload.append(key, value.toString()); // Convert values to strings
        }
      });
      payload.append("descriptions", content);

      if (thumbnailFileList[0]?.originFileObj) {
        payload.append("image", thumbnailFileList[0]?.originFileObj);
      } else {
        message.error("Thumbnail image is required!");
        setIsSubmitting(false);
        return; // Early exit if thumbnail is missing
      }

      // Perform form submission logic here
      toast.promise(createBlog(payload).unwrap(), {
        loading: "Blog creating...",
        success: (data) => {
          form.resetFields();
          return data?.message;
        },
        error: (error) => {
          return error?.message || error?.data?.message;
        },
      });
    } catch (error) {
      console.error(error);
      message.error("Please fill out all required fields and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-4xl mx-auto" bodyStyle={{ padding: 24 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <UploadImages
            multiple={false}
            limit={1}
            fileList={thumbnailFileList}
            setFileList={setThumbnailFileList}
            title="Upload Thumbnail Image *"
          />

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Enter blog title" />
            </Form.Item>

            <Form.Item label="Detailed Description">
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onBlur={(newContent: any) => setContent(newContent)}
                onChange={(newContent: any) => setContent(newContent)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                className="w-full mt-4"
              >
                {isSubmitting ? "Submitting..." : "Add New Blog"}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default AddBlogs;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Image,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
  Modal,
  Form,
  Input,
  UploadFile,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Blog } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import UploadImages from "../uploadImages/UploadImages";
import { useUpdateBlogMutation } from "../../Redux/apis/blog/blogApi";
import { toast } from "sonner";
// import TextArea from "antd/es/input/TextArea";

const BlogTable = ({
  blogData,
  isLoading,
}: {
  blogData: Blog[];
  isLoading: boolean;
}) => {
  const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const editor = useRef<any>(null);

  //   api call
  const [updateBlog] = useUpdateBlogMutation();

  const config = useMemo(
    () => ({
      readonly: false,
      dropdownFullScreen: true,
      height: "300px",
    }),
    []
  );

  const handleView = (record: Blog) => {
    console.log(record);
    navigate(`/dashboard/blog/${record?.id}`);
    message.info(`Viewing blog: ${record.title}`);
  };

  const handleEdit = (record: Blog) => {
    setEditingBlog(record);
    setContent(record?.descriptions);
    form.setFieldsValue({
      title: record.title,
      descriptions: record.descriptions,
      image: record.image,
      // Add other fields as needed
    });
    setIsModalOpen(true);
  };

  const handleDelete = (record: Blog) => {
    message.success(`Deleted blog: ${record.title}`);
    // Add your delete logic here
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Here you would typically call an API to update the blog
        console.log(
          "Updated values:",
          values,
          content,
          thumbnailFileList[0].originFileObj
        );
        // form data
        const payload = new FormData();

        Object.keys(values).forEach((key) => {
          const value = values[key as keyof Blog];
          if (value !== undefined && value !== null) {
            payload.append(key, value.toString()); // Convert values to strings
          }
        });
        payload.append("descriptions", content);

        if (thumbnailFileList[0]?.originFileObj) {
          payload.append("image", thumbnailFileList[0]?.originFileObj);
        } else {
          message.error("Thumbnail image is required!");
          // setIsSubmitting(false);
          return; // Early exit if thumbnail is missing
        }

        toast.promise(
          updateBlog({ id: editingBlog?.id, body: payload }).unwrap,
          {
            loading: "Updating...",
            success: (data) => {
              return data?.message;
            },
            error: (error) => {
              return error?.message || error?.data?.message;
            },
          }
        );
        setIsModalOpen(false);
        form.resetFields();
      })

      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns: ColumnsType<Blog> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 120,
      render: (image: string) => (
        <Image
          src={image}
          width={100}
          height={60}
          style={{ objectFit: "cover", borderRadius: 4 }}
          alt="Blog cover"
          fallback="https://via.placeholder.com/100x60"
          preview={true}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Blog, b: Blog) => a.title.localeCompare(b.title),
      render: (title: string) => <span className="font-medium">{title}</span>,
    },
    {
      title: "Description",
      dataIndex: "descriptions",
      key: "descriptions",
      ellipsis: true,
      width: 300,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: Date) => <Tag color="blue">{formatDate(date)}</Tag>,
      sorter: (a: Blog, b: Blog) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: Date) => (
        <Tag
          color={
            new Date(date).getTime() > Date.now() - 86400000 * 7
              ? "green"
              : "orange"
          }
        >
          {formatDate(date)}
        </Tag>
      ),
      sorter: (a: Blog, b: Blog) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right" as const,
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
        loading={isLoading}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} blogs`,
        }}
        scroll={{ x: "max-content" }}
        className="custom-table"
      />

      <Modal
        title={`Edit Blog: ${editingBlog?.title}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Save Changes
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" initialValues={editingBlog || {}}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input the blog title!" },
            ]}
          >
            <Input />
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

          <UploadImages
            multiple={false}
            limit={1}
            fileList={thumbnailFileList}
            setFileList={setThumbnailFileList}
            title="Upload Thumbnail Image *"
          />

          {/* Add more fields as needed for your blog */}
        </Form>

        {editingBlog?.image && (
          <div className="mt-4">
            <p>Current Image:</p>
            <Image
              src={editingBlog.image}
              width={200}
              style={{ objectFit: "cover", borderRadius: 4 }}
              alt="Current blog cover"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogTable;

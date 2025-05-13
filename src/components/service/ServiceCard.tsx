import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, message, Modal, Form, Button } from "antd";
import React, { useState } from "react";
import { Service } from "../../types/types";
import EditService from "./EditService";

interface ServiceCardProps {
  service: Service;
  onEdit: (id: string, values: Partial<Service>) => Promise<void>;
  onDelete: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onEdit,
  onDelete,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  // console.log(service, "service");

  const handleEditClick = () => {
    form.setFieldsValue({
      title: service.title,
      subtitle: service.subtitle,
      descriptions: service.descriptions,
      detailedDescription: service.detailedDescription,
      icon: service.icon,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    onDelete(service.id);
  };

  const handleSave = async (values: any) => {
    // console.log(values);
    // return;
    try {
      //   const values = await form.validateFields();
      //   console.log(values);
      setPendingValues(values);
      setIsEditModalOpen(false);
      setIsConfirmModalOpen(true);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleConfirmSave = async () => {
    try {
      console.log(pendingValues);
      // return;
      setLoading(true);
      if (pendingValues) {
        await onEdit(service.id, pendingValues);
        message.success("Service updated successfully");
      }
      setIsConfirmModalOpen(false);
      setPendingValues(null);
    } catch (error) {
      console.error("Error updating service:", error);
      message.error("Failed to update service");
      // Reopen the edit modal if there's an error
      setIsEditModalOpen(true);
      // setIsConfirmModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    form.resetFields();
  };

  const handleCancelConfirm = () => {
    setIsConfirmModalOpen(false);
    // Reopen the edit modal if user cancels confirmation
    setIsEditModalOpen(true);
  };

  return (
    <>
      <Card
        className="w-full max-w-md mb-4 shadow-md hover:shadow-lg transition-shadow duration-300"
        actions={[
          <EditOutlined
            key="edit"
            onClick={handleEditClick}
            className="text-blue-500 hover:text-blue-700"
          />,
          <DeleteOutlined
            key="delete"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          />,
        ]}
      >
        <div className="flex flex-col">
          <div className="flex items-start mb-4">
            {service.icon && (
              // <div className="text-4xl mr-4 flex-shrink-0">{service.icon}</div>
              <img
                src={service?.image as string}
                alt="service icon"
                className="text-4xl mr-4 flex-shrink-0 w-20 h-20 rounded-full"
              />
            )}
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">
                {service?.title}
              </h3>
              <p className="text-sm text-gray-600">{service?.subtitle}</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm">{service?.descriptions}</p>
        </div>
      </Card>

      {/* Edit Service Modal */}
      <Modal
        title={`Edit Service: ${service.title}`}
        open={isEditModalOpen}
        onOk={handleSave}
        onCancel={handleCancelEdit}
        width={700}
        footer={[
          <Button key="back" onClick={handleCancelEdit}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            Save Changes
          </Button>,
        ]}
      >
        <EditService
          service={service}
          onSave={handleSave}
          loading={loading}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Changes"
        open={isConfirmModalOpen}
        onOk={handleConfirmSave}
        onCancel={handleCancelConfirm}
        confirmLoading={loading}
        okText="Confirm"
        cancelText="Back to Editing"
      >
        <div className="mb-4">
          <p>Are you sure you want to update this service?</p>
          {pendingValues && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h4 className="font-medium mb-2">Changes:</h4>
              <ul className="list-disc pl-5">
                {pendingValues.title &&
                  pendingValues.title !== service.title && (
                    <li>
                      <span className="font-medium">Title:</span>{" "}
                      {pendingValues.title}
                    </li>
                  )}
                {pendingValues.subtitle &&
                  pendingValues.subtitle !== service.subtitle && (
                    <li>
                      <span className="font-medium">Subtitle:</span>{" "}
                      {pendingValues.subtitle}
                    </li>
                  )}
                {pendingValues.descriptions &&
                  pendingValues.descriptions !== service.descriptions && (
                    <li>
                      <span className="font-medium">Description:</span>{" "}
                      {pendingValues.descriptions.substring(0, 50)}...
                    </li>
                  )}
                {pendingValues.icon && pendingValues.icon !== service.icon && (
                  <li>
                    <span className="font-medium">Icon:</span>{" "}
                    {!(pendingValues?.icon instanceof File) &&
                      pendingValues?.icon}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ServiceCard;

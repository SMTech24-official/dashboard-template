/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Empty, Spin, Typography } from "antd";
import React, { useState } from "react";
import ServiceCard from "../components/service/ServiceCard";
import { Service } from "../types/types";
import {
  useDeleteServiceMutation,
  useGetAllServiceQuery,
  useUpdateServiceMutation,
} from "../Redux/apis/service.ts/serviceApi";
import { toast } from "sonner";

const { Title } = Typography;

const ServicesList: React.FC = () => {
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(
    null
  );
  const { data, isLoading, isError } = useGetAllServiceQuery("");
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const onEdit = async (id: string, values: any) => {
    // console.log(id, values);
    // return;

    const payload = new FormData();

    // Append text fields
    payload.append("title", values?.title);

    payload.append("subtitle", values?.subtitle);
    payload.append("descriptions", values?.descriptions);
    // payload.append("detailedDescription", values?.detailedDescription);

    // Append files if they exist
    if (values?.thumbnail) {
      payload.append("image", values?.thumbnail as File);
    }

    if (values?.icon) {
      payload.append("icon", values.icon as File);
    }
    try {
      const res = await updateService({ id, body: payload });
      if ("data" in res) {
        toast.success(res.data.message || "Service updated successfully");
      } else if ("error" in res) {
        throw res.error;
      }
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update service");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteService(id);
      if ("data" in res) {
        toast.success("Service deleted successfully");
        setDeletingServiceId(null);
      } else if ("error" in res) {
        throw res.error;
      }
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to delete service");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <Empty
          description={
            <span className="text-red-500">
              Failed to load services. Please try again later.
            </span>
          }
        />
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Empty
          description={
            <Title level={4} className="text-gray-500">
              No services available
            </Title>
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <Title level={2} className="mb-6">
        Services
      </Title>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((service: Service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={onEdit}
            onDelete={() => setDeletingServiceId(service.id)}
          />
        ))}
      </div>

      <Modal
        title="Confirm Delete"
        open={!!deletingServiceId}
        onOk={() => deletingServiceId && handleDelete(deletingServiceId)}
        onCancel={() => setDeletingServiceId(null)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete this service? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
};

export default ServicesList;

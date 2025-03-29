/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Modal, } from 'antd';
import React, { useState } from 'react';
import ServiceCard from '../components/service/ServiceCard';
import { Service } from '../types/types';
import { useDeleteServiceMutation, useGetAllServiceQuery, useUpdateServiceMutation } from '../Redux/apis/service.ts/serviceApi';
import { toast } from 'sonner';


const ServicesList: React.FC = () => {
    // const [services, setServices] = useState<Service[]>(fakeTherapistServices);
    const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);

    const { data, isLoading } = useGetAllServiceQuery('')
    const [updateService] = useUpdateServiceMutation()
    const [deleteService] = useDeleteServiceMutation()
    console.log(data?.data, 'data');

    const onEdit = async (id: string, values: Partial<Service>) => {
        console.log(values, 'values');
        try {
            const res = await updateService({ id, body: values })
            console.log(res)
            toast.message(res.data.message || 'Service updated successfully');
            await new Promise((resolve) => setTimeout(resolve, 1000)); 
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = async (id: string) => {
        console.log('Service ID to delete:', id);
        try {
            const res = await deleteService(id)
            console.log(res)
            toast.success('Service deleted successfully');
        } catch (error: any) {
            toast.error(error.data.message || 'Failed to delete service');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data.map((service: Service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onEdit={onEdit}
                        onDelete={() => setDeletingServiceId(service.id)}
                    />
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Confirm Delete"
                visible={!!deletingServiceId}
                onOk={() => {
                    if (deletingServiceId) {
                        handleDelete(deletingServiceId);
                    }
                }}
                onCancel={() => setDeletingServiceId(null)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this service? This action cannot be undone.</p>
            </Modal>
        </div>
    );
};

export default ServicesList;
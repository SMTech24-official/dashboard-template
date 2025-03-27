import { Modal, message } from 'antd';
import React, { useState } from 'react';
import ServiceCard from '../components/service/ServiceCard';
import { Service } from '../types/types';

const fakeTherapistServices: Service[] = [
    {
        id: '1',
        title: 'Individual Therapy',
        subtitle: 'One-on-one counseling sessions',
        descriptions: 'Personalized therapy to help you navigate anxiety, depression, and personal challenges.',
        icon: '🧠',
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15'),
    },
    {
        id: '2',
        title: 'Couples Therapy',
        subtitle: 'Improving relationships and communication',
        descriptions: 'Strengthen your bond through guided communication and conflict resolution strategies.',
        icon: '❤️',
        createdAt: new Date('2023-02-20'),
        updatedAt: new Date('2023-03-10'),
    },
    {
        id: '3',
        title: 'Group Therapy',
        subtitle: 'Support in a group setting',
        descriptions: 'Participate in group therapy sessions to share experiences and gain mutual support.',
        icon: '👥',
        createdAt: new Date('2023-03-05'),
        updatedAt: new Date('2023-04-12'),
    },
    {
        id: '4',
        title: 'Child and Adolescent Therapy',
        subtitle: 'Therapy for children and teens',
        descriptions: 'Helping young individuals manage emotional and behavioral challenges in a safe environment.',
        icon: '🧸',
        createdAt: new Date('2023-04-18'),
        updatedAt: new Date('2023-05-22'),
    },
];


const ServicesList: React.FC = () => {
    const [services, setServices] = useState<Service[]>(fakeTherapistServices);
    const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);

    const onEdit = async (id: string, values: Partial<Service>) => {
        console.log('Service ID to edit:', id);
        console.log('Updated values:', values);

        // Simulating an update process
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake delay for demo

        console.log('Service updated successfully!');
    };

    const handleDelete = (id: string) => {
        setServices(services.filter(service => service.id !== id));
        message.success('Service deleted successfully');
        setDeletingServiceId(null);
    };


    return (
        <div className="container ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
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
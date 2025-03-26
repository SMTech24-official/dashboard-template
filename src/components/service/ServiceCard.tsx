// ServiceCard.tsx
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import React from 'react';
import { Service } from '../../types/types';

interface ServiceCardProps {
    service: Service;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit(service.id);
    };

    const handleDelete = () => {
        onDelete(service.id);
        message.success('Service deleted successfully');
    };

    return (
        <Card
            className="w-full max-w-md mb-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            actions={[
                <EditOutlined key="edit" onClick={handleEdit} className="text-blue-500" />,
                <DeleteOutlined onClick={() => handleDelete()} key="delete" className="text-red-500" />
            ]}
        >
            <div className="flex flex-col">
                <div className="flex items-start mb-4">
                    {service.icon && (
                        <div className="text-4xl mr-4 flex-shrink-0">{service.icon}</div>
                    )}
                    <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                        <p className="text-sm text-gray-600">{service.subtitle}</p>
                    </div>
                </div>
                <p className="text-gray-700 text-sm">{service.descriptions}</p>
            </div>
        </Card>
    );
};

export default ServiceCard;
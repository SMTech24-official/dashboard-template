import {
    CalendarOutlined
} from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';

interface MetricCardsProps {
    bookingCount: string | number;
}

const ClinMetricCards: React.FC<MetricCardsProps> = ({
    bookingCount,
}) => {
    const metrics = [
        { title: 'Total Booking', value: bookingCount, icon: <CalendarOutlined />, color: 'bg-blue-100' },

    ];

    return (
        <div className="flex flex-wrap gap-6">
            {metrics.map((metric, index) => (
                <Card key={index} className="flex-1 min-w-[200px] shadow-md">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">{metric.title}</p>
                            <p className="text-5xl font-semibold mt-2">{metric.value}</p>
                        </div>
                        <div className={`${metric.color} p-3 rounded-full`}>
                            <div className="text-xl" style={{ fontSize: '40px' }}>
                                {React.cloneElement(metric.icon, { style: { fontSize: '40px' } })}
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ClinMetricCards;
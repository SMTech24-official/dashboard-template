import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    LinkOutlined,
    MailOutlined
} from '@ant-design/icons';
import { Avatar, Card, Divider, Tag } from 'antd';


type TherapistData = {
    email: string;
    name: string;
    practice: string;
    image: string;
    qualifications: string[];
    descriptions: string;
    about: string;
    portfolioLink: string;
    therapeuticMethods: string[];
    specialities: string[];
    serviceTypes: string[];
    agesServed: string[];
    location: string;
    availabilityDay: string;
    availabilityTime: string;
    telehealthOnly: boolean;
    isCalendarConnected: boolean;
};

type Props = {
    data: TherapistData;
};

const TherapistProfile = ({ data }: Props) => {
    const {
        email,
        name,
        practice,
        image,
        qualifications,
        descriptions,
        about,
        portfolioLink,
        therapeuticMethods,
        specialities,
        serviceTypes,
        agesServed,
        location,
        availabilityDay,
        availabilityTime,
        telehealthOnly,
        isCalendarConnected
    } = data;

    const renderTags = (items: string[], color: string = 'blue') => {
        return items.map((item, index) => (
            <Tag color={color} key={index} className="m-1">
                {item}
            </Tag>
        ));
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card className="shadow-lg">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column - Profile Image and Basic Info */}
                    <div className="flex flex-col items-center md:w-1/3">
                        <Avatar
                            src={image}
                            size={150}
                            className="mb-4 border-2 border-blue-200"
                        />
                        <h1 className="text-2xl font-bold text-center">{name}</h1>
                        <p className="text-lg text-gray-600 text-center">{practice}</p>

                        {isCalendarConnected && (
                            <div className="mt-2 flex items-center text-green-500">
                                <CheckCircleOutlined className="mr-1" />
                                <span>Calendar Connected</span>
                            </div>
                        )}

                        <Divider className="my-4" />

                        <div className="w-full space-y-3">
                            <div className="flex items-start">
                                <MailOutlined className="mt-1 mr-2 text-blue-500" />
                                <span>{email}</span>
                            </div>

                            <div className="flex items-start">
                                <EnvironmentOutlined className="mt-1 mr-2 text-blue-500" />
                                <span>{location}</span>
                            </div>

                            <div className="flex items-start">
                                <ClockCircleOutlined className="mt-1 mr-2 text-blue-500" />
                                <div>
                                    <p className="m-0">{availabilityDay}</p>
                                    <p className="m-0">{availabilityTime}</p>
                                    {telehealthOnly && <Tag color="purple" className="mt-1">Telehealth Only</Tag>}
                                </div>
                            </div>

                            {portfolioLink && (
                                <div className="flex items-start">
                                    <LinkOutlined className="mt-1 mr-2 text-blue-500" />
                                    <a href={portfolioLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        View Portfolio
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Detailed Information */}
                    <div className="md:w-2/3">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
                            <p className="text-gray-700">{qualifications}</p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Specialization</h2>
                            <p className="text-gray-700">{descriptions}</p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">About</h2>
                            <p className="text-gray-700">{about}</p>
                        </div>

                        <Divider />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2">Therapeutic Methods</h3>
                                <div className="flex flex-wrap">
                                    {renderTags(therapeuticMethods, 'magenta')}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Specialities</h3>
                                <div className="flex flex-wrap">
                                    {renderTags(specialities, 'red')}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Service Types</h3>
                                <div className="flex flex-wrap">
                                    {renderTags(serviceTypes, 'green')}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Ages Served</h3>
                                <div className="flex flex-wrap">
                                    {renderTags(agesServed, 'orange')}
                                </div>
                            </div>
                        </div>

                        <Divider />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TherapistProfile;
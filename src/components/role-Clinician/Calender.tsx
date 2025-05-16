/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useState } from 'react';
import { useConnectAccountMutation, useGetAccountStatusQuery } from '../../Redux/apis/calender/calender';
import { useAppSelector } from '../../Redux/hook';
import { selectCurrentUser } from '../../Redux/slice/auth/authSlice';

const ConnectCalendarCard = () => {
    const [loading, setLoading] = useState(false);
    const user = useAppSelector(selectCurrentUser);
    const { data: statusData } = useGetAccountStatusQuery(user?.id);
    const [connectAccount] = useConnectAccountMutation();

    const isConnected = statusData?.data?.isCalendarConnected || false;

    const handleConnectCalendar = async () => {
        setLoading(true);
        try {
            const response: any = await connectAccount(user?.id);
            if (response.data?.success) {
                window.location.href = response.data.data; // Redirect to the OAuth URL
            } else {
                throw new Error('Failed to get authorization URL');
            }
        } catch (error) {
            console.error('Connection failed:', error);
            message.error('Failed to connect to Google Calendar. Please try again.');
            setLoading(false);
        }
    };

    const handleDisconnect = () => {
        // Add your disconnect logic here
        // You'll need to implement an API call to disconnect the calendar
        message.success('Google Calendar disconnected successfully');
    };

    return (
        <div className={`w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg`}>
            <div className="p-2 text-center">
                {isConnected ? (
                    <>
                        <div className='flex'>
                            <div>
                                <div className="flex justify-center mb-4">
                                    <CheckCircleOutlined className="text-4xl text-green-500" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Google Calendar Connected</h3>
                                <p className="text-gray-500 mb-6">Your calendar is successfully connected and syncing</p>
                            </div>
                            <Button
                                onClick={handleDisconnect}
                            >
                                Disconnect
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex'>
                            <div>
                                <div className="flex justify-center mb-4">
                                    <CalendarOutlined className="text-3xl text-blue-500" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Google Calendar</h3>
                                <p className="text-gray-500 mb-6">Connect your Google Calendar to sync your events and availability</p>
                            </div>
                            <Button
                                onClick={handleConnectCalendar}
                                loading={loading}
                                disabled={loading}
                            >
                                {loading ? 'Connecting...' : 'Connect Calendar'}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ConnectCalendarCard;
import { CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useState } from 'react';

const ConnectCalendarCard = () => {
    const [loading, setLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(true); // Assume false initially

    const handleConnectCalendar = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/get-auth-url');
            if (!response.ok) throw new Error('Failed to get authorization URL');
            const { url } = await response.json();
            window.location.href = url;
            // In a real app, you would check connection status from your backend
            // setIsConnected(true) would be set after successful OAuth flow
        } catch (error) {
            console.error('Connection failed:', error);
            message.error('Failed to connect to Google Calendar. Please try again.');
            setLoading(false);
        }
    };

    const handleDisconnect = () => {
        // Add your disconnect logic here
        setIsConnected(false);
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
                            // className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-md transition-colors"
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
                                disabled={loading}
                            // className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
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
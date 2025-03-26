import { useState } from "react";
import BookingListTable from "../components/booking/table/Bookingtable";
import { Modal } from "../components/modal/Modal";
import { format } from 'date-fns';


interface Booking {
    id: string;
    clinicianId: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    userName: string;
    phoneNumber: string;
    userEmail: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    clinician?: { // Optional nested clinician data
        name: string;
    };
}
const BookingList = () => {
    const [modalData, setModalData] = useState<Booking | null>(null);

    const handleView = (record: Booking) => {
        console.log('Viewing record:', record);
        setModalData(record)
        // Add your view logic here (e.g., open modal, navigate to detail page)
    };

    const calculateDuration = (start: Date, end: Date) => {
        const diff = end.getTime() - start.getTime();
        const minutes = Math.floor(diff / 60000);
        return `${minutes} Min`;
    };

    return (
        <div>
            <BookingListTable
                data={data}
                onView={handleView}
            />
            {
                <Modal isOpen={!!modalData} onClose={() => setModalData(null)}>
                    {modalData && (
                        <div className="p-6">
                            <h1 className="text-2xl font-semibold mb-8">Booking Details</h1>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">User name</div>
                                    <div>{modalData.userName}</div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Phone Number</div>
                                    <div>{modalData.phoneNumber}</div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Email</div>
                                    <div>{modalData.userEmail}</div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Message</div>
                                    <div className="text-right max-w-md">
                                        {modalData.message}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Date</div>
                                    <div>{format(modalData.date, 'MMMM d, yyyy')}</div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Time Slot</div>
                                    <div>
                                        {format(modalData.startTime, 'h:mm a')} - {format(modalData.endTime, 'h:mm a')}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Therapist Name</div>
                                    <div>{modalData.clinician?.name || 'Not assigned'}</div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Therapy Duration</div>
                                    <div>{calculateDuration(modalData.startTime, modalData.endTime)}</div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Session Type</div>
                                    <div>Telehealth Only</div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end space-x-4">
                                <button
                                    className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                                    onClick={() => setModalData(null)}
                                >
                                    CLOSE
                                </button>
                                <button className="bg-[#5B9B7B] text-white px-6 py-2 rounded-lg hover:bg-[#4a8a6a] transition-colors">
                                    CANCEL BOOKING
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            }
        </div>
    );
};

export default BookingList;



// Sample data
const data = [
    {
        id: "507f1f77bcf86cd799439011",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-15"),
        startTime: new Date("2023-06-15T09:00:00"),
        endTime: new Date("2023-06-15T10:00:00"),
        userName: "John Smith",
        phoneNumber: "+1 555-123-4567",
        userEmail: "john.smith@example.com",
        message: "I need help with anxiety management",
        createdAt: new Date("2023-06-01T08:30:00"),
        updatedAt: new Date("2023-06-01T08:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439012",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-16"),
        startTime: new Date("2023-06-16T14:00:00"),
        endTime: new Date("2023-06-16T15:00:00"),
        userName: "Emily Davis",
        phoneNumber: "+1 555-234-5678",
        userEmail: "emily.davis@example.com",
        message: "Marriage counseling session requested",
        createdAt: new Date("2023-06-02T10:15:00"),
        updatedAt: new Date("2023-06-02T10:15:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    },
    {
        id: "507f1f77bcf86cd799439013",
        clinicianId: "5e7ac8f0b4879d5a1c8b4569",
        date: new Date("2023-06-17"),
        startTime: new Date("2023-06-17T11:00:00"),
        endTime: new Date("2023-06-17T12:00:00"),
        userName: "Robert Wilson",
        phoneNumber: "+1 555-345-6789",
        userEmail: "robert.wilson@example.com",
        message: "Looking for depression therapy options",
        createdAt: new Date("2023-06-03T14:45:00"),
        updatedAt: new Date("2023-06-03T14:45:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4569",
            name: "Dr. Amanda Lee"
        }
    },
    {
        id: "507f1f77bcf86cd799439014",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-18"),
        startTime: new Date("2023-06-18T13:00:00"),
        endTime: new Date("2023-06-18T14:00:00"),
        userName: "Jessica Brown",
        phoneNumber: "+1 555-456-7890",
        userEmail: "jessica.brown@example.com",
        message: "Need help with stress management techniques",
        createdAt: new Date("2023-06-04T09:20:00"),
        updatedAt: new Date("2023-06-04T09:20:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439015",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-19"),
        startTime: new Date("2023-06-19T10:00:00"),
        endTime: new Date("2023-06-19T11:00:00"),
        userName: "David Taylor",
        phoneNumber: "+1 555-567-8901",
        userEmail: "david.taylor@example.com",
        message: "Couples therapy appointment request",
        createdAt: new Date("2023-06-05T16:30:00"),
        updatedAt: new Date("2023-06-05T16:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    },
    {
        id: "507f1f77bcf86cd799439011",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-15"),
        startTime: new Date("2023-06-15T09:00:00"),
        endTime: new Date("2023-06-15T10:00:00"),
        userName: "John Smith",
        phoneNumber: "+1 555-123-4567",
        userEmail: "john.smith@example.com",
        message: "I need help with anxiety management",
        createdAt: new Date("2023-06-01T08:30:00"),
        updatedAt: new Date("2023-06-01T08:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439012",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-16"),
        startTime: new Date("2023-06-16T14:00:00"),
        endTime: new Date("2023-06-16T15:00:00"),
        userName: "Emily Davis",
        phoneNumber: "+1 555-234-5678",
        userEmail: "emily.davis@example.com",
        message: "Marriage counseling session requested",
        createdAt: new Date("2023-06-02T10:15:00"),
        updatedAt: new Date("2023-06-02T10:15:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    },
    {
        id: "507f1f77bcf86cd799439013",
        clinicianId: "5e7ac8f0b4879d5a1c8b4569",
        date: new Date("2023-06-17"),
        startTime: new Date("2023-06-17T11:00:00"),
        endTime: new Date("2023-06-17T12:00:00"),
        userName: "Robert Wilson",
        phoneNumber: "+1 555-345-6789",
        userEmail: "robert.wilson@example.com",
        message: "Looking for depression therapy options",
        createdAt: new Date("2023-06-03T14:45:00"),
        updatedAt: new Date("2023-06-03T14:45:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4569",
            name: "Dr. Amanda Lee"
        }
    },
    {
        id: "507f1f77bcf86cd799439014",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-18"),
        startTime: new Date("2023-06-18T13:00:00"),
        endTime: new Date("2023-06-18T14:00:00"),
        userName: "Jessica Brown",
        phoneNumber: "+1 555-456-7890",
        userEmail: "jessica.brown@example.com",
        message: "Need help with stress management techniques",
        createdAt: new Date("2023-06-04T09:20:00"),
        updatedAt: new Date("2023-06-04T09:20:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439015",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-19"),
        startTime: new Date("2023-06-19T10:00:00"),
        endTime: new Date("2023-06-19T11:00:00"),
        userName: "David Taylor",
        phoneNumber: "+1 555-567-8901",
        userEmail: "david.taylor@example.com",
        message: "Couples therapy appointment request",
        createdAt: new Date("2023-06-05T16:30:00"),
        updatedAt: new Date("2023-06-05T16:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    },
    {
        id: "507f1f77bcf86cd799439011",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-15"),
        startTime: new Date("2023-06-15T09:00:00"),
        endTime: new Date("2023-06-15T10:00:00"),
        userName: "John Smith",
        phoneNumber: "+1 555-123-4567",
        userEmail: "john.smith@example.com",
        message: "I need help with anxiety management",
        createdAt: new Date("2023-06-01T08:30:00"),
        updatedAt: new Date("2023-06-01T08:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439012",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-16"),
        startTime: new Date("2023-06-16T14:00:00"),
        endTime: new Date("2023-06-16T15:00:00"),
        userName: "Emily Davis",
        phoneNumber: "+1 555-234-5678",
        userEmail: "emily.davis@example.com",
        message: "Marriage counseling session requested",
        createdAt: new Date("2023-06-02T10:15:00"),
        updatedAt: new Date("2023-06-02T10:15:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    },
    {
        id: "507f1f77bcf86cd799439013",
        clinicianId: "5e7ac8f0b4879d5a1c8b4569",
        date: new Date("2023-06-17"),
        startTime: new Date("2023-06-17T11:00:00"),
        endTime: new Date("2023-06-17T12:00:00"),
        userName: "Robert Wilson",
        phoneNumber: "+1 555-345-6789",
        userEmail: "robert.wilson@example.com",
        message: "Looking for depression therapy options",
        createdAt: new Date("2023-06-03T14:45:00"),
        updatedAt: new Date("2023-06-03T14:45:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4569",
            name: "Dr. Amanda Lee"
        }
    },
    {
        id: "507f1f77bcf86cd799439014",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-18"),
        startTime: new Date("2023-06-18T13:00:00"),
        endTime: new Date("2023-06-18T14:00:00"),
        userName: "Jessica Brown",
        phoneNumber: "+1 555-456-7890",
        userEmail: "jessica.brown@example.com",
        message: "Need help with stress management techniques",
        createdAt: new Date("2023-06-04T09:20:00"),
        updatedAt: new Date("2023-06-04T09:20:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439015",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-19"),
        startTime: new Date("2023-06-19T10:00:00"),
        endTime: new Date("2023-06-19T11:00:00"),
        userName: "David Taylor",
        phoneNumber: "+1 555-567-8901",
        userEmail: "david.taylor@example.com",
        message: "Couples therapy appointment request",
        createdAt: new Date("2023-06-05T16:30:00"),
        updatedAt: new Date("2023-06-05T16:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    },
    {
        id: "507f1f77bcf86cd799439011",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-15"),
        startTime: new Date("2023-06-15T09:00:00"),
        endTime: new Date("2023-06-15T10:00:00"),
        userName: "John Smith",
        phoneNumber: "+1 555-123-4567",
        userEmail: "john.smith@example.com",
        message: "I need help with anxiety management",
        createdAt: new Date("2023-06-01T08:30:00"),
        updatedAt: new Date("2023-06-01T08:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439012",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-16"),
        startTime: new Date("2023-06-16T14:00:00"),
        endTime: new Date("2023-06-16T15:00:00"),
        userName: "Emily Davis",
        phoneNumber: "+1 555-234-5678",
        userEmail: "emily.davis@example.com",
        message: "Marriage counseling session requested",
        createdAt: new Date("2023-06-02T10:15:00"),
        updatedAt: new Date("2023-06-02T10:15:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    },
    {
        id: "507f1f77bcf86cd799439013",
        clinicianId: "5e7ac8f0b4879d5a1c8b4569",
        date: new Date("2023-06-17"),
        startTime: new Date("2023-06-17T11:00:00"),
        endTime: new Date("2023-06-17T12:00:00"),
        userName: "Robert Wilson",
        phoneNumber: "+1 555-345-6789",
        userEmail: "robert.wilson@example.com",
        message: "Looking for depression therapy options",
        createdAt: new Date("2023-06-03T14:45:00"),
        updatedAt: new Date("2023-06-03T14:45:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4569",
            name: "Dr. Amanda Lee"
        }
    },
    {
        id: "507f1f77bcf86cd799439014",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-18"),
        startTime: new Date("2023-06-18T13:00:00"),
        endTime: new Date("2023-06-18T14:00:00"),
        userName: "Jessica Brown",
        phoneNumber: "+1 555-456-7890",
        userEmail: "jessica.brown@example.com",
        message: "Need help with stress management techniques",
        createdAt: new Date("2023-06-04T09:20:00"),
        updatedAt: new Date("2023-06-04T09:20:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439015",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-19"),
        startTime: new Date("2023-06-19T10:00:00"),
        endTime: new Date("2023-06-19T11:00:00"),
        userName: "David Taylor",
        phoneNumber: "+1 555-567-8901",
        userEmail: "david.taylor@example.com",
        message: "Couples therapy appointment request",
        createdAt: new Date("2023-06-05T16:30:00"),
        updatedAt: new Date("2023-06-05T16:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    },
    {
        id: "507f1f77bcf86cd799439011",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-15"),
        startTime: new Date("2023-06-15T09:00:00"),
        endTime: new Date("2023-06-15T10:00:00"),
        userName: "John Smith",
        phoneNumber: "+1 555-123-4567",
        userEmail: "john.smith@example.com",
        message: "I need help with anxiety management",
        createdAt: new Date("2023-06-01T08:30:00"),
        updatedAt: new Date("2023-06-01T08:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439012",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-16"),
        startTime: new Date("2023-06-16T14:00:00"),
        endTime: new Date("2023-06-16T15:00:00"),
        userName: "Emily Davis",
        phoneNumber: "+1 555-234-5678",
        userEmail: "emily.davis@example.com",
        message: "Marriage counseling session requested",
        createdAt: new Date("2023-06-02T10:15:00"),
        updatedAt: new Date("2023-06-02T10:15:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    },
    {
        id: "507f1f77bcf86cd799439013",
        clinicianId: "5e7ac8f0b4879d5a1c8b4569",
        date: new Date("2023-06-17"),
        startTime: new Date("2023-06-17T11:00:00"),
        endTime: new Date("2023-06-17T12:00:00"),
        userName: "Robert Wilson",
        phoneNumber: "+1 555-345-6789",
        userEmail: "robert.wilson@example.com",
        message: "Looking for depression therapy options",
        createdAt: new Date("2023-06-03T14:45:00"),
        updatedAt: new Date("2023-06-03T14:45:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4569",
            name: "Dr. Amanda Lee"
        }
    },
    {
        id: "507f1f77bcf86cd799439014",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-18"),
        startTime: new Date("2023-06-18T13:00:00"),
        endTime: new Date("2023-06-18T14:00:00"),
        userName: "Jessica Brown",
        phoneNumber: "+1 555-456-7890",
        userEmail: "jessica.brown@example.com",
        message: "Need help with stress management techniques",
        createdAt: new Date("2023-06-04T09:20:00"),
        updatedAt: new Date("2023-06-04T09:20:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439015",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-19"),
        startTime: new Date("2023-06-19T10:00:00"),
        endTime: new Date("2023-06-19T11:00:00"),
        userName: "David Taylor",
        phoneNumber: "+1 555-567-8901",
        userEmail: "david.taylor@example.com",
        message: "Couples therapy appointment request",
        createdAt: new Date("2023-06-05T16:30:00"),
        updatedAt: new Date("2023-06-05T16:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    },
    {
        id: "507f1f77bcf86cd799439011",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-15"),
        startTime: new Date("2023-06-15T09:00:00"),
        endTime: new Date("2023-06-15T10:00:00"),
        userName: "John Smith",
        phoneNumber: "+1 555-123-4567",
        userEmail: "john.smith@example.com",
        message: "I need help with anxiety management",
        createdAt: new Date("2023-06-01T08:30:00"),
        updatedAt: new Date("2023-06-01T08:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439012",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-16"),
        startTime: new Date("2023-06-16T14:00:00"),
        endTime: new Date("2023-06-16T15:00:00"),
        userName: "Emily Davis",
        phoneNumber: "+1 555-234-5678",
        userEmail: "emily.davis@example.com",
        message: "Marriage counseling session requested",
        createdAt: new Date("2023-06-02T10:15:00"),
        updatedAt: new Date("2023-06-02T10:15:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    },
    {
        id: "507f1f77bcf86cd799439013",
        clinicianId: "5e7ac8f0b4879d5a1c8b4569",
        date: new Date("2023-06-17"),
        startTime: new Date("2023-06-17T11:00:00"),
        endTime: new Date("2023-06-17T12:00:00"),
        userName: "Robert Wilson",
        phoneNumber: "+1 555-345-6789",
        userEmail: "robert.wilson@example.com",
        message: "Looking for depression therapy options",
        createdAt: new Date("2023-06-03T14:45:00"),
        updatedAt: new Date("2023-06-03T14:45:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4569",
            name: "Dr. Amanda Lee"
        }
    },
    {
        id: "507f1f77bcf86cd799439014",
        clinicianId: "5e7ac8f0b4879d5a1c8b4567",
        date: new Date("2023-06-18"),
        startTime: new Date("2023-06-18T13:00:00"),
        endTime: new Date("2023-06-18T14:00:00"),
        userName: "Jessica Brown",
        phoneNumber: "+1 555-456-7890",
        userEmail: "jessica.brown@example.com",
        message: "Need help with stress management techniques",
        createdAt: new Date("2023-06-04T09:20:00"),
        updatedAt: new Date("2023-06-04T09:20:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4567",
            name: "Dr. Sarah Johnson"
        }
    },
    {
        id: "507f1f77bcf86cd799439015",
        clinicianId: "5e7ac8f0b4879d5a1c8b4568",
        date: new Date("2023-06-19"),
        startTime: new Date("2023-06-19T10:00:00"),
        endTime: new Date("2023-06-19T11:00:00"),
        userName: "David Taylor",
        phoneNumber: "+1 555-567-8901",
        userEmail: "david.taylor@example.com",
        message: "Couples therapy appointment request",
        createdAt: new Date("2023-06-05T16:30:00"),
        updatedAt: new Date("2023-06-05T16:30:00"),
        clinician: {
            id: "5e7ac8f0b4879d5a1c8b4568",
            name: "Dr. Michael Chen"
        }
    }
];
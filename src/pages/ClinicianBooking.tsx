import { useState } from "react";
import BookingListTable from "../components/booking/table/Bookingtable";
import { Modal } from "../components/modal/Modal";
import { format } from 'date-fns';
import { useGetAllBookingQuery } from "../Redux/apis/booking/bookingApi";


interface Booking {
    id: string;
    clinicianId: string;
    googleEventId?: string;  // Optional as it might not always be present
    date: string | Date;     // Can be string (from API) or Date (after parsing)
    startTime: string | Date;
    endTime: string | Date;
    userName: string;
    phoneNumber: string;
    userEmail: string;
    message: string;
    timeZone: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    clinician?: {
        id: string;
        name: string;
        email: string;
        image?: string;     // Optional profile image URL
    };
}
const ClinicianBookingList = () => {

    const { data: bookingData, isLoading } = useGetAllBookingQuery(undefined)
    const [modalData, setModalData] = useState<Booking | null>(null);

    console.log(bookingData?.data);

    const handleView = (record: Booking) => {
        console.log('Viewing record:', record);
        setModalData(record)
        // Add your view logic here (e.g., open modal, navigate to detail page)
    };

    // const calculateDuration = (start: Date, end: Date) => {
    //     const diff = Math.abs(end.getTime() - start.getTime()); // safe for any order
    //     const minutes = Math.floor(diff / 60000);
    //     return `${minutes} Min`;
    // };



    if (isLoading) {
        return <p>Loading</p>
    }

    return (
        <div>
            <BookingListTable
                data={bookingData?.data}
                onView={handleView}
            />
            {
                <Modal isOpen={!!modalData} onClose={() => setModalData(null)}>
                    {modalData && (
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-8">
                                <h1 className="text-2xl font-semibold">Booking Details</h1>
                                {modalData.clinician?.image && (
                                    <img
                                        src={modalData.clinician.image}
                                        alt={modalData.clinician.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">User name</div>
                                    <div className="font-medium">{modalData.userName}</div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Phone Number</div>
                                    <div className="font-medium">
                                        <a href={`tel:${modalData.phoneNumber}`} className="hover:underline">
                                            {modalData.phoneNumber}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Email</div>
                                    <div className="font-medium">
                                        <a href={`mailto:${modalData.userEmail}`} className="hover:underline">
                                            {modalData.userEmail}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Message</div>
                                    <div className="text-right max-w-md font-medium">
                                        {modalData.message || "No message provided"}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Date</div>
                                    <div className="font-medium">
                                        {format(new Date(modalData.date), 'MMMM d, yyyy')}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Time Slot</div>
                                    <div className="font-medium">
                                        {format(new Date(modalData.startTime), 'h:mm a')} - {format(new Date(modalData.endTime), 'h:mm a')}
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({modalData.timeZone.replace('_', ' ')})
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Therapist</div>
                                    <div className="font-medium">
                                        {modalData.clinician?.name || 'Not assigned'}
                                        {modalData.clinician?.email && (
                                            <div className="text-sm text-gray-500">
                                                <a href={`mailto:${modalData.clinician.email}`} className="hover:underline">
                                                    {modalData.clinician.email}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Therapy Duration</div>
                                    {/* <div className="font-medium">
                                        {calculateDuration(modalData.startTime as Date, modalData.endTime as Date)}
                                    </div> */}
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Booking Created</div>
                                    <div className="font-medium">
                                        {format(new Date(modalData.createdAt), 'MMMM d, yyyy h:mm a')}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center lg:gap-40 gap-20 py-4 border-b border-gray-200">
                                    <div className="text-gray-600">Session Type</div>
                                    <div className="font-medium">Telehealth Only</div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end space-x-4">
                                <button
                                    className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                                    onClick={() => setModalData(null)}
                                >
                                    CLOSE
                                </button>
                                {/* <button
                                    className="bg-[#5B9B7B] text-white px-6 py-2 rounded-lg hover:bg-[#4a8a6a] transition-colors"
                                    onClick={() => {
                                        // Add your cancel booking logic here
                                        console.log('Canceling booking:', modalData.id);
                                    }}
                                >
                                    CANCEL BOOKING
                                </button> */}
                            </div>
                        </div>
                    )}
                </Modal>
            }
        </div>
    );
};

export default ClinicianBookingList;

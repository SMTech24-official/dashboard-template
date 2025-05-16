import TherapistProfile from "../components/role-Clinician/TherapistProfile";
import { useGetProfileQuery } from "../Redux/apis/calender/calender";
import { useAppSelector } from "../Redux/hook";
import { selectCurrentUser } from "../Redux/slice/auth/authSlice";

// type TherapistData = {
//     id: string;
//     userId: string;
//     email: string;
//     name: string;
//     practice: string;
//     image: string;
//     qualifications: string[];
//     descriptions: string;
//     about: string;
//     portfolioLink: string;
//     therapeuticMethods: string[];
//     specialities: string[];
//     serviceTypes: string[];
//     agesServed: string[];
//     location: string;
//     availabilityDay: string;
//     availabilityTime: string;
//     telehealthOnly: boolean;
//     isCalendarConnected: boolean;
// };

const MyProfile = () => {
    const user = useAppSelector(selectCurrentUser);
    console.log(user?.id);

    const userId = user?.id ?? ''; // fallback to empty string

    const { data, isLoading } = useGetProfileQuery(userId, {
        skip: !user?.id, // prevents query if id is missing
    });

    console.log(data?.data);

    if (isLoading) {
        return <p>Loading</p>
    }
    return (
        <div className="p-4">
            <TherapistProfile data={data?.data} />
        </div>
    );
};

export default MyProfile;
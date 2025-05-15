import TherapistProfile from "../components/role-Clinician/TherapistProfile";

type TherapistData = {
    id: string;
    userId: string;
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

const MyProfile = () => {

    const profile: TherapistData = {
        id: "67e432b7541c9e400ae38039",
        userId: "67e432b7541c9e400ae38038",
        email: "rahiilarham@gmail.com",
        name: "Dr. Sarah Johnson",
        practice: "Cognitive Behavioral Therapy Center",
        image: "http://localhost:6001/uploads/1743008438891-IMG_202402091.png",
        qualifications: ["PhD in Clinical Psychology, Licensed Psychologist"],
        descriptions: "Specializing in anxiety and depression treatment",
        about: "I am a compassionate therapist with over 10 years of experience...",
        portfolioLink: "https://www.example.com/therapist-profile",
        therapeuticMethods: ["OT", "JT", "KT"],
        specialities: ["OT", "JT", "KT"],
        serviceTypes: ["OT", "JT", "KT"],
        agesServed: ["OT", "JT", "KT"],
        location: "New York, NY",
        availabilityDay: "Monday - Friday",
        availabilityTime: "9:00 AM - 5:00 PM",
        telehealthOnly: true,
        isCalendarConnected: false
    };

    return (
        <div className="p-4">
            <TherapistProfile data={profile} />
        </div>
    );
};

export default MyProfile;
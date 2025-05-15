import { useEffect, useRef, useState } from 'react';
import { LiaClipboardListSolid } from 'react-icons/lia';
import { RiDashboardFill } from 'react-icons/ri';
import { Outlet } from 'react-router';
import BreadCrumb from '../BreadCrumb';
import SideBar from './navigationBar/SiderBar';
import TopBar from './navigationBar/TopBar';
import { LuUser } from 'react-icons/lu';
// import { FaUsers } from 'react-icons/fa';



const ClinicianDashboardLayout = () => {
    const user = null
    const [isOpen, setIsOpen] = useState(false)
    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [navRef])

    const navLink = [
        {
            name: 'Dashboard',
            href: '/clinician',
            icon: RiDashboardFill
        },
        {
            name: 'My Profile',
            href: '/clinician/my-profile',
            icon: LuUser
        },
        {
            name: 'Booking List',
            href: '/clinician/booking-list',
            icon: LiaClipboardListSolid
        },

    ];



    return (
        <div className='flex'>
            <div className='max-h-screen h-full sticky top-0 z-50'>
                <SideBar additionalRoutes={null} navLink={navLink} isOpen={isOpen} navRef={navRef} />
            </div>
            <div className='w-full'>
                <div className='sticky top-0 z-40'>
                    <TopBar setIsOpen={setIsOpen} isOpen={isOpen} user={user} />
                </div>
                <div className='p-4 min-h-screen space-y-2'>
                    <BreadCrumb />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ClinicianDashboardLayout;
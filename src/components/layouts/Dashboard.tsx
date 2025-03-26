import { useEffect, useRef, useState } from 'react';
import { CiFolderOn, CiLocationOn } from 'react-icons/ci';
import { GiNewspaper, GiStethoscope } from 'react-icons/gi';
import { GoPlus } from 'react-icons/go';
import { GrMapLocation } from 'react-icons/gr';
import { IoPeopleOutline } from 'react-icons/io5';
import { LiaCanadianMapleLeaf, LiaClipboardListSolid } from 'react-icons/lia';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { PiNewspaperThin } from 'react-icons/pi';
import { RiDashboardFill } from 'react-icons/ri';
import { Outlet } from 'react-router';
import SideBar from './navigationBar/SiderBar';
import TopBar from './navigationBar/TopBar';
import BreadCrumb from '../BreadCrumb';




const DashboardLayout = () => {
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
            href: '/dashboard',
            icon: RiDashboardFill
        },
        {
            name: 'Booking List',
            href: '/dashboard/booking-list',
            icon: LiaClipboardListSolid
        },
        {
            name: 'Service',
            href: '/dashboard/service',
            icon: LiaCanadianMapleLeaf,
            subItems: [
                { name: 'Add Service', href: '/dashboard/add-service', icon: GoPlus },
                { name: 'All Services', href: '/dashboard/all-service', icon: CiFolderOn },
            ]
        },
        {
            name: 'Locations',
            href: '/dashboard/locations',
            icon: CiLocationOn,
            subItems: [
                { name: 'Add Location', href: '/dashboard/add-location', icon: MdOutlineAddLocationAlt },
                { name: 'All Location', href: '/dashboard/all-location', icon: GrMapLocation },
            ]
        },
        {
            name: 'Our clinicians',
            href: '/dashboard/clinicians',
            icon: GiStethoscope,
            subItems: [
                { name: 'Add Clinician', href: '/dashboard/add-clinicians', icon: GoPlus },
                { name: 'All Clinician', href: '/dashboard/all-clinicians', icon: IoPeopleOutline },
            ]
        },
        {
            name: 'Blog',
            href: '/dashboard/blog',
            icon: PiNewspaperThin,
            subItems: [
                { name: 'Add Blogs', href: '/dashboard/add-blog', icon: GoPlus },
                { name: 'All Blogs', href: '/dashboard/all-blog', icon: GiNewspaper },
            ]
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

export default DashboardLayout;
import type { NavLink } from '../types';
import MainNavLink from './Navlink';




export default function SideBar({ navRef, isOpen, additionalRoutes, navLink }: { navRef: React.RefObject<HTMLDivElement | null>, isOpen: boolean, navLink: NavLink[], additionalRoutes: NavLink[] | null }) {

    return (
        <div ref={navRef && navRef} className="min-h-screen h-full flex relative">
            <div>
                <div
                    className={`fixed inset-y-0 left-0 z-40 w-64 md:w-56 lg:w-72 shadow-md h-full transform transition-transform duration-300 ease-in-ou ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <MainNavLink additionalRoutes={additionalRoutes} navLink={navLink} />
                </div>
            </div>
            {/* Sidebar for large screens */}
            <div
                className="hidden lg:block lg:w-72 h-full shadow-md"
            >
                <MainNavLink additionalRoutes={additionalRoutes} navLink={navLink} />
            </div>
            <div className='absolute -right-2 bg-white w-10 h-[88px]'>

            </div>
        </div>
    )
}

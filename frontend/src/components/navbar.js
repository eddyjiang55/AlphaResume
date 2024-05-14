import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { navigationItems } from '../lib/navbarData';
import { useAuth } from '../components/AuthContext';  // Adjust path as necessary

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const ref = useRef(null);
    const { phoneNumber, logout } = useAuth(); // Use phoneNumber to check login status

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();  // Logout user
    };

    return (
        <>
            <nav className="w-full flex flex-row justify-between items-center bg-white px-16">
                <div className="shrink-0">
                    <Link href='/'><Image src="/img/Logo_x.jpg" alt="Logo" width={190} height={100} /></Link>
                </div>
                <div className="flex flex-row justify-between items-center gap-x-24" ref={ref}>
                    {navigationItems.map((item, index) => (
                        <div key={index} className="inline-block relative">
                            <div className={`w-full flex items-center text-lg text-alpha-blue p-2 border-b-2 ${openDropdown === index ? "border-alpha-blue" : "border-transparent"}`}
                                onMouseEnter={() => setOpenDropdown(index)}
                            >
                                {item.title}
                                {openDropdown === index ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up w-4 h-4" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M6 15l6 -6l6 6" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down w-4 h-4" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M6 9l6 6l6 -6" />
                                    </svg>
                                )}
                            </div>
                            {openDropdown === index && (
                                <div className="absolute w-auto min-w-[460px] left-0 bg-white text-black mt-6 p-1 z-50 rounded-lg border-[#b2ddee] border-2 shadow-inner">
                                    {item.links.map((link, linkIndex) => (
                                        <div className="grid grid-cols-5 items-center gap-x-4 px-8">
                                            <div className='w-16 h-16 rounded-full p-2 bg-[#b2ddee] text-alpha-blue'>
                                                {link.icon}
                                            </div>
                                            <Link key={linkIndex} href={link.url} className="p-1 col-span-4">
                                                <div className="flex flex-col px-6 py-8 rounded-lg hover:bg-[#b2ddee]">
                                                    <div className="item-title font-bold">{link.title}</div>
                                                    <div className="item-description text-sm">{link.description}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="actions flex gap-2.5 mr-18">
                    {phoneNumber ? (
                        <>
                            <div className="user-avatar">
                                <Image src="/img/user-avatar.jpg" alt="User Avatar" width={40} height={40} className="rounded-full" />
                            </div>
                            <button className="action-button px-7 py-2 border border-[#1D80A7] bg-white text-[#1D80A7] cursor-pointer rounded-md hover:bg-[#1D80A7] hover:text-white" onClick={handleLogout}>登出</button>
                        </>
                    ) : (
                        <>
                            <Link href='/login'>
                                <button className="action-button px-7 py-2 border border-[#1D80A7] bg-white text-[#1D80A7] cursor-pointer rounded-md hover:bg-[#1D80A7] hover:text-white">登陆</button>
                            </Link>
                            <button className="action-button px-7 py-2 border border-[#1D80A7] bg-white text-[#1D80A7] cursor-pointer rounded-md hover:bg-[#1D80A7] hover:text-white">获取</button>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;

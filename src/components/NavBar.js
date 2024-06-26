import React, { useEffect, useState } from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scroll > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const navItems = [
        {id: 1, text: 'Home' },
        {id: 2, text: 'Skills' },
        {id: 3, text: 'Projects' }
    ];

    const navIcons = [
        {id: 1, icon: <FaLinkedin /> },
        {id: 2, icon: <FaGithub /> }
    ];

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    return (
        <nav className={scrolled ? "bg-white border-gray-200 dark:bg-gray-900" : "bg-white border-gray-200 dark:bg-gray-900"}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-8 px-24">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Aaron Loh</span>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:inline-flex md:w-fit flex flex-row gap-4" id="navbar-default">
                    <ul className="inline-block font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {navItems.map(item => (
                            <li
                                key={item.id}
                                className={activeLink === item.text ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500' : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' }
                                onClick={() => onUpdateActiveLink(item.text)}
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                    <span className="flex flex-row gap-2">
                        {navIcons.map(element => (
                            <div
                                key={element.id}
                                className="flex items-center"
                            >
                                {element.icon}
                            </div>
                        ))}
                    </span>
                </div>
            </div>
        </nav>
    )
}
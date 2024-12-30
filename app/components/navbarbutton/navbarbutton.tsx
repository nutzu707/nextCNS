'use client';

import React from "react";
import Link from "next/link";

const NavbarButton = ({ title, options, link  }) => {

    if (link) {
        return (
            <div className="inline-block">
                <Link href={link} passHref>
                    <button className="text-black px-2 py-0.5 rounded-md hover:bg-gray-200 flex items-center font-bold text-xl">
                        {title}
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="relative inline-block group">
            <button className="text-black px-2 py-0.5 rounded-md hover:bg-gray-200 flex items-center font-bold text-xl">
                {title}
            </button>

            <div className="absolute left-0 bg-white border-2 shadow-2xl opacity-0 transform scale-y-0 origin-top transition-all duration-75 ease-out group-hover:opacity-100 group-hover:scale-y-100 rounded-xl">
                <ul>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="mx-1 my-1 px-2 hover:bg-gray-100 cursor-pointer font-bold text-xl rounded-md whitespace-nowrap "
                        >
                            <Link href={option.link} className="block">
                                {option.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );









};

export default NavbarButton;

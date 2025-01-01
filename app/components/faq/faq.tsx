"use client"
import { useState } from 'react';

interface FaqItemProps {
    title: string;
    content: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (

        <div>

            <div
                className="cursor-pointer"
                onClick={handleToggle}
            >
                <p className="text-2xl font-bold pt-1 -mb-1">{title}</p>
            </div>
            {isOpen && (
                <div className="">
                <p className="text-xl mt-4">{content}</p>
                </div>
            )}
            <hr className="solid border-t-2 mt-2" />
        </div>
    );
};

export default FaqItem;

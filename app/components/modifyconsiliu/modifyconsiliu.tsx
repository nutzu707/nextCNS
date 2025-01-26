'use client';

import { useState } from 'react';
import Uploadconsiliupersontoserver from "@/app/components/uploadconsiliupersontoserver/uploadconsiliupersontoserver";

const CreateConsiliuPersonJsonFile = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);

    const handlePhotoUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const generateJson = () => {
        if (!name || !position || !photo) {
            alert('Name, Position, and Photo are mandatory!');
            return;
        }

        const jsonObject = {
            person: {
                name,
                position,
                photo,
            },
        };

        const jsonBlob = new Blob([JSON.stringify(jsonObject, null, 2)], {
            type: 'application/json',
        });

        const sanitizedName = name.replace(/[^a-zA-Z0-9_\-]/g, '_');
        const fileName = `${sanitizedName || 'untitled'}.json`;

        const url = URL.createObjectURL(jsonBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;

        Uploadconsiliupersontoserver(fileName, jsonBlob);
    };

    return (
        <div className="rounded-md shadow-2xl border-2">
            <div className="items-center flex flex-col mt-16">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nume"
                    className="border-2 p-1 shadow-2xl rounded-md text-center w-[90%]"

                />
            </div>
            <div className="items-center flex flex-col mt-4">
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Pozitie"
                    className="border-2 p-1 shadow-2xl rounded-md text-center w-[90%]"
                />
            </div>


            <div className="items-center flex flex-col mt-4">
                <label>Photo:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handlePhotoUpload(e.target.files[0])}
                    className="w-[300px] mt-1 file:bg-white bg-none file:cursor-pointer file:border-gray-300 file:clear-start file:border-2  file:rounded-md file:hover:bg-gray-200 file:shadow-xl file:text-xl  "

                />
                {photo && (
                    <div>
                        <img
                            src={photo}
                            alt="Photo Preview"
                            className="rounded-full shadow-2xl mt-4 w-[300px] h-[300px] object-cover"
                        />
                    </div>
                )}
            </div>

            <button onClick={generateJson} className="text-xl rounded-md shadow-xl bg-white text-black border-2 border-solid hover:bg-gray-200 font-bold mt-8 p-1 mb-16  mx-auto block px-4">
                Adauga persoana
            </button>
        </div>
    );
};

export default CreateConsiliuPersonJsonFile;

'use client';

import { useState } from 'react';
import Uploadconsiliupersontoserver from "@/app/components/uploadconsiliupersontoserver/uploadconsiliupersontoserver";

const CreateConsiliuPersonJsonFile = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [photo, setPhoto] = useState<string | null>(null); // New state for photo (base64)

    // Handle file upload for the person's photo
    const handlePhotoUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPhoto(reader.result as string); // Set the photo image as Base64
        };
        reader.readAsDataURL(file);
    };

    const generateJson = () => {
        // Check if the mandatory fields are filled
        if (!name || !position || !photo) {
            alert('Name, Position, and Photo are mandatory!');
            return;
        }

        const jsonObject = {
            person: {
                name,
                position,
                photo, // The photo (base64)
            },
        };

        const jsonBlob = new Blob([JSON.stringify(jsonObject, null, 2)], {
            type: 'application/json',
        });

        // Sanitize the name to make it a valid filename
        const sanitizedName = name.replace(/[^a-zA-Z0-9_\-]/g, '_');
        const fileName = `${sanitizedName || 'untitled'}.json`;

        const url = URL.createObjectURL(jsonBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;

        // Optional: Upload to server (adjust according to your server logic)
        Uploadconsiliupersontoserver(fileName, jsonBlob);
    };

    return (
        <div className="create-json-file">
            <h2>Create Person JSON File</h2>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter the person's name"
                />
            </div>
            <div className="form-group">
                <label>Position:</label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Enter the person's position"
                />
            </div>

            {/* Photo Upload Field */}
            <div className="form-group">
                <label>Photo:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handlePhotoUpload(e.target.files[0])}
                />
                {photo && (
                    <div>
                        <p>Photo Preview:</p>
                        <img
                            src={photo}
                            alt="Photo Preview"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    </div>
                )}
            </div>

            <button onClick={generateJson} className="generate-json">
                Generate JSON
            </button>
        </div>
    );
};

export default CreateConsiliuPersonJsonFile;

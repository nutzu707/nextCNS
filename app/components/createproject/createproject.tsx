'use client';

import { useState } from 'react';
import uploadnewstoserver from "@/app/components/uploadnewstoserver/uploadnewstoserver";
import uploadprojecttoserver from "@/app/components/uploadprojecttoserver/uploadprojecttoserver";

const CreateProjectJsonFile = () => {
    const [title, setTitle] = useState('');
    const [postDate, setPostDate] = useState('');
    const [photo, setPhoto] = useState<string | null>(null); // New state for photo (thumbnail)
    const [link, setLink] = useState('');
    const [color, setColor] = useState('#000000');    const [content, setContent] = useState<
        { type: 'paragraph' | 'image'; text?: string; imageData?: string; caption?: string }[]
    >([]);

    // Handle file upload for the project thumbnail
    const handleThumbnailUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPhoto(reader.result as string); // Set the thumbnail image as Base64
        };
        reader.readAsDataURL(file);
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value.slice(0, 30); // Limit title to 30 characters
        setTitle(newTitle);
    };
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value); // Update the color value
    };



    const generateJson = () => {
        // Check if the mandatory fields are filled
        if (!title  || !photo) {
            alert('Title and Photo are mandatory!');
            return;
        }

        const jsonObject = {
            project: {
                title,
                photo, // The thumbnail photo (base64)
                link,  // Link for the project (could be a YouTube link or conducere)
                color, // The color field
            },
        };
        const jsonBlob = new Blob([JSON.stringify(jsonObject, null, 2)], {
            type: 'application/json',
        });

        // Sanitize the title to make it a valid filename
        const sanitizedTitle = title.replace(/[^a-zA-Z0-9_\-]/g, '_');
        const fileName = `${sanitizedTitle || 'untitled'}.json`;

        const url = URL.createObjectURL(jsonBlob);
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.download = fileName;

        // Optional: Upload to server (adjust according to your server logic)
        uploadprojecttoserver(fileName, jsonBlob);
    };

    return (
        <div className="create-json-file">
            <h2>Create Project JSON File</h2>
            <div className="form-group">
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter the project title"
                />
            </div>

            {/* New Thumbnail Upload Field */}
            <div className="form-group">
                <label>Thumbnail:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleThumbnailUpload(e.target.files[0])}
                />
                {photo && (
                    <div>
                        <p>Thumbnail Preview:</p>
                        <img
                            src={photo}
                            alt="Thumbnail Preview"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    </div>
                )}
            </div>
            <div className="form-group">
                <label>Project Link:</label>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Enter a link for the project (e.g., YouTube)"
                />
            </div>
            <div className="form-group">
                <label>Color:</label>
                <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    placeholder="Pick a color"
                />
            </div>

            <button onClick={generateJson} className="generate-json">
                Generate JSON
            </button>
        </div>
    );
};

export default CreateProjectJsonFile;

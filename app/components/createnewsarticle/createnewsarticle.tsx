'use client';

import { useState } from 'react';
import uploadnewstoserver from "@/app/components/uploadnewstoserver/uploadnewstoserver";

const CreateJsonFile = () => {
    const [title, setTitle] = useState('');
    const [postDate, setPostDate] = useState('');
    const [thumbnail, setThumbnail] = useState<string | null>(null); // New state for thumbnail
    const [content, setContent] = useState<
        { type: 'paragraph' | 'image'; text?: string; imageData?: string; caption?: string }[]
    >([]);

    // Handle file upload for the article thumbnail
    const handleThumbnailUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            setThumbnail(reader.result as string); // Set the thumbnail image as Base64
        };
        reader.readAsDataURL(file);
    };

    const addContentItem = (type: 'paragraph' | 'image') => {
        if (type === 'paragraph') {
            setContent([...content, { type, text: '' }]);
        } else if (type === 'image') {
            setContent([...content, { type, imageData: '', caption: '' }]);
        }
    };

    const updateContentItem = (index: number, key: string, value: string) => {
        const updatedContent = [...content];
        updatedContent[index] = { ...updatedContent[index], [key]: value };
        setContent(updatedContent);
    };

    const handleFileUpload = (index: number, file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64Image = reader.result as string;
            const updatedContent = [...content];
            updatedContent[index] = { ...updatedContent[index], imageData: base64Image };
            setContent(updatedContent);
        };
        reader.readAsDataURL(file);
    };

    const deleteContentItem = (index: number) => {
        const updatedContent = content.filter((_, i) => i !== index);
        setContent(updatedContent);
    };



    const generateJson = () => {
        // Check if the mandatory fields are filled
        if (!title || !postDate || !thumbnail) {
            alert('Title, Date, and Thumbnail are mandatory!');
            return;
        }

        const jsonObject = {
            article: {
                title,
                post_date: postDate,
                thumbnail,
                content,
            },
        };
        const jsonBlob = new Blob([JSON.stringify(jsonObject, null, 2)], {
            type: 'application/json',
        });

        // Sanitize the title to make it a valid filename
        const sanitizedTitle = title.replace(/[^a-zA-Z0-9_\-]/g, '_');
        const fileName = `${sanitizedTitle || 'untitled'}.json`;

        const url = URL.createObjectURL(jsonBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;

        uploadnewstoserver(fileName, jsonBlob);

    };



    return (
        <div className="create-json-file">
            <h2>Create JSON File</h2>
            <div className="form-group">
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the title"
                />
            </div>
            <div className="form-group">
                <label>Post Date:</label>
                <input
                    type="date"
                    value={postDate}
                    onChange={(e) => setPostDate(e.target.value)}
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
                {thumbnail && (
                    <div>
                        <p>Thumbnail Preview:</p>
                        <img
                            src={thumbnail}
                            alt="Thumbnail Preview"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    </div>
                )}
            </div>
            <div className="content-editor">
                <h3>Content:</h3>
                {content.map((item, index) => (
                    <div key={index} className="content-item">
                        <p>Type: {item.type}</p>
                        {item.type === 'paragraph' && (
                            <textarea
                                value={item.text || ''}
                                onChange={(e) =>
                                    updateContentItem(index, 'text', e.target.value)
                                }
                                placeholder="Enter paragraph text"
                            />
                        )}
                        {item.type === 'image' && (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        e.target.files && handleFileUpload(index, e.target.files[0])
                                    }
                                />
                                {item.imageData && (
                                    <div>
                                        <p>Image Preview:</p>
                                        <img
                                            src={item.imageData}
                                            alt={`Preview ${index}`}
                                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                                        />
                                    </div>
                                )}
                                <input
                                    type="text"
                                    value={item.caption || ''}
                                    onChange={(e) =>
                                        updateContentItem(index, 'caption', e.target.value)
                                    }
                                    placeholder="Enter image caption"
                                />
                            </>
                        )}
                        <button onClick={() => deleteContentItem(index)}>Delete</button>
                    </div>
                ))}
                <button onClick={() => addContentItem('paragraph')}>Add Paragraph</button>
                <button onClick={() => addContentItem('image')}>Add Image</button>
            </div>
            <button onClick={generateJson} className="generate-json">
                Generate JSON
            </button>
        </div>
    );
};

export default CreateJsonFile;

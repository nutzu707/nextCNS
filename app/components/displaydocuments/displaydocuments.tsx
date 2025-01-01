// app/components/documents-list.tsx

import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import {Button} from "@/components/ui/button";
import Archivebutton from "@/app/components/archivebutton/archivebutton";
import React from "react";

interface DocumentsListProps {
    folderPath: string; // Accept the folder path as a prop
}

const DocumentList = async ({ folderPath }: DocumentsListProps) => {
    let documentFiles: string[] = [];

    try {
        // Read the documents directory asynchronously
        const files = await fs.promises.readdir(folderPath);

        // Include all files, no filtering based on extension
        documentFiles = files;
    } catch (error) {
        console.error('Error reading documents:', error);
        documentFiles = []; // Ensure we have a fallback in case of an error
    }

    const totalItems = documentFiles.length ;
    return (
        <div>
            <ul>
                {documentFiles.length === 0 ? (
                    <li>No documents available</li>
                ) : (
                    documentFiles.map((document, index) => {
                        const documentPath = path.join('documents', path.basename(folderPath), document);
                        const delay = `${index * 50}ms`;

                        return (
                            <div
                                key={index}
                                className="animate-fadeIn opacity-0"
                                style={{ animationDelay: delay }} // Apply delay as an inline style
                            >
                                <hr className="solid border-t-2" />
                                <div className="flex mt-1 mb-1">
                                    <img className="w-8 mr-2" src="/websiteUI/document-icon.png" alt="icon" />
                                    <Link className="text-2xl font-bold overflow-hidden" href={`/${documentPath}`} target="_blank">
                                        {document}
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}

                <div
                    className="animate-fadeIn opacity-0"
                    style={{ animationDelay: `${totalItems * 50}ms` }} // Delay after all documents
                >
                    <hr className="solid border-t-2" />
                </div>
            </ul>
        </div>
    );
};

export default DocumentList;

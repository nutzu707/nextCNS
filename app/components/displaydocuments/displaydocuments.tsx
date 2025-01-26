// app/components/documents-list.tsx

import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import React from "react";

interface DocumentsListProps {
    folderPath: string;
}

const DocumentList = async ({ folderPath }: DocumentsListProps) => {
    let documentFiles: string[] = [];

    try {
        const files = await fs.promises.readdir(folderPath);

        documentFiles = files;
    } catch (error) {
        console.error('Error reading documents:', error);
        documentFiles = [];
    }

    const totalItems = documentFiles.length ;
    return (
        <div>
            <ul>
                {documentFiles.length === 0 ? (
                    <li></li>
                ) : (
                    documentFiles.map((document, index) => {
                        const documentPath = path.join('api/assets/documents', path.basename(folderPath), document);
                        const delay = `${index * 50}ms`;

                        return (
                            <div
                                key={index}
                                className="animate-fadeIn opacity-0"
                                style={{ animationDelay: delay }}
                            >
                                <hr className="solid border-t-2" />
                                <div className="flex mt-1 lg:mb-1">
                                    <img className="lg:w-8 w-6 lg:h-8 h-6 mr-2" src="/websiteUI/document-icon.png" alt="icon" />
                                    <Link className="lg:text-2xl text-xl font-bold break-all" href={`/${documentPath}`} target="_blank">
                                        {document}
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}

                <div
                    className="animate-fadeIn opacity-0"
                    style={{ animationDelay: `${totalItems * 50}ms` }}
                >
                    <hr className="solid border-t-2" />
                </div>
            </ul>
        </div>
    );
};

export default DocumentList;

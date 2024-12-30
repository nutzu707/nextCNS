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

const DocumentsListDash = async ({ folderPath }: DocumentsListProps) => {
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


    return (
        <div>
            <ul>
                {documentFiles.length === 0 ? (
                    <li>No documents available</li>
                ) : (
                    documentFiles.map((document, index) => {
                        const documentPath = path.join(path.basename(folderPath), document);



                        return (
                            <li key={index}>
                                {/* Generate correct relative link */}
                                <Link href={`/${documentPath}`}>{document}</Link>
                                <Archivebutton firstFolder={folderPath} fileName={document}></Archivebutton>
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
};

export default DocumentsListDash;

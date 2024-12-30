// app/proiecte/page.tsx

import fs from 'fs';
import path from 'path';
import React from 'react';
import PageTitle from "@/app/components/pagetitle/pagetitle";
import PageBody from "@/app/components/pagebody/pagebody";
import Footer from "@/app/components/footer/footer";

// Utility to calculate luminance and determine text color
const getContrastingTextColor = (bgColor: string): string => {
    // Remove the '#' symbol if present
    if (bgColor.startsWith("#")) {
        bgColor = bgColor.substring(1);
    }

    // Convert hex color to RGB
    const r = parseInt(bgColor.substring(0, 2), 16);
    const g = parseInt(bgColor.substring(2, 4), 16);
    const b = parseInt(bgColor.substring(4, 6), 16);

    // Calculate luminance (relative luminance formula)
    const luminance = 0.2126 * (r / 255) ** 2.2 + 0.7152 * (g / 255) ** 2.2 + 0.0722 * (b / 255) ** 2.2;

    // Return black or white depending on luminance
    return luminance > 0.5 ? "text-black" : "text-white";
};

// Utility to ensure the link has the proper protocol (http/https)
const ensureProtocol = (url: string): string => {
    if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`; // If no protocol, add https:// as default
    }
    return url;
};

export default async function Proiecte() {
    const projectsDirectory = path.join(process.cwd(), 'public', 'projects');
    const fileNames = fs.readdirSync(projectsDirectory);

    const projects = await Promise.all(
        fileNames.map(async (fileName) => {
            const filePath = path.join(projectsDirectory, fileName);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const projectData = JSON.parse(fileContents);
            return projectData;
        })
    );

    return (
        <div>
            <PageBody>
                <PageTitle text="PROIECTE" />
                <div className="mt-32 self-center">
                    <div className="space-y-[25px] w-[1000px]">
                        {projects.map((project, index) => {
                            const bgColor = project.project.color; // Background color from JSON
                            const textColor = getContrastingTextColor(bgColor); // Get contrasting text color
                            const link = ensureProtocol(project.project.link); // Ensure the link has the correct protocol

                            return (
                                <a
                                    key={index}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full h-[100px] flex items-center rounded-2xl shadow-2xl cursor-pointer ${textColor}`}
                                    style={{ backgroundColor: bgColor }} // Apply the background color dynamically
                                >
                                    <h1 className="text-5xl font-bold ml-10">
                                        {project.project.title}
                                    </h1>
                                    <img
                                        src={project.project.photo}
                                        alt={project.project.title}
                                        className="h-[95%] ml-auto mr-10"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>
                <Footer />
            </PageBody>
        </div>
    );
}

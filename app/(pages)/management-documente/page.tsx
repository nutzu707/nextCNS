import PageTitle from "@/app/components/pagetitle/pagetitle";
import PageBody from "@/app/components/pagebody/pagebody";
import DocumentList from "@/app/components/displaydocuments/displaydocuments";
import React from "react";
import Footer from "@/app/components/footer/footer";
import {auth} from "@/auth";

export default async function ManagementDocumente() {
    const session = await auth();
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <PageBody>
                <PageTitle text="DOCUMENTE MANAGEMENT"></PageTitle>
                <div className="lg:w-[1000px] w-full self-center mt-16 lg:mt-32 shadow-2xl p-10 rounded-2xl border-2 ">
                    <p className="lg:text-5xl text-3xl font-bold text-indigo-900 mb-4">{currentYear}</p>
                    <DocumentList folderPath="public/documents/documente-management"></DocumentList>
                </div>
                <Footer/>
            </PageBody>

        </div>
    );
}

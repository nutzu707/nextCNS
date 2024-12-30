import PageTitle from "@/app/components/pagetitle/pagetitle";
import PageBody from "@/app/components/pagebody/pagebody";
import DocumentList from "@/app/components/displaydocuments/displaydocuments";
import React from "react";
import Footer from "@/app/components/footer/footer";

export default function CJEXSalaj() {
    const currentYear = new Date().getFullYear();

    return (
        <div>
            <PageBody>
                <PageTitle text="CJEX Sălaj"></PageTitle>
                <div className="w-[1000px] self-center mt-32 shadow-2xl p-10 rounded-2xl border-2">
                    <p className="text-5xl font-bold text-indigo-900 mb-4">{currentYear}</p>
                    <DocumentList folderPath="public/documents/cjex-salaj"></DocumentList>
                    <hr className="solid border-t-2" />
                </div>
                <Footer/>

            </PageBody>

        </div>
    );
}

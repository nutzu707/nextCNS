"use client"

import PageBody from "@/app/components/pagebody/pagebody";
import NewsArticleDisplay from "@/app/components/newsarticledisplay/newsarticledisplay";
import React from "react";
import { useSearchParams } from 'next/navigation'

export default function Anunt() {
    const searchParams = useSearchParams()

    const id = searchParams.get('id') || ""

    return (
        <div>
            <PageBody>
                <NewsArticleDisplay anunt={id} />
            </PageBody>
        </div>
    );
}

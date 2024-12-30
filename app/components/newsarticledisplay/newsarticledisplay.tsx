"use client";

import { useEffect, useState } from 'react';
import Footer from "@/app/components/footer/footer";
import PageBody from "@/app/components/pagebody/pagebody";

type ContentItem = {
    type: 'paragraph' | 'image';
    text?: string;
    url?: string; // For remote image links
    imageData?: string; // For locally uploaded images (Base64)
    caption?: string;
};

type Article = {
    title: string;
    post_date: string;
    thumbnail: string;
    content: ContentItem[];
};

const NewsArticleDisplay = ({ anunt }: { anunt: string }) => {
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/news/${anunt}.json`);
                const data = await response.json();
                setArticle(data.article);
            } catch (error) {
                console.error('Error loading the article:', error);
            }
        };

        fetchArticle();
    }, [anunt]);

    if (!article) return <p>Loading article...</p>;

    return (
        <div>
            <PageBody>
                <div className="w-[725px] self-center">
                    <h1 className="text-5xl mt-32 font-bold">{article.title}</h1>
                    <p className="text-sm font-bold text-gray-500 mt-4">{new Date(article.post_date).toLocaleDateString()}</p>
                    <img

                        src={article.thumbnail}
                        alt={`${article.title} thumbnail`}
                        className="mt-4 w-[725px] h-[405px] rounded-xl shadow-xl border border-solid object-cover mb-8"
                    />
                    <div className="article-content">
                        {article.content.map((item, index) => {
                            if (item.type === 'paragraph') {
                                return (
                                    <p key={index} className="text-xl mt-4">
                                        {item.text}
                                    </p>
                                );
                            } else if (item.type === 'image') {
                                return (
                                    <div key={index} className="article-image">
                                        <img
                                            src={item.imageData || item.url} // Use imageData first, fallback to URL
                                            alt={item.caption || `Image ${index}`}
                                            className="mt-4 w-[725px] h-[405px] rounded-xl shadow-xl border border-solid object-cover"

                                        />
                                        {item.caption && <p className="text-sm font-bold text-gray-500 mt-1">{item.caption}</p>}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
                <Footer></Footer>
                </PageBody>
        </div>
    );
};

export default NewsArticleDisplay;

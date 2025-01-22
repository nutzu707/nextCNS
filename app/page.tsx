import fs from 'fs';
import path from 'path';
import PageBody from "@/app/components/pagebody/pagebody";
import PageTitle from "@/app/components/pagetitle/pagetitle";
import NewsBox from "@/app/components/newsbox/newsbox";
import Footer from "@/app/components/footer/footer";
import {Button} from "@/components/ui/button";
import {auth} from "@/auth";

async function getNewsItems() {
    const newsDirectory = path.join(process.cwd(), 'public', 'news');

    const fileNames = fs.readdirSync(newsDirectory);

    const newsItems = fileNames.map((fileName) => {
        const filePath = path.join(newsDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);

        const { title, post_date, thumbnail } = jsonData.article;

        return {
            title,
            date: post_date,
            image: thumbnail,
            link: `/anunt?id=${fileName.replace('.json', '')}`, // Example link
        };
    });

    return newsItems;
}

export default async function Home() {
    const session = await auth();

    const newsItems = await getNewsItems();

    return (
        <div>
            <PageBody>
                <div className="motion-safe:animate-fadeUp group">
                    <div className="bg-[url('/websiteUI/schita-liceu-blurred.jpg')] bg-cover bg-right w-full flex h-[500px] rounded-2xl mt-48 shadow-2xl border-solid border-2 lg:bg-[url('/websiteUI/schita-liceu.jpg')] ">
                        <div className="w-full mt-32 justify-center text-center lg:text-left lg:ml-16 lg:w-[470px]">
                            <h1 className="text-3xl font-bold md:text-5xl">
                                COLEGIUL NAȚIONAL
                            </h1>
                            <h1 className="text-7xl font-bold text-indigo-900 -mt-2 md:text-8xl">
                                SILVANIA
                            </h1>
                            <h1 className="text-lg font-bold -mt-1 md:text-2xl">
                                Performanță și excelență prin integrarea tradiției în modernitate!
                            </h1>
                            <a href="/prezentare" className="self-center">
                                <Button className="text-xl rounded-md shadow-xl bg-white text-black border-2 border-solid hover:bg-gray-200 font-bold mt-8">Prezentare</Button>
                            </a>
                        </div>
                    </div>
                </div>





                <div id="anunturi"></div>
                <PageTitle text="ANUNȚURI" />
                <NewsBox newsItems={newsItems}/>

                <Footer />
            </PageBody>
        </div>
    );
}

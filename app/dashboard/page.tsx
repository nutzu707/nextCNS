import { auth } from "@/auth";
import PageBody from "@/app/components/pagebody/pagebody";
import PageTitle from "@/app/components/pagetitle/pagetitle";
import {handleSignOut} from "@/app/actions/authActions";
import {Button} from "@/components/ui/button";
import Footer from "@/app/components/footer/footer";
import {promises as fs} from "fs";
import DocumentsListDash from "@/app/components/displaydocumentsdash/displaydocumentsdash";
import CreateProjectJsonFile from "@/app/components/createproject/createproject";
import CreateConducerePersonJsonFile from "@/app/components/modifyconducere/modifyconducere";
import CreateConsiliuPersonJsonFile from "@/app/components/modifyconsiliu/modifyconsiliu";
import React from "react";
import RefreshButton from "@/app/components/refreshbutton/refreshbutton";
import CreateNews from "@/app/components/createnewsarticle/createnewsarticle";
import Navbardashboard from "@/app/components/navbardashboard/navbardashboard";
import Restartbutton from "@/app/components/restartbutton/restartbutton";

export default async function Dashboard() {

    const session = await auth();

    async function action(formData: FormData){
        "use server";
        const file= formData.get("file") as File;
        const collection = formData.get("collection") as string;

        console.log(file);
        console.log(collection);

        if (!file || file.size===0){
            return {error:"No file uploaded"};
        }

        const data = await file.arrayBuffer();
        await fs.writeFile(`${process.cwd()}/public/${collection}/${file.name}`, Buffer.from(data));

    }

        return (
        <div>

            <PageBody>
                <PageTitle text="DASHBOARD"></PageTitle>
                <h1>soon</h1>
                <div className="h-20 hidden bg-white lg:flex fixed bottom-0 self-center z-50 hidden">
                    <div className="flex h-16 rounded-xl border-2 shadow-2xl justify-center items-center px-3">
                        <Navbardashboard/>
                        <form action={handleSignOut}>
                            <Button className="text-xl ml-3 rounded-md shadow-xl bg-red-500 text-white  border-2 border-solid hover:bg-red-600 font-bold" variant="default" type="submit">
                                SIGN OUT
                            </Button>
                        </form>

                    </div>
                </div>

                <div className="lg:w-[1000px] w-full self-center mt-32 shadow-2xl p-10 rounded-2xl border-2 text-2xl font-bold" id="management">
                    <p className="lg:text-5xl text-3xl font-bold text-indigo-900 mb-4">DOCUMENTE MANAGEMENT</p>
                    <form action={action}>
                        <div className="flex flex-col lg:flex-row w-full">
                            <input className=" file:bg-white bg-none file:cursor-pointer file:border-gray-300 file:clear-start file:border-2  file:rounded-md file:hover:bg-gray-200 file:shadow-xl file:text-xl " type="file" name="file"/>
                            <input hidden type="text" name="collection" defaultValue="documents/documente-management" />
                            <div className=" mr-0  flex ml-auto mt-1 lg:mt-0">
                                <Button className="text-xl rounded-md shadow-xl bg-white text-black border-2 border-solid hover:bg-gray-200 font-bold mb-8 mr-2 ">Upload</Button>
                                <RefreshButton/>
                            </div>
                        </div>
                        <div className="h-[300px] overflow-y-scroll pr-5">
                            <DocumentsListDash folderPath={'public/documents/documente-management'} />
                            <hr className="solid border-t-2" />
                        </div>
                    </form>
                </div>
                <div className="lg:w-[1000px] w-full self-center mt-16 shadow-2xl p-10 rounded-2xl border-2 text-2xl font-bold" id="elevi">
                    <p className="lg:text-5xl text-3xl font-bold text-indigo-900 mb-4">DOCUMENTE ELEVI</p>
                    <form action={action}>
                        <div className="flex flex-col lg:flex-row w-full">
                            <input className=" file:bg-white bg-none file:cursor-pointer file:border-gray-300 file:clear-start file:border-2  file:rounded-md file:hover:bg-gray-200 file:shadow-xl file:text-xl " type="file" name="file"/>
                            <input hidden type="text" name="collection" defaultValue="documents/documente-elevi" />
                            <div className=" mr-0  flex ml-auto mt-1 lg:mt-0">
                                <Button className="text-xl rounded-md shadow-xl bg-white text-black border-2 border-solid hover:bg-gray-200 font-bold mb-8 mr-2 ">Upload</Button>
                                <RefreshButton/>
                            </div>
                        </div>
                        <div className="h-[300px] overflow-y-scroll pr-5">
                            <DocumentsListDash folderPath={'public/documents/documente-elevi'}/>
                            <hr className="solid border-t-2" />
                        </div>
                    </form>
                </div>
                <div className="lg:w-[1000px] w-full self-center mt-16 shadow-2xl p-10 rounded-2xl border-2 text-2xl font-bold" id="profesori">
                    <p className="lg:text-5xl text-3xl font-bold text-indigo-900 mb-4">DOCUMENTE PROFESORI</p>
                    <form action={action}>
                        <div className="flex flex-col lg:flex-row w-full">
                            <input className=" file:bg-white bg-none file:cursor-pointer file:border-gray-300 file:clear-start file:border-2  file:rounded-md file:hover:bg-gray-200 file:shadow-xl file:text-xl " type="file" name="file"/>
                            <input hidden type="text" name="collection" defaultValue="documents/documente-profesori" />
                            <div className=" mr-0  flex ml-auto mt-1 lg:mt-0">
                                <Button className="text-xl rounded-md shadow-xl bg-white text-black border-2 border-solid hover:bg-gray-200 font-bold mb-8 mr-2 ">Upload</Button>
                                <RefreshButton/>
                            </div>
                        </div>
                        <div className="h-[300px] overflow-y-scroll pr-5">
                            <DocumentsListDash folderPath={'public/documents/documente-profesori'}/>
                            <hr className="solid border-t-2" />
                        </div>
                    </form>
                </div>


                <div className="lg:w-[1000px] w-full self-center mt-16 shadow-2xl p-10 rounded-2xl border-2 text-2xl font-bold" id="cjex">
                    <p className="lg:text-5xl text-3xl font-bold text-indigo-900 mb-4">CJEX SALAJ</p>
                    <form action={action}>
                        <div className="flex flex-col lg:flex-row w-full">
                            <input className=" file:bg-white bg-none file:cursor-pointer file:border-gray-300 file:clear-start file:border-2  file:rounded-md file:hover:bg-gray-200 file:shadow-xl file:text-xl " type="file" name="file"/>
                            <input hidden type="text" name="collection" defaultValue="documents/cjex-salaj" />
                            <div className=" mr-0  flex ml-auto mt-1 lg:mt-0">
                                <Button className="text-xl rounded-md shadow-xl bg-white text-black border-2 border-solid hover:bg-gray-200 font-bold mb-8 mr-2 ">Upload</Button>
                                <RefreshButton/>
                            </div>
                        </div>
                        <div className="h-[300px] overflow-y-scroll pr-5">
                            <DocumentsListDash folderPath={'public/documents/cjex-salaj'}/>
                            <hr className="solid border-t-2" />
                        </div>
                    </form>
                </div>

                <div className="lg:w-[1000px] w-full self-center mt-16 shadow-2xl p-10 rounded-2xl border-2 text-2xl font-bold" id="arhiva-foto">
                    <p className="lg:text-5xl text-3xl font-bold text-indigo-900 mb-4">ARHIVA FOTO</p>
                    <form action={action}>
                        <div className="flex flex-col lg:flex-row w-full">
                            <input accept="image/*" className=" file:bg-white bg-none file:cursor-pointer file:border-gray-300 file:clear-start file:border-2  file:rounded-md file:hover:bg-gray-200 file:shadow-xl file:text-xl " type="file" name="file"/>
                            <input hidden type="text" name="collection" defaultValue="arhiva-foto" />
                            <div className=" mr-0  flex ml-auto mt-1 lg:mt-0">
                                <Button className="text-xl rounded-md shadow-xl bg-white text-black border-2 border-solid hover:bg-gray-200 font-bold mb-8 mr-2 ">Upload</Button>
                                <RefreshButton/>
                            </div>
                        </div>
                        <div className="h-[300px] overflow-y-scroll pr-5">
                            <DocumentsListDash folderPath={'public/arhiva-foto'}/>
                            <hr className="solid border-t-2" />
                        </div>
                    </form>
                </div>






                <div className="lg:w-[1000px] w-full self-center mt-16 shadow-2xl p-10 rounded-2xl border-2 text-2xl font-bold" id="anunturi">
                    <p className="lg:text-5xl text-3xl font-bold text-indigo-900 mb-4">ANUNTURI</p>
                    <CreateNews/>
                    <div className="w-full flex justify-end mb-8">
                        <RefreshButton/>
                    </div>
                    <form action={action}>
                        <div className="h-[300px] overflow-y-scroll pr-5">
                            <DocumentsListDash folderPath={'public/news'}/>
                            <hr className="solid border-t-2" />
                        </div>
                    </form>
                </div>

                <div className="lg:w-[1000px] w-full self-center mt-16 shadow-2xl p-10 rounded-2xl border-2 text-2xl font-bold" id="proiecte">
                    <p className="lg:text-5xl text-3xl font-bold text-indigo-900 mb-4">PROIECTE</p>
                    <CreateProjectJsonFile/>
                    <div className="w-full flex justify-end mb-8 mt-8">
                        <RefreshButton/>
                    </div>
                    <form action={action}>
                        <div className="h-[300px] overflow-y-scroll pr-5">
                            <DocumentsListDash folderPath={'public/projects'}/>
                            <hr className="solid border-t-2" />
                        </div>
                    </form>
                </div>

                <div className="lg:w-[1000px] w-full self-center mt-16 shadow-2xl p-10 rounded-2xl border-2 text-2xl font-bold" id="conducere">
                    <p className="lg:text-5xl text-3xl font-bold text-indigo-900 mb-4">CONDUCERE</p>
                    <CreateConducerePersonJsonFile/>
                    <div className="w-full flex justify-end mb-8 mt-8">
                        <RefreshButton/>
                    </div>
                    <form action={action}>
                        <div className="h-[300px] overflow-y-scroll pr-5 ">
                            <DocumentsListDash folderPath={'public/conducere'}/>
                            <hr className="solid border-t-2" />
                        </div>
                    </form>
                </div>


                <div className="lg:w-[1000px] w-full self-center mt-16 shadow-2xl p-10 rounded-2xl border-2 text-2xl font-bold" id="consiliu">
                    <p className="lg:text-5xl text-3xl font-bold text-indigo-900 mb-4">CONSILIU DE ADMINISTRATIE</p>
                    <CreateConsiliuPersonJsonFile/>
                    <div className="w-full flex justify-end mb-8 mt-8">
                        <RefreshButton/>
                    </div>
                    <form action={action}>
                        <div className="h-[300px] overflow-y-scroll pr-5 ">
                            <DocumentsListDash folderPath={'public/consiliu-de-administratie'}/>
                            <hr className="solid border-t-2" />
                        </div>
                    </form>
                </div>

                <div className="mt-32"></div>


            </PageBody>
        </div>
    );
}

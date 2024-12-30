import { auth } from "@/auth";
import PageBody from "@/app/components/pagebody/pagebody";
import PageTitle from "@/app/components/pagetitle/pagetitle";
import {handleSignOut} from "@/app/actions/authActions";
import {Button} from "@/components/ui/button";
import Footer from "@/app/components/footer/footer";
import {promises as fs} from "fs";
import DocumentsListDash from "@/app/components/displaydocumentsdash/displaydocumentsdash";
import CreateJsonFile from "@/app/components/createnewsarticle/createnewsarticle";
import CreateProjectJsonFile from "@/app/components/createproject/createproject";
import CreatePersonJsonFile from "@/app/components/modifyconducere/modifyconducere";
import CreateConducerePersonJsonFile from "@/app/components/modifyconducere/modifyconducere";
import CreateConsiliuPersonJsonFile from "@/app/components/modifyconsiliu/modifyconsiliu";

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
                <div className="border-t-2 mt-32 text-3xl font-bold">
                    <h1>DOCUMENTE MANAGEMENT</h1>
                    <form action={action}>
                        <input type="file" name="file"/>
                        <input hidden type="text" name="collection" defaultValue="documents/documente-management" />
                        <Button>Upload</Button>

                        <DocumentsListDash folderPath={'public/documents/documente-management'}/>
                    </form>

                </div>
                <div className="border-t-2 mt-32 text-3xl font-bold">
                    <h1>DOCUMENTE ELEVI</h1>
                    <form action={action}>
                        <input type="file" name="file"/>
                        <input hidden type="text" name="collection" defaultValue="documents/documente-elevi" />
                        <Button>Upload</Button>

                        <DocumentsListDash folderPath={'public/documents/documente-elevi'}/>

                    </form>


                </div>
                <div className="border-t-2 mt-32 text-3xl font-bold">
                    <h1>DOCUMENTE PROFESORI</h1>
                    <form action={action}>
                        <input type="file" name="file"/>
                        <input hidden type="text" name="collection" defaultValue="documents/documente-profesori" />
                        <Button>Upload</Button>

                        <DocumentsListDash folderPath={'public/documents/documente-profesori'}/>

                    </form>
                </div>
                <div className="border-t-2 mt-32 text-3xl font-bold">
                    <h1>CJEX SALAJ</h1>
                    <form action={action}>
                        <input type="file" name="file"/>
                        <input hidden type="text" name="collection" defaultValue="documents/cjex-salaj" />
                        <Button>Upload</Button>

                        <DocumentsListDash folderPath={'public/documents/cjex-salaj'}/>

                    </form>
                </div>
                <div className="border-t-2 mt-32 text-3xl font-bold">
                    <h1>ARHIVA FOTO</h1>
                    <form action={action}>
                        <input type="file" name="file" accept="image/*" />
                        <input hidden type="text" name="collection" defaultValue="arhiva-foto" />
                        <Button>Upload</Button>

                        <DocumentsListDash folderPath={'public/arhiva-foto'}/>
                    </form>
                </div>

                <div className="mt-32 text-3xl font-bold border-t-2">
                    <CreateJsonFile/>
                    <form action={action}>
                        <DocumentsListDash folderPath={'public/news'}/>
                    </form>

                </div>

                <div className="mt-32 text-3xl font-bold border-t-2">
                    <CreateProjectJsonFile/>
                    <form action={action}>
                        <DocumentsListDash folderPath={'public/projects'}/>
                    </form>
                </div>

                <div className="mt-32 text-3xl font-bold border-t-2">
                    <CreateConducerePersonJsonFile/>
                    <form action={action}>
                        <DocumentsListDash folderPath={'public/conducere'}/>
                    </form>
                </div>

                <div className="mt-32 text-3xl font-bold border-t-2">
                    <CreateConsiliuPersonJsonFile/>
                    <form action={action}>
                        <DocumentsListDash folderPath={'public/consiliu-de-administratie'}/>
                    </form>
                </div>


                <form action={handleSignOut}>
                    <Button className="text-xl mt-20 rounded-md shadow-xl bg-white text-black border-2 border-solid hover:bg-gray-200  font-bold" variant="default" type="submit">
                        SIGN OUT
                    </Button>

                </form>
                <Footer/>
            </PageBody>
        </div>
    );
}

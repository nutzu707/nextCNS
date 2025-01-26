import PageTitle from "@/app/components/pagetitle/pagetitle";
import PageBody from "@/app/components/pagebody/pagebody";
import Footer from "@/app/components/footer/footer";
import fs from 'fs';
import path from 'path';
import {auth} from "@/auth";

export default async function ConsiliuDeAdministratie() {
    const session = await auth();

    const directoryPath = path.join(process.cwd(), 'public', 'consiliu-de-administratie');
    const files = fs.readdirSync(directoryPath);

    const people = files
        .filter(file => file.endsWith('.json'))
        .map(file => {
            const filePath = path.join(directoryPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const parsedData = JSON.parse(fileContent);
            return parsedData.person;
        });

    people.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div>
            <PageBody>
                <PageTitle text="CONSILIU DE ADMINISTRATIE"></PageTitle>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 place-items-center">
                    {people.map((person, index) => (
                        <div key={index} className="text-center mt-16 lg:mt-32">
                            <img
                                className="w-[300px] rounded-full border-2 h-[300px] object-cover shadow-2xl"
                                src={person.photo}
                                alt={person.name}
                            />
                            <p className="font-bold text-3xl mt-4 uppercase">{person.name}</p>
                            <p className="font-bold text-xl text-indigo-900 uppercase">{person.position}</p>
                        </div>
                    ))}
                </div>
                <Footer />
            </PageBody>
        </div>
    );
}

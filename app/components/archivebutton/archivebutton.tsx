
import React from "react";
import {Button} from "@/components/ui/button";
import {promises as fs} from "fs";
import path from "path";

const archiveButton = ({firstFolder, fileName}: { firstFolder: string; fileName: string }) => {


    async function functie2(oldPath, newPath){
        "use server";
        var fs = require('fs')
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err
            console.log('Successfully renamed - AKA moved!')
        })
    }
    async function functie(){
        "use server";


        var oldPath=firstFolder+'/'+fileName;
        var newPath='public/archive/' +fileName;
        console.log(oldPath)
        console.log(newPath)
        functie2(oldPath,newPath);



    }

    return (
        <div>
            <div className="relative inline-flex group">
                <div>
                    <Button>Archive</Button>
                </div>
                <div className=" group-hover:opacity-100 group-hover:block opacity-0 hidden transition-opacity">
                    <div>
                        <Button formAction={functie}  className="ml-4">Confirm</Button>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default archiveButton;

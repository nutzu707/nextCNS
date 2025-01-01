import React from 'react';
import NavbarButton from "@/app/components/navbarbutton/navbarbutton";

const Navbar = () => {
    const managementOptions = [
        { title: "Documente", link: "/management-documente" },
        { title: "Conducere", link: "/conducere" },
        { title: "Consiliu de administratie", link: "/consiliu-de-administratie" },
        { title: "Arhiva Foto", link: "/arhiva-foto" },

    ];
    const eleviOptions = [
        { title: "Documente", link: "/elevi-documente" },
        { title: "Orar", link: "/documents/websitedocs/orar_clase_2024-2025.pdf" },
        { title: "Premii", link: "/documents/websitedocs/rezultate-cns.pdf" },
        { title: "CJEX Sălaj", link: "/cjex-salaj" },


    ];
    const profesoriOptions = [
        { title: "Documente", link: "/profesori-documente" },
        { title: "Consiliu Profesoral", link: "/consiliu-profesoral" },
        { title: "Catedre", link: "/catedre" },
        { title: "Diriginti", link: "/diriginti" },

    ];

    return (
        <div className="p-4 border-b-[#E5E7EB] border-solid border-b-2 flex fixed bg-white w-full items-center justify-center z-10">
            <div>
                <a href="/">
                    <img
                        src="/websiteUI/logo.png"
                        alt="Logo"
                        className="min-w-10 w-4 p-0 z-20 mr-5 -mb-2"
                        style={{ imageRendering: 'crisp-edges' }}
                    />

                </a>
            </div>
            <div className="hidden lg:block">
                <NavbarButton title="PREZENTARE" link="/prezentare" />
                <NavbarButton title="MANAGEMENT" options={managementOptions} />
                <NavbarButton title="ELEVI" options={eleviOptions} />
                <NavbarButton title="PROFESORI" options={profesoriOptions} />
                <NavbarButton title="EXAMENE" link="/examene" />
                <NavbarButton title="PROIECTE" link="/proiecte" />
                <NavbarButton title="CONTACT" link="/contact" />
            </div>
            <div className="flex lg:hidden mr-0 ml-auto">
                <button className="justify-end mr-0 ml-auto"><img src="/websiteUI/burger-menu-icon.svg" alt="BurgerIcon"/></button>
            </div>
        </div>
    );
};

export default Navbar;

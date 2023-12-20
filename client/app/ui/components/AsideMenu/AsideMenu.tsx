import Image from "next/image";
import Link from "next/link";
import MenuYear from "./MenuYear";

export default function AsideMenu() {

    //JSX
    return (
        <aside className="sticky top-0 flex-col bg-dark-blue h-screen w-[290px]">
            <header className="sticky top-0 py-6 px-[24px]">
                <Link
                    href='/'
                    className="flex items-end gap-2 no-underline"
                >
                    <Image
                        alt="Finances Logo"
                        src='/images/logo/finance-logo.svg'
                        width={45}
                        height={45}
                        className="w-[45px]"
                    />
                    <h1 className="text-3xl text-white font-bold">
                        Finances
                    </h1>
                </Link>
            </header>
            <nav className="mt-5 py-4 px-4">
                {/* YEARS */}
                <div className="w-full flex-col gap-4">
                    <div className="w-full flex gap-2 items-end ml-4 mb-4">
                        <Image
                            alt="Years Icon"
                            src='/images/asideMenu/years-logo.svg'
                            width={18}
                            height={18}
                            className="w-[18px] py-1"
                        />
                        <h3 className="text-s font-semibold text-menu-title">
                            YEARS
                        </h3>
                    </div>
                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                        <MenuYear />
                    </ul>
                    <div></div>
                </div>
            </nav>
        </aside>
    )
}

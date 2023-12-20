'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function MenuYear() {

    //PATHNAME
    const pathname = usePathname();

    //JSX
    return (
        <li>
            <Link
                href='/summary/2023'
                className={`flex px-4 py-2 font-medium text-menu-title no-underline ${pathname.split('/').includes('2023') ? 'bg-menu-item-selected' : undefined}`}
            >
                2023
            </Link>
        </li>
    )
}


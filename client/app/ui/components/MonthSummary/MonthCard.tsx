'use client'

import { currencyFormmatting } from "@/app/utils/businessInfo"
import Image from "next/image"
import { useState } from "react"
import MonthCardSubcategory from "./MonthCardSubcategory";

interface MonthCardProps {
    recordType: RecordType,
    category: any 
    categoryName: any
}

export default function MonthCard({
    recordType,
    category,
    categoryName
}:MonthCardProps) {

    const [isTabOpen, setIsTabOpen] = useState<boolean>(false);

    //JSX
    return (
        <li className="flex flex-col w-[375px]">
            {/* TRIGGER */}
            <div 
                className="flex justify-between gap-6 items-center py-3 px-5 bg-white border-[1px] border-solid border-dark-blue rounded-tl-md rounded-tr-md cursor-pointer hover:bg-green-100"
                onClick={() => setIsTabOpen(!isTabOpen)}
            >
                <div>
                    <h5 className="text-dark-blue text-xl font-semibold">
                        {categoryName}
                    </h5>
                </div>
                <div className="flex gap-2">
                    <span className="text-black text-xl">
                        ${currencyFormmatting(category.total)}
                    </span>
                    <Image 
                        alt="Down arrow"
                        src="/images/icons/down-arrow.svg"
                        width={18}
                        height={18}
                    />
                </div>
            </div>
            {/* DETAILS */}
            <ul
                className="flex- flex-col gap-2 transition-all duration-500 bg-white border-[1px] border-solid border-dark-blue overflow-hidden"
                style={{
                    maxHeight: isTabOpen ? 'none' : '0px',
                    border: isTabOpen ? 'solid 1px #1c2434' : 'none'
                }}
            >
                {
                    Object.keys(category.subcategories).map((subcategory: any) => {
                        return (
                            <MonthCardSubcategory
                                key={subcategory}
                                recordType={recordType}
                                subcategory={category.subcategories[subcategory]}
                                subcategoryRecords={category.subcategories[subcategory].records}
                                subcategoryName={subcategory}
                                categoryName={categoryName}
                            />
                        )
                    })
                }
            </ul>
        </li>
    )
}

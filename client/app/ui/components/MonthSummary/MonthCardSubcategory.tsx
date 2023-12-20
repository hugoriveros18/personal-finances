'use client'

import { currencyFormmatting } from "@/app/utils/businessInfo"
import { createPortal } from 'react-dom';
import { useState } from "react"
import CreateMonthRecordModal from "./CreateMonthRecordModal";
import MonthRecordsSummaryModal from "./MonthRecordsSummaryModal";
import Image from "next/image"

interface MonthCardSubcategoryProps {
    recordType: RecordType
    subcategory: any
    subcategoryRecords: any[]
    subcategoryName: string
    categoryName: string
}

export default function MonthCardSubcategory({
    recordType,
    subcategory,
    subcategoryRecords,
    subcategoryName,
    categoryName
}:MonthCardSubcategoryProps) {

    //STATES
    const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    
    //JSX
    return (
        <>
            <li className="flex justify-between gap-6 p-3 m-3 border-solid border-[1px] border-dark-blue">
                <div>
                    <p className="font-semibold base">
                        {subcategoryName}
                    </p>
                    <p className="font-semibold base">
                        ${currencyFormmatting(subcategory.total)}
                    </p>
                </div>
                <div className="flex gap-1 items-start">
                    <Image
                        alt="Create Record"
                        src="/images/icons/add-new.svg"
                        width={25}
                        height={25}
                        onClick={() => setShowCreateModal(true)}
                        className="cursor-pointer"
                    />
                    <Image
                        alt="Records summary"
                        src="/images/icons/records-summary.svg"
                        width={25}
                        height={25}
                        onClick={() => setShowSummaryModal(true)}
                        className="cursor-pointer"
                    />
                    {/* <Image
                        alt="Delete Record"
                        src="/images/icons/delete-element.svg"
                        width={25}
                        height={25}
                    /> */}
                </div>
            </li>
            {
                showCreateModal ? (
                    createPortal(
                        <CreateMonthRecordModal
                            recordType={recordType}
                            categoryName={categoryName}
                            subcategoryName={subcategoryName}
                            setShowCreateModal={setShowCreateModal}
                        />,
                        document.body
                    ) 
                ) : (
                    null
                )
            }
            {
                showSummaryModal ? (
                    createPortal(
                        <MonthRecordsSummaryModal 
                            recordType={recordType}
                            categoryName={categoryName}
                            subcategoryTotal={`$${currencyFormmatting(subcategory.total)}`}
                            subcategoryRecords={subcategoryRecords}
                            subcategoryName={subcategoryName}
                            setShowSummaryModal={setShowSummaryModal}
                        />,
                        document.body
                    ) 
                ) : (
                    null
                )
            }
        </>
    )
}

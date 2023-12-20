'use client'

import { currencyFormmatting } from "@/app/utils/businessInfo"
import Image from "next/image"
import { useContext, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form";
import { Context } from "@/app/context/AppContextProvider";

interface CreateMonthRecordModalProps {
    recordType: RecordType,
    subcategoryRecords: any[],
    subcategoryTotal: string,
    categoryName: string
    subcategoryName: string
    setShowSummaryModal: (newState: boolean) => void
}

export default function MonthRecordsSummaryModal({
    recordType,
    subcategoryRecords,
    subcategoryTotal,
    categoryName,
    subcategoryName,
    setShowSummaryModal
}:CreateMonthRecordModalProps) {


    //EFFECTS
    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        body.style.overflow = 'hidden'

        return () => {body.style.overflow = 'initial'}
    },[])

    //JSX
    return (
        <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative flex flex-col bg-white rounded-md p-8">
                <h6 className="text-center text-xl font-bold text-dark-blue mb-4">
                    MONTH RECORDS
                </h6>
                <Image
                    alt="Close modal"
                    src="/images/icons/close-element.svg"
                    width={30}
                    height={30}
                    onClick={() => setShowSummaryModal(false)}
                    className="cursor-pointer absolute top-3 right-3 opacity-80 transition-opacity duration-300 hover:opacity-100"
                />
                <div className="flex flex-col mb-2">
                    <p className="text-lg font-bold text-dark-blue">
                        Category: <span className="font-normal text-black ml-1">{categoryName}</span>
                    </p>
                    <p className="text-lg font-bold text-dark-blue">
                        Subcategory: <span className="font-normal text-black ml-1">{subcategoryName}</span>
                    </p>
                    <p className="text-lg font-bold text-dark-blue">
                        Total: <span className="font-normal text-black ml-1">{subcategoryTotal}</span>
                    </p>
                </div>
                <table className="min-w-[500px]">
                    <tr>
                        <th className="text-red-600">Date</th>
                        <th className="text-red-600">Description</th>
                        <th className="text-red-600">Value</th>
                        <th></th>
                    </tr>
                    {
                        subcategoryRecords.map((record) => {
                            return (
                                <MonthRecordRow
                                    key={record.id}
                                    categoryName={categoryName}
                                    subcategoryName={subcategoryName}
                                    recordType={recordType}
                                    subcategoryRecord={record}
                                />
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

interface MonthRecordRowProps {
    recordType: RecordType,
    subcategoryRecord: any,
    categoryName: string
    subcategoryName: string
}


function MonthRecordRow({
    recordType,
    categoryName,
    subcategoryName,
    subcategoryRecord
}:MonthRecordRowProps) {

    // //STATES
    // const [isEditionActive, setIsEditionActive] = useState<boolean>(false);

    // //FORM
    // const {
    //     register,
    //     handleSubmit, 
    //     formState:{
    //         errors 
    //     },
    //     watch
    // } = useForm({
    //     defaultValues: {
    //         description: subcategoryRecord.description,
    //         value: subcategoryRecord.value
    //     }
    // });

    // // CONTEXT
    const { fetchDeleteRecord } = useContext(Context);

    // //FORM SUSCRIPTION
    // const valueFormInput = watch('value')

    // //MEMO
    // const valueFormatted = useMemo(() => {
    //     const validNumbers = ['0','1','2','3','4','5','6','7','8','9']
    //     if(validNumbers.includes(valueFormInput[valueFormInput.length-1])) {
    //         const newValue = valueFormInput.split('.').join('').replace('$', '');
    //         return `$${currencyFormmatting(+newValue)}`;
    //     }
        
    //     if(valueFormInput.length > 1) {
    //         const newValue = valueFormInput.slice(0,valueFormInput.length-1)
    //         newValue.split('.').join('')
    //         return `${newValue}`
    //     } else {
    //         return '$0'
    //     }
    // },[valueFormInput])


    //JSX
    return (
        <tr>
            <td className="border-[1px] border-solid border-dark-blue border-collapse p-2 text-center">
                {subcategoryRecord.createdAt}
            </td>
            <td className="border-[1px] border-solid border-dark-blue border-collapse p-2">
                {subcategoryRecord.description}
            </td>
            <td className="border-[1px] border-solid border-dark-blue border-collapse p-2">
                ${currencyFormmatting(+subcategoryRecord.value)}
            </td>
            <td className="border-collapse p-2 flex gap-1 justify-center">
                    <Image
                        alt="Edit record"
                        src="/images/icons/edit-element.svg"
                        width={25}
                        height={25}
                        // onClick={() => setShowSummaryModal(true)}
                        className="cursor-pointer"
                    />
                    <Image
                        alt="Delete record"
                        src="/images/icons/delete-element.svg"
                        width={25}
                        height={25}
                        onClick={() => fetchDeleteRecord(subcategoryRecord.id, categoryName, subcategoryName, recordType)}
                        className="cursor-pointer"
                    />
                {/* <p onClick={() => setIsEditionActive(!isEditionActive)}>Edit</p> */}
            </td>

        </tr>
    )
}


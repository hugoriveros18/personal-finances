'use client'

import useManageRecordCreation from "@/app/hooks/useManageRecordCreation"
import Image from "next/image"

interface CreateMonthRecordModalProps {
    recordType: RecordType,
    categoryName: string
    subcategoryName: string
    setShowCreateModal: (newState: boolean) => void
}

export default function CreateMonthRecordModal({
    recordType,
    categoryName,
    subcategoryName,
    setShowCreateModal
}:CreateMonthRecordModalProps) {

    //FORM STATE
    const {
        register,
        handleSubmit,
        errors,
        fetchCreateRecord,
        valueFormatted
    } = useManageRecordCreation({categoryName, subcategoryName})

    //JSX
    return (
        <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative flex flex-col bg-white rounded-md p-8 w-[350px]">
                <h6 className="text-center text-xl font-bold text-dark-blue mb-2">
                    CREATE RECORD
                </h6>
                <form 
                    onSubmit={handleSubmit(({
                        category,
                        subcategory,
                        description,
                        value
                    }) => {
                        const newValue = value.split('.').join('').split('$').join('')

                        fetchCreateRecord(recordType, category, subcategory, description, +newValue)
                    })}
                    className="flex flex-col gap-2"
                >
                    <label className="flex flex-col gap-1 font-semibold">
                        Category
                        <input 
                            className="bg-gray-400 rounded-sm p-2 text-sm font-normal"  
                            value={categoryName}
                            {...register("category")} 
                            disabled
                        />
                    </label>
                    <label className="flex flex-col gap-1 font-semibold">
                        Subcategory
                        <input 
                            className="bg-gray-400 rounded-sm p-2 text-sm font-normal"  
                            value={subcategoryName}
                            {...register("subcategory")}
                            disabled
                        />
                    </label>
                    <label className="flex flex-col gap-1 font-semibold">
                        Description
                        <textarea
                            className="border-solid border-[1px] border-dark-blue rounded-sm p-2 text-sm font-normal"
                            {...register("description", { required: 'This is required.', minLength: {value: 1, message: 'Min length is 1'}, maxLength: {value: 100, message: 'Max length is 100'} })}
                        />
                        <span className="text-red-600 text-sm">
                            {/* @ts-ignore */}
                            {errors.description?.message}
                        </span>
                    </label>
                    <label className="flex flex-col gap-1 font-semibold">
                        Value
                        <input 
                            className="border-solid border-[1px] border-dark-blue rounded-sm p-2 text-sm font-normal"
                            {...register("value", { required: 'This is required.', minLength: {value: 1, message: 'Min length is 1'} })}
                            value={valueFormatted}
                        />
                    </label>
                    <input className="cursor-pointer" type="submit" value="Guardar"/>
                </form>
                <Image
                    alt="Close modal"
                    src="/images/icons/close-element.svg"
                    width={30}
                    height={30}
                    onClick={() => setShowCreateModal(false)}
                    className="cursor-pointer absolute top-3 right-3 opacity-80 transition-opacity duration-300 hover:opacity-100"
                />
            </div>
        </div>
    )
}



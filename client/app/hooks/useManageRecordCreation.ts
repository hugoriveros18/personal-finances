'use client'

import { useContext, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form";
import { Context } from "@/app/context/AppContextProvider";
import { currencyFormmatting } from "@/app/utils/businessInfo"

interface useManageRecordCreation {
    categoryName: string
    subcategoryName: string
}

export default function useManageRecordCreation({
    categoryName,
    subcategoryName
}: useManageRecordCreation) {

    //FORM
    const {
        register,
        handleSubmit, 
        formState:{
            errors 
        },
        watch
    } = useForm({
        defaultValues: {
            category: categoryName,
            subcategory: subcategoryName,
            description: '',
            value: '$0'
        }
    });

    // CONTEXT
    const { fetchCreateRecord } = useContext(Context);

    //EFFECTS
    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        body.style.overflow = 'hidden'

        return () => {body.style.overflow = 'initial'}
    },[])

    //FORM SUSCRIPTION
    const valueFormInput = watch('value')

    //MEMO
    const valueFormatted = useMemo(() => {
        const validNumbers = ['0','1','2','3','4','5','6','7','8','9']
        if(validNumbers.includes(valueFormInput[valueFormInput.length-1])) {
            const newValue = valueFormInput.split('.').join('').replace('$', '');
            return `$${currencyFormmatting(+newValue)}`;
        }
        
        if(valueFormInput.length > 1) {
            const newValue = valueFormInput.slice(0,valueFormInput.length-1)
            newValue.split('.').join('')
            return `${newValue}`
        } else {
            return '$0'
        }
    },[valueFormInput])

    //RETURN
    return {
        register,
        handleSubmit,
        errors,
        fetchCreateRecord,
        valueFormatted
    }
}


/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useContext, useEffect } from 'react';
import { Context } from '../../../context/AppContextProvider'
import { currencyFormmatting } from "@/app/utils/businessInfo"
import Image from "next/image"
import Link from "next/link"
import ExpenseCard from './ExpenseCard';
import MonthCard from './MonthCard';

interface MonthCardsContainer {
    month: string
    year: string
}

export default function MonthCardsContainer({
    month,
    year
}: MonthCardsContainer) {

    //CONTEXT MANAGEMENT
    const {
        appState: { activeConsolidateMonth },
        updateActiveYear,
        updateActiveMonth
    } = useContext(Context);

    //EFFECTS
    useEffect(() => {
        updateActiveYear(year)
        updateActiveMonth(month)
    },[year, month])

    //JSX
    return (
        <div className="px-10 py-4 mx-auto max-w-[1400px]">
            {/* HEADER */}
            <div className="w-full flex justify-between">
                {/* MONTH SUMMARY */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-4xl font-bold capitalize text-[#6577f3]">
                        {month}
                    </h4>
                    <div>
                        <p className="text-xl text-yellow-600 font-semibold">
                            Available:
                            <span className="ml-2 text-black">
                                {activeConsolidateMonth ? `$${currencyFormmatting(activeConsolidateMonth.income.total - activeConsolidateMonth.expenses.total)} COP` : 'Cargando...'}
                            </span>
                        </p>
                    </div>
                </div>
                {/* BACK BUTTON */}
                <div>
                    <Link
                        href={`/summary/${year}`}
                        className="flex gap-1 group"
                    >
                        <Image
                            alt='Left arrow'
                            src='/images/icons/left-arrow.svg'
                            width={16}
                            height={16}
                        />
                        <p className="group-hover:underline text-dark-blue text-lg font-semibold">
                            All months
                        </p>
                    </Link>
                </div>    
            </div>

            {/* INFORMATION */}
            <main className="w-full flex pt-8 items-start">
                {/* INCOME */}
                <div className="w-2/4 flex flex-col justify-center items-center gap-4">
                    <div>
                        <p className="text-2xl text-green-600 font-semibold">
                            Income:
                            <span className="ml-2 text-black">
                                {activeConsolidateMonth ? `$${currencyFormmatting(activeConsolidateMonth.income.total)} COP` : 'Cargando...'}
                            </span>
                        </p>
                    </div>
                    <ul className="flex flex-col gap-6">
                        {
                            activeConsolidateMonth ? (
                                Object.keys(activeConsolidateMonth.income.categories).map((category: any) => {
                                    return (
                                        <MonthCard
                                            key={category}
                                            recordType='income'
                                            category={activeConsolidateMonth.income.categories[category]}
                                            categoryName={category}
                                        />
                                    )
                                })
                            ) : (
                                null
                            )
                        }
                    </ul>
                </div>
                {/* EXPENSES */}
                <div className="w-2/4 flex flex-col justify-center items-center gap-4">
                    <div>
                        <p className="text-2xl text-red-600 font-semibold">
                            Expenses:
                            <span className="ml-2 text-black">
                                {activeConsolidateMonth ? `$${currencyFormmatting(activeConsolidateMonth.expenses.total)} COP` : 'Cargando...'}
                            </span>
                        </p>
                    </div>
                    <ul className="flex flex-col gap-6">
                        {
                            activeConsolidateMonth ? (
                                Object.keys(activeConsolidateMonth.expenses.categories).map((category: any) => {
                                    return (
                                        <MonthCard
                                            key={category}
                                            recordType='expense'
                                            category={activeConsolidateMonth.expenses.categories[category]}
                                            categoryName={category}
                                        />
                                    )
                                })
                            ) : (
                                null
                            )
                        }
                    </ul>
                </div>
            </main>
        </div>
    )
}

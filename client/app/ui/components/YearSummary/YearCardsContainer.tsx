/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useContext, useEffect } from 'react';
import { Context } from '../../../context/AppContextProvider'
import YearCard from './YearCard';

interface YearCardsContainerProps {
    children: React.ReactNode,
    year: string
}

export default function YearCardsContainer({
    children,
    year
  }:YearCardsContainerProps) {

    //CONTEXT MANAGEMENT
    const { appState: { activeConsolidateYear } , updateActiveYear } = useContext(Context);

    //EFFECTS
    useEffect(() => {
        updateActiveYear(year)
    },[year])

    //JSX
    return (
        <>
            <div className="grid grid-cols-3 gap-4 px-10 py-8 mx-auto max-w-[1400px]">
                {
                    activeConsolidateYear ? (
                        <>
                            <YearCard
                                title="TOTAL INCOME"
                                iconSrc="/images/icons/year-income.png"
                                value={activeConsolidateYear.totalIncome}
                            />
                            {/* EXPENSES */}
                            <YearCard
                                title="TOTAL EXPENSES"
                                iconSrc="/images/icons/year-expenses.png"
                                value={activeConsolidateYear.totalExpenses}
                            />
                            {/* AVAILABLE */}
                            <YearCard
                                title="AVAILABLE"
                                iconSrc="/images/icons/year-available.png"
                                value={activeConsolidateYear.totalAvailable}
                            />
                        </>
                    ) : (
                        <div>
                            ESQUELETON...
                        </div>
                    )
                }
                {/* INCOME */}

            </div>
            {children}
        </>
    )
}


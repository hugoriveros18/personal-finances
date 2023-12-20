/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, {createContext, useEffect, useReducer, useState} from 'react';
import { MONTHS } from '../utils/businessInfo';
import appReducer from './appReducer';
import { appReducerActions } from '../utils/appReducerActions';

//INTERFACES
interface Props {
    children: React.ReactNode;
}

interface AppContextValue {
    appState: AppState
    updateActiveYear: (year: string) => void
    updateActiveMonth: (month: string) => void
    fetchCreateRecord: (recordType: RecordType, category: string, subcategory: string, description: string, value: number) => Promise<void>
    fetchDeleteRecord: (id: string, category: string, subcategory: string, recordType: RecordType) => Promise<void>
}

// CONTEXT
export const Context = createContext<AppContextValue>({} as AppContextValue);

//ESTADO INICIAL
export const appInitialState: AppState = {
    activeYear: null,
    activeConsolidateYear: null,
    activeMonth: null,
    activeConsolidateMonth: null
}

// CONTEXT PROVIDER FUNCTION
export default function AppContextProvider({
    children
}:Props) {

    //REDUCER
    const [ state, dispatch ] = useReducer(appReducer, appInitialState)

    //METHODS
    const updateActiveYear = (year:string) => {
        dispatch({
            type: appReducerActions.setActiveYear,
            payload: year
        })
    }
    const updateActiveMonth = (month:string) => {
        dispatch({
            type: appReducerActions.setActiveMonth,
            payload: month
        })
    }
    const fetchYearConsolidateData = async () => {
        await fetch(`http://localhost:1234/api/v1/consolidate/${state.activeYear}`)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }

                throw Error('Fetch failed')
            })
            .then(res => {
                dispatch({
                    type: appReducerActions.setActiveConsolidateYear,
                    payload: res
                })
            })
            .catch(err => console.error(err))
    }
    const fetchMonthConsolidateData = async () => {
        await fetch(`http://localhost:1234/api/v1/consolidate/${state.activeYear}/${MONTHS[state.activeMonth]}`)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }

                throw Error('Fetch failed')
            })
            .then(res => {
                dispatch({
                    type: appReducerActions.setActiveConsolidateMonth,
                    payload: res
                })
            })
            .catch(err => console.error(err))
    }
    const fetchCreateRecord = async (
        recordType: RecordType,
        category: string,
        subcategory: string,
        description: string,
        value: number
    ) => {
        await fetch(`http://localhost:1234/api/v1/${recordType}/${state.activeYear}/${MONTHS[state.activeMonth]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "category": category,
                    "subcategory": subcategory,
                    "description": description,
                    "value": value
                }
            )
        })
            .then(res => {
                if(res.ok) {
                    refetchData()
                    return res.json()
                }

                throw Error('Falied record creation')
            })
            .catch(err => console.error(err))
    }
    const fetchDeleteRecord = async (
        id: string,
        category: string,
        subcategory: string,
        recordType: RecordType
    ) => {
        await fetch(`http://localhost:1234/api/v1/${recordType}/${state.activeYear}/${MONTHS[state.activeMonth]}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "category": category,
                    "subcategory": subcategory
                }
            )
        })
            .then(res => {
                if(res.ok) {
                    refetchData()
                    return res.json()
                }

                throw Error('Falied record delete')
            })
            .catch(err => console.error(err))
    }
    const refetchData = async () => {
        await fetchYearConsolidateData()
        await fetchMonthConsolidateData()
    }

    //EFFECTS
    useEffect(() => {
        if(state.activeYear) {
            fetchYearConsolidateData()
        }
    }, [state.activeYear])
    useEffect(() => {
        if(state.activeMonth) {
            fetchMonthConsolidateData()
        }
    }, [state.activeMonth])

    //JSX
    return(
        <Context.Provider 
            value={{
                appState: state,
                updateActiveYear: updateActiveYear,
                updateActiveMonth: updateActiveMonth,
                fetchCreateRecord: fetchCreateRecord,
                fetchDeleteRecord: fetchDeleteRecord
            }}>
            {children}
        </Context.Provider>
    )
}
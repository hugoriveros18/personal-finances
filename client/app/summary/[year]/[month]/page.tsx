import MonthCardsContainer from "@/app/ui/components/MonthSummary/MonthCardsContainer"

interface MonthPageProps {
    params: {
        year: string,
        month: string
    }
}

export default async function MonthPage({ params }: MonthPageProps) {

    //JSX
    return (
        <MonthCardsContainer
            month={params.month}
            year={params.year}
        />
    )
}


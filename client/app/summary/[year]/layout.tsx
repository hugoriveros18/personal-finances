import YearCardsContainer from "@/app/ui/components/YearSummary/YearCardsContainer"

export default async function YearLayout({
    children,
    params
  }: {
    children: React.ReactNode,
    params: { year: string }
  }) {

    //JSX
    return (
        <YearCardsContainer
            year={params.year}
        >
            {children}
        </YearCardsContainer>
    )
}

//https://www.flaticon.com/packs/finance-178?word=money%20management

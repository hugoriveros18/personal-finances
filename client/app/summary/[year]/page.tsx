import { MONTHS } from "@/app/utils/businessInfo";
import Link from "next/link";

export default function Year({ params }: { params: { year: string } }) {

    //JSX
    return (
        <div className="flex flex-col items-center gap-6 px-10 py-4 mx-auto max-w-[1400px]">
            <h3 className="text-dark-blue font-bold text-3xl">
                SEE MONTH DETAILS
            </h3>
            <ul className="grid grid-cols-3 gap-7 m-0 p-0 list-none">
                {
                    Object.keys(MONTHS).map((month) => {
                        return (
                            <li
                                key={month}
                                className="w-full rounded-sm overflow-hidden transition-all duration-300 hover:scale-110"
                            >
                                <Link
                                    href={`/summary/${params.year}/${month}`}
                                    className="flex justify-center px-6 py-3 bg-[#6577f3] text-xl text-white capitalize font-semibold"                                >
                                    {month}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

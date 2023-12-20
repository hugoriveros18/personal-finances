import { currencyFormmatting } from "@/app/utils/businessInfo"
import Image from "next/image"

interface YearCardProps {
    title: string
    iconSrc: string
    value: number
}

export default function YearCard({
    title,
    iconSrc,
    value
}:YearCardProps) {


    //JSX
    return (
        <div className="flex flex-col gap-2 w-full px-8 py-6 rounded-sm border-[1px] border-card-border border-solid">
            <h3 className="w-full text-start text-xl text-dark-blue font-bold">
                {title}
            </h3>
            <div className="flex gap-2 w-full items-center justify-center">
                <Image 
                    alt={`${title} icon`}
                    src={iconSrc}
                    width={50}
                    height={50}
                />
                <div>
                    <span className="text-2xl font-semibold">
                        ${currencyFormmatting(value)} COP
                    </span>
                </div>
            </div>
        </div>
    )
}


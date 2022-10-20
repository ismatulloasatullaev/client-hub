import { useRouter } from "next/router"
import cn from "classnames"

import { fetchFlows } from "store/slices/main"
import { useAppDispatch, useAppSelector } from "store"
import { useEffect } from "react"

interface MainFlowsProps {
    onItemClick?: () => void
}

export const MainFlows = ({ onItemClick }: MainFlowsProps) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { flows } = useAppSelector((state) => state.main)

    const handleItemClick = (id: number) => {
        router.push({
            pathname: "/flow/[id]/",
            query: { id }
        })

        onItemClick?.()
    }

    const itemClasses = (id: number) =>
        cn(
            "transition-all text-gray-400 hover:text-gray-500 p-[10px] hover:bg-gray-100 flex justify-start rounded-[5px]",
            {
                "text-gray-500 bg-gray-100 cursor-default":
                    Number(router.query.id) === id
            }
        )

    useEffect(() => {
        dispatch(fetchFlows())
    }, [])

    return (
        <section className={"mb-[28px] px-[20px]"}>
            <span className={"text-[18px] text-blue font-semibold"}>
                Все потоки
            </span>
            <div className={"mt-[8px] flex flex-col gap-1"}>
                {flows &&
                    flows.length > 0 &&
                    flows.map((flow) => (
                        <button
                            onClick={() => handleItemClick(flow.id)}
                            className={itemClasses(flow.id)}
                            key={flow.id}>
                            {flow.name}
                        </button>
                    ))}
            </div>
        </section>
    )
}

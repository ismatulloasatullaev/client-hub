import { MainFlows } from "../../molecules"
import { useRouter } from "next/router"
import {
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon
} from "@heroicons/react/24/outline"

import cn from "classnames"

interface MenuItemProps {
    Icon: JSX.Element
    label: string
    onClick?: () => void
    isActive?: boolean
}

export const MenuItem = ({
    label,
    onClick,
    Icon,
    isActive = false
}: MenuItemProps) => {
    const classes = cn(
        "flex items-center gap-[10px] transition-all text-gray-400 text-[16px] hover:text-blue",
        {
            "text-blue cursor-default": isActive
        }
    )

    return (
        <button onClick={onClick} className={classes}>
            {Icon} {label}
        </button>
    )
}

export const Menu = () => {
    const router = useRouter()

    const handleMoveToSearch = () => {
        router.push("/search")
    }

    return (
        <aside
            className={
                "hidden md:block md:w-[30%] max-w-[250px] sticky top-24 bg-white self-start pt-[40px] rounded-[20px] overflow-hidden"
            }>
            <section
                className={
                    "px-[20px] border-b-[0.5px] border-gray-300/30 pb-[30px]"
                }>
                <div className={"mt-[30px] flex flex-col gap-4"}>
                    <MenuItem
                        isActive={router.asPath.includes("/search")}
                        Icon={
                            <MagnifyingGlassIcon
                                className={"w-[20px] h-[20px]"}
                            />
                        }
                        onClick={handleMoveToSearch}
                        label={"Поиск"}
                    />
                </div>
            </section>

            <section className={"mt-[28px]"}>
                <MainFlows />

                <section
                    className={
                        "mt-[60px] px-[20px] flex flex-col gap-[20px] pb-[20px] border-b-[0.5px] border-gray-300/30"
                    }>
                    <MenuItem
                        Icon={
                            <QuestionMarkCircleIcon
                                className={"w-[20px] h-[20px]"}
                            />
                        }
                        label={"Правила"}
                        onClick={() => {}}
                    />
                </section>
            </section>
        </aside>
    )
}

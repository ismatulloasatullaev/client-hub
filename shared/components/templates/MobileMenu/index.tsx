import { Bars3Icon } from "@heroicons/react/24/outline"

import { MainFlows } from "../../molecules"
import { Fragment } from "react"
import { Transition } from "@headlessui/react"

interface MobileMenuProps {
    closeMenu: () => void
    isMenuOpened: boolean
}

export const MobileMenu = ({ closeMenu, isMenuOpened }: MobileMenuProps) => {
    return (
        <Transition appear show={isMenuOpened} as={Fragment}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-125"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-125">
                <section
                    className={
                        "fixed top-0 left-0 w-full h-full z-[500] backdrop-blur-sm bg-blue/30"
                    }>
                    <aside
                        className={
                            "w-[70%] pt-[40px] h-full bg-white rounded-r-3xl"
                        }>
                        <section
                            className={
                                "px-[20px] border-b-[0.5px] border-gray-300/30 pb-[30px]"
                            }>
                            <section className={"flex gap-4"}>
                                <button
                                    onClick={closeMenu}
                                    className={"block md:hidden"}>
                                    <Bars3Icon
                                        className={
                                            "w-[30px] text-blue h-[30px]"
                                        }
                                    />
                                </button>
                            </section>
                        </section>

                        <section className={"mt-[28px]"}>
                            <MainFlows
                                onItemClick={() => {
                                    closeMenu()
                                }}
                            />
                        </section>
                    </aside>
                </section>
            </Transition.Child>
        </Transition>
    )
}

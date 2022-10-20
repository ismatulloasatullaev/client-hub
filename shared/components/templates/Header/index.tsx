import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import cn from "classnames"

import { Logo } from "shared/components/atoms"
import { MobileMenu } from "../MobileMenu"
import { useScrollBlock } from "../../../hooks"

export const Header = () => {
    const headerRef = useRef<HTMLElement>(null)
    const [hasScrolled, setScrolled] = useState(false)
    const [isMenuOpened, setMenuOpen] = useState(false)

    const [blockScroll, allowScroll] = useScrollBlock()

    const router = useRouter()

    const closeMenu = () => {
        setMenuOpen(false)
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            setMenuOpen(false)
        })
    }, [])

    useEffect(() => {
        const headerScrollListener = () => {
            if (headerRef.current) {
                window.scrollY >= 55 ? setScrolled(true) : setScrolled(false)
            }
        }

        headerScrollListener()

        window.addEventListener("scroll", headerScrollListener)

        return () => {
            window.removeEventListener("scroll", headerScrollListener)
        }
    }, [])

    useEffect(() => {
        isMenuOpened ? blockScroll() : allowScroll()
    }, [isMenuOpened])

    return (
        <>
            <MobileMenu isMenuOpened={isMenuOpened} closeMenu={closeMenu} />

            <header
                ref={headerRef}
                style={{
                    borderRadius: hasScrolled ? "0 0 30px 30px" : "100px"
                }}
                className={cn(
                    "w-full sticky top-0 z-50 h-[80px] bg-white mt-[40px] mb-[20px] duration-300 transition-all shadow-gray-300/20",
                    hasScrolled ? "shadow-lg" : "shadow-none"
                )}>
                <section
                    className={
                        "w-full h-full flex justify-between px-[30px] items-center"
                    }>
                    <Logo onClick={() => router.push("/feed")} />
                </section>
            </header>
        </>
    )
}

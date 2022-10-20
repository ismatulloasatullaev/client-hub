import Image from "next/image"
import cn from "classnames"

interface LogoProps {
    type?: "sm" | "lg"
    onClick?: () => void
}

export const Logo = ({ type = "lg", onClick }: LogoProps) => {
    const classes = cn({
        "cursor-pointer": onClick
    })

    return (
        <>
            {type === "sm" && (
                <Image
                    className={classes}
                    onClick={onClick}
                    src={"/svg/logo/icon.svg"}
                    width={"60px"}
                    height={"60px"}
                />
            )}
            {type === "lg" && (
                <Image
                    className={classes}
                    onClick={onClick}
                    src={"/svg/logo/full.svg"}
                    width={"135px"}
                    height={"10px"}
                />
            )}
        </>
    )
}

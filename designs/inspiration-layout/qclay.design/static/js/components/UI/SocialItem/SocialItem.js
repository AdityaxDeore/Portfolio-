import "./SocialItem.scss"
import dribble from "./assets/dribble.svg"
import behance from "./assets/behance.svg"
import tiktok from "./assets/tiktok.svg"
import instagram from "./assets/instagram.svg"
import {
    useStickToMouse
} from "@/Animator/js/react/hooks/useMouse/useStickToMouse"

const SocialItem = ({
    theme = "light",
    id,
    link,
    onMouseEnter,
    onMouseLeave
}) => {
    const {
        parent,
        target
    } = useStickToMouse()
    const icons = {
        "1-social": dribble,
        "2-social": behance,
        "3-social": tiktok,
        "4-social": instagram,
    }

    return ( <
        a ref = {
            r => target.current[0] = r
        }
        href = {
            link
        }
        target = "_blank"
        onMouseEnter = {
            onMouseEnter
        }
        onMouseLeave = {
            onMouseLeave
        }
        className = {
            `social social${theme==="dark" ? "_dark" : ""}`
        } >
        <
        img src = {
            icons[id]
        }
        alt = "social" / >
        <
        span ref = {
            parent
        }
        className = "hover" > < /span> <
        /a>
    )
}

export default SocialItem
import "./Main.scss";
import "./Anim.scss";
import Eye from "@/components/UI/Eye/Eye";
import {
    $t
} from "@/i18n/i18n";
import {
    useTransform
} from "@/Controller/hooks/useTransform";
import {
    screens
} from "../../constants";
import {
    useContext,
    useRef
} from "react";
import {
    CursorContext,
    cursorStyles
} from "@/components/Cursor/Cursor";
import {
    memo
} from "react";
import Vimeo from "./Vimeo/vimeo";
import Clutch from "../../../../components/Clutch";

const Main = memo(function Main() {
    const containerRef = useRef();
    const {
        parent,
        target
    } = useTransform("scale", {
        id: screens.MAIN,
        min: () => {
            if (window.innerWidth <= 576) {
                return 1;
            }
            if (!containerRef.current) {
                return 0.8;
            }
            const {
                width
            } = containerRef.current.getBoundingClientRect();
            return width / window.innerWidth;
        },
        max: window.innerWidth <= 576 ? 0.89 : 1,
    });
    const innerScale = useTransform("scale", {
        id: screens.MAIN,
        min: 1.5,
        max: 1,
        parent,
    });
    const innerTr1 = useTransform("translateX", {
        id: screens.MAIN,
        min: -200,
        max: 0,
        parent
    });
    const innerTr2 = useTransform("translateX", {
        id: screens.MAIN,
        min: 200,
        max: 0,
        parent
    });
    const {
        setCursorStyle
    } = useContext(CursorContext);

    return ( <
        div className = "main"
        ref = {
            parent
        }
        id = "home" >
        <
        div className = "main__content" >
        <
        div className = "texts" >
        <
        div className = "title title-mobile" > {
            $t("pages.home.components.main.title.mobile").map((text, i) => ( <
                span key = {
                    i
                }
                className = {
                    `-tr-${i}`
                } > {
                    text
                } <
                /span>
            ))
        } <
        /div> <
        h1 className = "title title-desktop" > {
            $t("pages.home.components.main.title.desktop").map((text, i) => ( <
                span key = {
                    i
                }
                className = {
                    `-tr-${i}`
                } > {
                    text
                } <
                /span>
            ))
        } <
        /h1>

        <
        div className = "main__row" >
        <
        div className = "main__clutch" >
        <
        Clutch / >
        <
        /div> <
        span className = "subtitle" >
        <
        span > {
            $t("pages.home.components.main.text_1")
        } < /span> <
        span > {
            $t("pages.home.components.main.text_2")
        } < /span> <
        /span> <
        /div> <
        /div> <
        div className = "points" >
        <
        div className = "eye" >
        <
        Eye text = "/images/main/text.webp" / >
        <
        /div> <
        div className = "presentation -tr-4" >
        <
        a href = "https://qclay.design/QClayCapabilitiesDeck.v3.pdf"
        target = "_blank"
        rel = "noreferrer"
        onMouseEnter = {
            () => setCursorStyle(cursorStyles.HOVER_NAV)
        }
        onMouseLeave = {
            () => setCursorStyle(cursorStyles.DEFAULT)
        } >
        Our Capabilities Deck <
        /a> <
        /div> <
        /div> <
        /div> <
        div ref = {
            containerRef
        }
        className = "main__image" >
        <
        div className = "image" >
        <
        div className = "image-clip" >
        <
        div ref = {
            target
        }
        className = "image-sub" >
        <
        Vimeo / >
        <
        /div> <
        /div> <
        /div> <
        /div> <
        div className = "presentation presentation-mobile -tr-7" >
        <
        a href = "https://qclay.design/QClayCapabilitiesDeck.v3.pdf"
        target = "_blank"
        rel = "noreferrer"
        onMouseEnter = {
            () => setCursorStyle(cursorStyles.HOVER_NAV)
        }
        onMouseLeave = {
            () => setCursorStyle(cursorStyles.DEFAULT)
        } >
        Our Capabilities Deck <
        /a> <
        /div> { /* <p className="paragraph">{$t("pages.home.components.main.paragraph")}</p> */ } <
        /div>
    );
});

export default Main;
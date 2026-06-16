import TalkButton from "@/components/UI/TalkButton/TalkButton";
import Icon from "@/components/UI/Icon/Icon";
import Burger from "@/components/UI/Burger/Burger";
import "./Header.scss";
import "./Anim.scss";
import Menu from "./Menu/Menu";
import {
    useState,
    useContext
} from "react";
import {
    getScreen
} from "@/utils";
import {
    CursorContext,
    cursorStyles
} from "@/components/Cursor/Cursor";
import {
    state
} from "@/Controller/utils/state";
import AnimateLink from "./Menu/AnimateLink";
import {
    context
} from "@/Controller/utils/context";

const headerNav = [{
        name: "Home",
        link: "/",
    },
    {
        name: "About",
        link: "/",
    },
    {
        name: "Works",
        link: "/",
    },
    {
        name: "Contact us",
        link: "/#contact-us",
    },
];

const Header = () => {
    const [isMenuShow, setIsMenuShow] = useState(false);

    const routeToScreen = (link) => {
        const screen = getScreen(link);
        window.location.href = link;
        // typeof screen === 'number' && setNewActive(screen)
    };
    const routeToScreenAndHideMenu = (link) => {
        const screen = getScreen(link);
        // if (active === screen) { return }
        if (typeof screen === "number") {
            // setNewActive(screen)
            setTimeout(() => {
                setIsMenuShow(false);
            }, state.externalDelay);
        }
    };

    const {
        setCursorStyle
    } = useContext(CursorContext);

    return ( <
        div className = "header__container header__container_blog" >
        <
        header className = {
            `header ${isMenuShow ? "-show-menu" : ""}`
        } >
        <
        Icon onClick = {
            () => routeToScreenAndHideMenu("#home")
        }
        className = "header__logo"
        id = "logo" / >
        <
        div className = {
            `text ${isMenuShow ? "-show-menu" : ""}`
        } > {
            headerNav.map((_, i) => ( <
                AnimateLink onClick = {
                    () => routeToScreen(_.link)
                }
                key = {
                    i
                }
                onMouseEnter = {
                    () => setCursorStyle(cursorStyles.HOVER_NAV)
                }
                onMouseLeave = {
                    () => setCursorStyle(cursorStyles.DEFAULT)
                } >
                {
                    _.name
                } <
                /AnimateLink>
            ))
        } <
        /div> <
        div className = "buttons" >
        <
        TalkButton isShow = {
            isMenuShow
        }
        name = "black"
        onClick = {
            () => {
                context.active = 6;
                window.location.href = "/#contact-us";
            }
        }
        onMouseEnter = {
            () => setCursorStyle(cursorStyles.HOVER_NAV)
        }
        onMouseLeave = {
            () => setCursorStyle(cursorStyles.DEFAULT)
        }
        /> <
        Burger isShow = {
            isMenuShow
        }
        onClick = {
            () => setIsMenuShow(!isMenuShow)
        }
        onMouseEnter = {
            () => setCursorStyle(cursorStyles.HOVER_MENU_BTN)
        }
        onMouseLeave = {
            () => setCursorStyle(cursorStyles.DEFAULT)
        }
        /> <
        /div> <
        /header> <
        Menu isMenuShow = {
            isMenuShow
        }
        setIsMenuShow = {
            setIsMenuShow
        }
        /> <
        /div>
    );
};

export default Header;
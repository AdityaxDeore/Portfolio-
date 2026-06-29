import Form from "./Form/Form";
import SocialItem from "@/components/UI/SocialItem/SocialItem";
import Video from "@/components/UI/Video/Video";
import {
    $t
} from "@/i18n/i18n";
import {
    useContext,
    useEffect
} from "react";
import {
    BreakpointsContext
} from "@/context/breakpointsContext";
import {
    CursorContext,
    cursorStyles
} from "@/components/Cursor/Cursor";
import UnderLink from "@/components/UI/UnderLink/UnderLink";
import cn from "classnames";
import {
    ModalContext
} from "../../../../../components/Modal/Modal";
import {
    ControllerContext
} from "../../../../../Controller/Controller";
import {
    screens
} from "../../../constants";
import Clutch from "../../../../../components/Clutch";

const FormBlock = ({
        fixed
    }) => {
        const {
            isMaxWidth
        } = useContext(BreakpointsContext);
        const {
            setCursorStyle
        } = useContext(CursorContext);
        const {
            activeForm,
            setActiveForm,
            active: modalActive
        } = useContext(ModalContext);
        const {
            activeId,
            active,
            setNewActive
        } = useContext(ControllerContext);

        const closeForm = () => {
            if (!isMaxWidth.mobile) {
                return;
            }
            if (activeId !== screens.REQUESTFORM) {
                return;
            }

            setTimeout(() => {
                setActiveForm(false);
                setNewActive(active - 1, true);
            }, 700);
        };

        return ( <
            section className = {
                cn("req-form", fixed ? "-fixed" : "", activeForm ? "-active" : "", modalActive ? "-success" : "")
            }
            id = "contacts" >
            {
                isMaxWidth.mobile && < div onClick = {
                    closeForm
                }
                className = "req-form__cross" > < /div>} <
                div className = "req-form__content" >
                <
                aside >
                <
                div className = "req-form__text tr-1" >
                <
                div className = "title" >
                <
                span > {
                    $t("pages.reqForm.aside.question_1")
                } < /span> {
                    isMaxWidth.mobile ? ( <
                        span className = "letter" > a < /span>
                    ) : ( <
                        div className = "title_video" >
                        <
                        Video src = {
                            "/video/contact/ch.mp4"
                        }
                        poster = {
                            "/video/contact/character-poster.webp"
                        }
                        width = {
                            75
                        }
                        height = {
                            75
                        } >
                        < /Video> <
                        /div>
                    )
                } <
                span > {
                    $t("pages.reqForm.aside.question_2")
                } < /span> <
                /div> <
                p > {
                    $t("pages.reqForm.aside.text")
                } < /p> <
                /div> <
                div className = "req-form__clutch" >
                <
                h4 className = "req-form__clutch-title" > {
                    $t("pages.reqForm.aside.trust")
                } < /h4> <
                div className = "req-form__clutch-ui" >
                <
                Clutch / >
                <
                /div> <
                /div> <
                div className = "req-form__socials" >
                <
                h4 className = "tr-2" > {
                    $t("pages.reqForm.aside.follow")
                } < /h4> <
                div className = "tr-3" > {
                    $t("pages.reqForm.aside.socials").map((item) => ( <
                        SocialItem key = {
                            item.id
                        }
                        link = {
                            item.link
                        }
                        id = {
                            item.id
                        }
                        onMouseEnter = {
                            () => setCursorStyle(cursorStyles.HOVER_NAV)
                        }
                        onMouseLeave = {
                            () => setCursorStyle(cursorStyles.DEFAULT)
                        }
                        />
                    ))
                } <
                /div> <
                /div> <
                div className = "req-form__contacts" >
                <
                h4 className = "tr-4" > {
                    $t("pages.reqForm.aside.contact")
                } < /h4> <
                UnderLink href = "mailto:info@qclay.design"
                className = "tr-5" > {
                    $t("pages.reqForm.aside.email")
                } <
                /UnderLink> <
                /div> <
                /aside> <
                Form / >
                <
                /div> <
                div className = "form-modal-footer" >
                <
                div className = "menu__text" >
                <
                div className = "mail" >
                <
                a className = "mail__text"
                href = "#" > {
                    $t("components.menu.connect.text")
                } <
                /a> <
                UnderLink className = "underline"
                href = "mailto:info@qclay.design" > {
                    $t("components.menu.connect.mail")
                } <
                /UnderLink> <
                /div> <
                div className = "menu__cp" >
                <
                p onClick = {
                    closeForm
                }
                className = "menu__cp_privacy" > {
                    $t("components.menu.connect.privacy")
                } <
                /p> <
                p className = "menu__cp_copyright" > & copy;QClay Design {
                    new Date().getFullYear()
                } < /p> <
                /div> <
                /div> <
                /div> <
                footer className = "tr-7 form-modal-desktop-footer" >
                <
                div >
                <
                a className = "form-modal-desktop-footer-badge"
                href = "/blog/dribbble-select" >
                <
                img src = "/images/dribbble-badge.png" / >
                <
                /a> <
                p className = "address" > {
                    $t("pages.reqForm.footer.address")
                } < /p> <
                a
                href = {
                    $t("pages.reqForm.footer.privacy.text")
                }
                onMouseEnter = {
                    () => setCursorStyle(cursorStyles.HOVER_NAV)
                }
                onMouseLeave = {
                    () => setCursorStyle(cursorStyles.DEFAULT)
                }
                className = "privacy" >
                {
                    $t("pages.reqForm.footer.privacy.text")
                } <
                /a> <
                /div> <
                div className = "" >
                <
                a
                href = "https://qclay.design/QClayCapabilitiesDeck.v3.pdf"
                target = "_blank"
                rel = "noreferrer"
                onMouseEnter = {
                    () => setCursorStyle(cursorStyles.HOVER_NAV)
                }
                onMouseLeave = {
                    () => setCursorStyle(cursorStyles.DEFAULT)
                } >
                Our Capabilities Deck <
                /a> {
                    $t("pages.reqForm.footer.right")
                } <
                /div> <
                /footer> <
                /section>
            );
        };

        export default FormBlock;
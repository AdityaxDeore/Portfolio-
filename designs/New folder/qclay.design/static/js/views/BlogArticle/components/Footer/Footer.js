import {
    $t
} from "@/i18n/i18n";
import "./Footer.scss";

export default function Footer() {
    return ( <
        div className = "footer-main" >
        <
        div className = "footer-container" >
        <
        footer className = "tr-7 form-modal-desktop-footer footer" >
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
        a href = {
            $t("pages.reqForm.footer.privacy.text")
        }
        className = "privacy" > {
            $t("pages.reqForm.footer.privacy.text")
        } <
        /a> <
        /div> <
        div className = "" >
        <
        a href = "https://qclay.design/QClayCapabilitiesDeck.v3.pdf"
        target = "_blank"
        rel = "noreferrer" >
        Our Capabilities Deck <
        /a> {
            $t("pages.reqForm.footer.right")
        } <
        /div> <
        /footer> <
        /div> <
        /div>
    );
}
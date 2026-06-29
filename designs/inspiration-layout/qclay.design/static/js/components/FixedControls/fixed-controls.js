import "./fixed-controls.scss";

export const FixedControls = () => {
    return ( <
        div className = "fixed-controls" >
        <
        a className = "fixed-controls-button-tg --btn-background"
        href = "https://t.me/qclay"
        target = "_blank"
        rel = "noreferrer" >
        <
        img src = "/images/telegram.v2.png"
        alt = "" / >
        <
        /a> <
        a className = "fixed-controls-button-wa --btn-background"
        href = "https://wa.me/971502685455"
        target = "_blank"
        rel = "noreferrer" >
        <
        img src = "/images/wa.svg"
        alt = "" / >
        <
        /a> <
        a className = "fixed-controls-button-book --btn-background"
        href = "https://calendly.com/qclay"
        target = "_blank"
        rel = "noreferrer" >
        <
        img src = "/images/calendar.svg"
        alt = "" / >
        Book a call <
        /a> <
        /div>
    );
};
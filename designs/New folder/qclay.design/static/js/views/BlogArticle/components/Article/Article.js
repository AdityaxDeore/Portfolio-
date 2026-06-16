import {
    Link
} from "react-router-dom";
import "./Article.scss";

export default function Article() {
    return ( <
        div className = "a" >
        <
        div className = "a-container" >
        <
        div className = "a-container-inner" >
        <
        div >
        <
        div className = "a-block-sticky" >
        <
        div className = "a-block" >
        <
        h3 className = "a-block-title" >
        <
        img src = "/images/in-this-article-label.png" / > In this article <
        /h3> <
        Link className = "a-block-link"
        to = "#why-this-matters" >
        Why this matters <
        /Link> <
        Link className = "a-block-link"
        to = "#featured-work" >
        Featured Work <
        /Link> <
        /div>

        <
        img src = "/images/dribbble-badge.png"
        className = "a-block-badge" / >
        <
        /div> <
        /div> <
        div className = "a-content" >
        <
        p className = "a-label" > announcements < /p> <
        h1 className = "a-content-title" > We’ ve been recognized in  Best Shots of the Year < /h1> <
        p className = "a-date" >
        April 16, 2026 < span / > 2 Min read <
        /p> <
        div className = "a-top-agency" >
        <
        div className = "a-top-agency-item" >
        <
        img src = "/images/top-agency-left.png" / >
        <
        /div> <
        div className = "a-top-agency-item" >
        <
        img src = "/images/top-agency-right.png" / >
        <
        /div> <
        /div> <
        div className = "a-explore-container" >
        <
        a className = "a-explore-dir"
        href = "https://dribbble.com/branding-agency"
        target = "_blank"
        rel = "noreferrer" >
        Explore directory <
        /a> <
        /div> <
        div className = "a-content-content rich-text-blog" >
        <
        h3 id = "why-this-matters" > Why this matters < /h3> <
        p > < /p> <
        p >
        Dribbble Select is built to spotlight teams that can deliver high - quality work on complex, large - scale scopes— and this recognition reflects the type of projects we’ re built
        for. <
        /p> <
        p > < /p> <
        img src = "/images/dribbble-img.png"
        alt = "" / >
        <
        p > < /p> <
        p > < /p> <
        h3 id = "featured-work" > Featured Work < /h3> <
        p > < /p> <
        p >
        Our logo is thoughtfully crafted from three essential components, each representing a core aspect of
        ZkCloud. <
        /p> <
        p > < /p> <
        p >
        This combination ensures that our logo conveys the comprehensive, secure, and cutting - edge nature of
        ZkCloud. <
        /p> <
        p > < /p> <
        video src = "/video/refs.mp4"
        autoPlay muted playsInline loop / >
        <
        p > < /p> <
        p > < /p> <
        p >
        <
        strong > CLOUD < /strong> <
        /p> <
        p > < /p> <
        p >
        The cloud element reflects the decentralized nature of our platform, reminding us of the infinite space
        for storage and computation <
        /p> <
        p > < /p> <
        p > < /p> <
        p >
        <
        strong > THE LETTER“ Z” < /strong> <
        /p> <
        p > < /p> <
        p >
        The logo includes the letter“ Z” symbolizing zero - knowledge transactions, emphasizing our commitment to security <
        /p> <
        p > < /p> <
        p > < /p> <
        p >
        <
        strong > LAYERED DESIGN < /strong> <
        /p> <
        p > < /p> <
        p >
        The layered design elements mirror the multi - layered approach of our platform, highlighting the complexity and robustness of our technological infrastructure. <
        /p> <
        /div> <
        /div> <
        img src = "/images/dribbble-badge.png"
        className = "a-badge" / >
        <
        /div> <
        /div> <
        /div>
    );
}
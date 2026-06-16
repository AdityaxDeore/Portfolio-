import {
    Navigate,
    useParams
} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import React from "react";
import Article from "./components/Article/Article";

export function BlogArticle() {
    const params = useParams();

    React.useEffect(() => {
        document.body.classList.add("-loaded");
    });

    if (params.id !== "dribbble-select") {
        return <Navigate to = "/" / > ;
    }

    return ( <
        div style = {
            {
                overflow: "auto",
                maxHeight: "100vh"
            }
        } >
        <
        Header / >
        <
        Article / >
        <
        Footer / >
        <
        /div>
    );
}
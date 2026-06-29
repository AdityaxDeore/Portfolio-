import React from "react";
import {
    context
} from "../Controller/utils/context";
import {
    Navigate
} from "react-router-dom";

const XRedirect = () => {
    context.active = 6;
    return <Navigate to = "/?ref=xcom#contact-us" / > ;
}

export default XRedirect;
import Home from "@/views/Home/Home";
import Terms from "@/views/Terms";
import {
    RouterProvider,
    createBrowserRouter,
    Navigate
} from "react-router-dom";
import {
    useEffect
} from "react";
import BreakpointsContextProvider from "./context/breakpointsContext";
import {
    ModalContextProvider
} from "./components/Modal/Modal";
import {
    CursorContextProvider
} from "@/components/Cursor/Cursor";
import {
    setCookie
} from "nookies";
import XRedirect from "./views/XRedirect";
import {
    BlogArticle
} from "./views/BlogArticle/BlogArticle";

const router = createBrowserRouter([{
        path: "/",
        element: < Home / > ,
    },
    {
        path: "/terms",
        element: < Terms / > ,
    },
    {
        path: "/x",
        element: < XRedirect / > ,
    },
    {
        path: "/blog/:id",
        element: < BlogArticle / > ,
    },
    {
        path: "*",
        element: < Navigate to = "/" / > ,
    },
]);

const App = () => {
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search || "");
        const referral = searchParams.get("ref") || searchParams.get("utm_source");

        if (referral) {
            setCookie(null, "referral", referral, {
                maxAge: 60 * 60 * 24 * 30, // month
            });
        }
    }, []);

    return ( <
        BreakpointsContextProvider >
        <
        CursorContextProvider >
        <
        ModalContextProvider >
        <
        RouterProvider router = {
            router
        }
        /> <
        /ModalContextProvider> <
        /CursorContextProvider> <
        /BreakpointsContextProvider>
    );
};

export default App;
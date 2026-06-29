import Header from "@/components/Header/Header";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import WhatCreate from "./components/WhatCreate/WhatCreate";
import Designers from "./components/Designers/Designers";
import Portfolio from "./components/Portfolio/Portfolio";
import RequestForm from "./components/RequestForm/RequestForm";
import Startups from "./components/Startups/Startups";
import Modal from "../../components/Modal/Modal";

import Create from "./components/Create/Create";
import Cursor from "@/components/Cursor/Cursor";

import Jumper from "@/components/Jumper/Jumper";

import Controller from "@/Controller/Controller";
import Sections from "@/Controller/Sections";
import {
    screens
} from "./constants";

import FormBlock from "./components/RequestForm/components/FormBlock";
import {
    useContext,
    useEffect
} from "react";
import {
    BreakpointsContext
} from "@/context/breakpointsContext";
import renderer from "@/Animator/js/renderer";
import {
    FixedControls
} from "../../components/FixedControls/fixed-controls";

const Home = () => {
        useEffect(() => {
            renderer.startRender();
            renderer.subscribeMouse();

            return () => {
                renderer.stopRender();
                renderer.unsubscribeMouse();
            };
        });

        const {
            isMaxWidth
        } = useContext(BreakpointsContext)

        return ( <
            >
            <
            Controller duration = {
                700
            }
            externalDelay = {
                500
            }
            externalDuration = {
                400
            } >
            <
            Header / >
            <
            Sections >
            <
            Main id = {
                screens.MAIN
            }
            /> <
            About id = {
                screens.ABOUT
            }
            /> <
            WhatCreate id = {
                screens.WHATCREATE
            }
            /> <
            Designers id = {
                screens.DESIGNERS
            }
            /> <
            Portfolio id = {
                screens.PORTFOLIO
            }
            /> <
            Startups id = {
                screens.STARTUPS
            }
            /> <
            RequestForm id = {
                screens.REQUESTFORM
            }
            /> <
            /Sections> <
            Create / >
            <
            Jumper / >
            <
            Cursor / >
            <
            Modal / > {
                isMaxWidth.mobile && < FormBlock fixed = {
                    true
                }
                />} <
                /Controller> <
                FixedControls / >
                <
                />
            );
        };

        export default Home;
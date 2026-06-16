import "./RequestForm.scss";
import "./Anim.scss";
import Preview from "./components/Preview/Preview";
import {
    memo,
    useEffect
} from "react";
import FormBlock from "./components/FormBlock";
import {
    useContext
} from "react";
import {
    BreakpointsContext
} from "@/context/breakpointsContext";
import {
    ModalContext
} from "../../../../components/Modal/Modal";
import {
    ControllerContext
} from "../../../../Controller/Controller";
import {
    screens
} from "../../constants";

const RequestForm = memo(function RequestForm() {
    const {
        isMaxWidth
    } = useContext(BreakpointsContext)
    const {
        setActiveForm,
        activeForm
    } = useContext(ModalContext)
    const {
        activeId
    } = useContext(ControllerContext)

    useEffect(() => {
        if (!isMaxWidth.mobile) {
            return
        }
        if (activeId !== screens.REQUESTFORM) {
            return
        }
        if (activeForm) {
            return
        }
        setTimeout(() => {
            setActiveForm(true)
        }, 100)
    }, [activeId])

    return ( <
        div className = "rq-form-plug" > { /* <Preview /> */ } {
            !isMaxWidth.mobile && < FormBlock / >
        } { /* <FormBlock/> */ } <
        /div>
    )
})

export default RequestForm
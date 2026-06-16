import {
    useRef
} from 'react'
import './Interface.scss'
import Video from '@/components/UI/Video/Video'
import Animate from './Animate'

const Interface = ({
    parent,
    parentRefs
}) => {

    const interfaceInterface = useRef()

    const interfaceContainer = useRef()
    const interfaceContent = useRef()
    const interfaceStage1 = useRef()
    const interfaceStage2 = useRef()
    const interfaceStage3 = useRef()

    const interfaceTagContainer = useRef()
    const interfaceTag1 = useRef()
    const interfaceTag2 = useRef()
    const interfaceTag3 = useRef()
    const interfaceTag4 = useRef()

    const interfaceMode = useRef()
    const interfaceModeTrX = useRef()

    const interfaceDHeader = useRef()
    const interfaceSidebar = useRef()
    const interfaceOtherOps = useRef()
    const interfaceRow = useRef()
    const interfaceTitle = useRef()
    const interfaceTasks = useRef()
    const interfaceMOps = useRef()
    const interfaceMHeader = useRef()
    const interfaceLogo = useRef()
    const interfaceSlot = useRef()

    function initRefs() {
        const slider = parentRefs.target.current

        const mainInterface = interfaceInterface.current

        const container = interfaceContainer.current
        const content = interfaceContent.current
        const view = parentRefs.view.current
        const grid = parentRefs.grid.current
        const stage1 = interfaceStage1.current
        const stage2 = interfaceStage2.current
        const stage3 = interfaceStage3.current

        const mode = interfaceMode.current
        const modeTrX = interfaceModeTrX.current

        const tag1 = interfaceTag1.current
        const tag2 = interfaceTag2.current
        const tag3 = interfaceTag3.current
        const tag4 = interfaceTag4.current

        const tagContainer = interfaceTagContainer.current

        const dHeader = interfaceDHeader.current
        const sidebar = interfaceSidebar.current
        const otherOps = interfaceOtherOps.current

        const row = interfaceRow.current
        const title = interfaceTitle.current
        const tasks = interfaceTasks.current
        const mOps = interfaceMOps.current
        const mHeader = interfaceMHeader.current
        const logo = interfaceLogo.current

        const slot = interfaceSlot.current

        const cursor1 = parentRefs.cursor1.current
        const cursor2 = parentRefs.cursor2.current
        const cursor3 = parentRefs.cursor3.current
        const cursor4 = parentRefs.cursor4.current
        const cursor5 = parentRefs.cursor5.current
        const cursor6 = parentRefs.cursor6.current


        const mounted = slider && container && content && view && stage1 && stage2 && stage3 && grid &&
            tag1 && tag2 && tag3 && tag4 && tagContainer &&
            mode && modeTrX &&
            dHeader && sidebar && otherOps &&
            row && title && tasks && mOps && mHeader && logo &&
            slot && mainInterface &&
            cursor1 && cursor2 && cursor3 && cursor4 && cursor5 && cursor6
        return {
            mounted,
            slider,
            container,
            content,
            view,
            stage1,
            stage2,
            stage3,
            grid,
            tag1,
            tag2,
            tag3,
            tag4,
            tagContainer,
            mainInterface,
            mode,
            modeTrX,
            dHeader,
            sidebar,
            otherOps,
            row,
            title,
            tasks,
            mOps,
            mHeader,
            logo,
            slot,
            cursor1,
            cursor2,
            cursor3,
            cursor4,
            cursor5,
            cursor6
        }
    }

    return ( <
        Animate parent = {
            parent
        }
        target = {
            interfaceInterface
        }
        initRefs = {
            initRefs
        } >
        <
        div ref = {
            interfaceInterface
        }
        className = "interface" >
        <
        div ref = {
            interfaceContainer
        }
        className = 'interface__container' >
        <
        div ref = {
            interfaceContent
        }
        className = 'interface__content' >
        <
        div ref = {
            interfaceMode
        }
        className = 'interface__mode' >
        <
        div ref = {
            interfaceModeTrX
        }
        className = 'interface__trx' >
        <
        div className = 'interface__background' >
        <
        div className = 'object' > < img src = {
            '/images/whatCreate/interface/background.webp'
        }
        width = {
            944
        }
        height = {
            708
        }
        alt = "" / > < /div> <
        /div> <
        div ref = {
            interfaceStage1
        }
        className = 'interface__stage-1' >
        <
        div className = 'object' > < img src = {
            '/images/whatCreate/interface/prototype.webp'
        }
        width = {
            944
        }
        height = {
            708
        }
        alt = "" / > < /div> <
        /div> <
        div ref = {
            interfaceStage2
        }
        className = 'interface__stage-2' >
        <
        div ref = {
            interfaceTasks
        }
        className = 'object tasks' > < img src = {
            '/images/whatCreate/interface/tasks.webp'
        }
        width = {
            856
        }
        height = {
            364
        }
        alt = "" / > < /div> <
        div ref = {
            interfaceDHeader
        }
        className = 'object d-header' > < img src = {
            '/images/whatCreate/interface/desktop-header.webp'
        }
        width = {
            847
        }
        height = {
            32
        }
        alt = "" / > < /div> <
        div ref = {
            interfaceOtherOps
        }
        className = 'object options' > < img src = {
            '/images/whatCreate/interface/other-options.webp'
        }
        width = {
            758
        }
        height = {
            30
        }
        alt = "" / > < /div> <
        div ref = {
            interfaceRow
        }
        className = 'object row' > < img src = {
            '/images/whatCreate/interface/row.webp'
        }
        width = {
            845
        }
        height = {
            113
        }
        alt = "" / > < /div> <
        div ref = {
            interfaceTitle
        }
        className = 'object title' > < img src = {
            '/images/whatCreate/interface/title.webp'
        }
        width = {
            233
        }
        height = {
            107
        }
        alt = "" / > < /div> <
        div ref = {
            interfaceSidebar
        }
        className = 'object sidebar' > < img src = {
            '/images/whatCreate/interface/sidebar.webp'
        }
        width = {
            56
        }
        height = {
            704
        }
        alt = "" / > < /div> <
        /div> <
        div ref = {
            interfaceStage3
        }
        className = 'interface__stage-3' >
        <
        div ref = {
            interfaceMOps
        }
        className = 'object options' > < img src = {
            '/images/whatCreate/interface/mobile-ops.webp'
        }
        width = {
            297
        }
        height = {
            104
        }
        alt = "" / > < /div> <
        div ref = {
            interfaceMHeader
        }
        className = 'object m-header' > < img src = {
            '/images/whatCreate/interface/mobile-header.webp'
        }
        width = {
            103
        }
        height = {
            29
        }
        alt = "" / > < /div> <
        /div> <
        div ref = {
            interfaceLogo
        }
        className = 'logo' >
        <
        img src = {
            '/images/whatCreate/interface/logo.webp'
        }
        width = {
            33
        }
        height = {
            34
        }
        alt = "" / >
        <
        /div> <
        /div> <
        /div> <
        /div>

        <
        div ref = {
            interfaceSlot
        }
        className = 'interface__slot' >
        <
        Video src = {
            '/video/create/land.mp4'
        }
        poster = {
            '/video/create/land-poster.webp'
        }
        /> <
        /div> <
        /div>

        <
        div ref = {
            interfaceTagContainer
        }
        className = 'interface__tag' >
        <
        div ref = {
            interfaceTag1
        } > UNIQUE GRAPHICS < /div> <
        div ref = {
            interfaceTag2
        } > INTUITIVE UX SOLUTIONS < /div> <
        div ref = {
            interfaceTag3
        } > HOLISTIC UI DESIGNS < /div> <
        div ref = {
            interfaceTag4
        } > CREATIVE APP DESIGNS < /div> <
        /div> <
        /div> <
        /Animate>
    )
}

export default Interface
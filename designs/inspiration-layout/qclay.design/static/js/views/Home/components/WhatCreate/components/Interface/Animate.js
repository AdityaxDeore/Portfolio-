import {
    useTransform
} from "@/Controller/hooks/useTransform"
import {
    screens
} from "../../../../constants"
import {
    itl
} from '@/Animator/js/utils/itl'
import {
    Timeline
} from './timeline'
import {
    isElementVisible
} from '@/Animator/js/coords'

const Animate = ({
        parent,
        target,
        initRefs,
        children
    }) => {
        useTransform({
            onChange,
            onResize
        }, {
            id: screens.WHATCREATE,
            parent,
            target
        })

        function onChange({
            wheel
        }) {
            if (!target.current) {
                return
            }
            if (!isElementVisible(target.current).partable.y) {
                return
            }
            const refs = initRefs()
            if (!refs.mounted) {
                return
            }
            animate({
                wheel,
                ...refs
            })
        }

        function onResize() {}

        function animate(refs) {
            const timeline = Timeline(refs)
            const t = itl(timeline, refs.wheel)
            // console.log(t)

            refs.container.style.transform = `translate3d(${t.container.x}px, ${t.container.y}px, 0) scale(${t.container.scale})`
            refs.view.style.transform = `translate3d(${t.view.x}px, 0, 0)`
            refs.content.style.opacity = t.interface.opacity

            refs.stage1.style.opacity = t.stage1.opacity
            refs.stage2.style.opacity = t.stage2.opacity
            refs.stage3.style.opacity = t.stage3.opacity

            refs.grid.style.opacity = t.grid.opacity

            t.tagContainer.opacity >= .85 ? (
                refs.tagContainer.style.cssText = `
                opacity: 1;
                transform: translate(-50%, 0.625rem) scale(1);
                transition: opacity .5s ease, transform .5s ease;
            `
            ) : (
                refs.tagContainer.style.cssText = `
                opacity: 0;
                transform: translate(-50%, 0.625rem) scale(.5);
                transition: opacity .5s ease, transform .5s ease;
            `
            )


            refs.tag1.style.cssText = `transform: translate3d(0, ${t.tag1.y}%, 0); opacity: ${t.tag1.opacity}`
            refs.tag2.style.cssText = `transform: translate3d(0, ${t.tag2.y}%, 0); opacity: ${t.tag2.opacity}`
            refs.tag3.style.cssText = `transform: translate3d(0, ${t.tag3.y}%, 0); opacity: ${t.tag3.opacity}`
            refs.tag4.style.cssText = `transform: translate3d(0, ${t.tag4.y}%, 0); opacity: ${t.tag4.opacity}`
            refs.mode.style.cssText = `width: ${t.mode.width}px`
            refs.modeTrX.style.transform = `translate3d(${t.mode.x}px, 0, 0)`

            refs.dHeader.style.opacity = t.desktopEl.opacity
            refs.sidebar.style.opacity = t.desktopEl.opacity
            refs.otherOps.style.opacity = t.desktopEl.opacity

            refs.title.style.transform = `translate3d(${t.toCenter.x1}px, 0, 0)`
            refs.row.style.transform = `translate3d(${t.toCenter.x1}px, 0, 0)`
            refs.mOps.style.transform = `translate3d(${-t.toCenter.x2}px, 0, 0)`
            refs.mHeader.style.transform = `translate3d(${-t.toCenter.x2}px, 0, 0)`
            refs.logo.style.transform = `translate3d(${t.toCenter.x2}px, 0, 0)`
            refs.tasks.style.transform = `translate3d(${t.toCenter.x3}px, ${t.toCenter.y3}px, 0)`
            refs.slot.style.transform = `translate3d(${t.toCenter.x3}px, ${t.toCenter.y3}px, 0)`

            refs.cursor1.style.transform = `translate3d(${t.cursor.x1}px, ${t.cursor.y1}px, 0)`
            refs.cursor2.style.transform = `translate3d(${t.cursor.x2}px, ${t.cursor.y2}px, 0)`
            refs.cursor3.style.transform = `translate3d(${t.cursor.x3}px, ${t.cursor.y3}px, 0)`
            refs.cursor4.style.transform = `translate3d(${t.cursor.x4}px, ${t.cursor.y4}px, 0)`
            refs.cursor5.style.transform = `translate3d(${t.cursor.x5}px, ${t.cursor.y5}px, 0)`
            refs.cursor6.style.transform = `translate3d(${t.cursor.x6}px, ${t.cursor.y6}px, 0)`
        }

        function rem(number) {
            return (number / 16) + 'rem'
        }

        return ( < div > {
                children
            } < /div> )
        }

        export default Animate
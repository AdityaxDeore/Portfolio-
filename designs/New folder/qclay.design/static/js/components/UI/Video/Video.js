import './Video.scss'
// import { isElementVisible } from '../../../Animator/js/coords'
import {
    useEffect,
    useRef
} from 'react'
// import { useLoop } from '../../../Animator/js/react/hooks/useLoop'

const Video = ({
    src,
    poster,
    width,
    height
}) => {
    // const [ playing, setPlaying ] = useState( false )
    const video = useRef()
    // useLoop(() => {
    //     if ( !video.current ) { return }
    //     if ( isElementVisible(video.current).partable.y || isElementVisible(video.current).partable.x ) {
    //         if ( !playing ) {
    //             video.current.play()
    //             setPlaying( true )
    //         }
    //     } else {
    //         if ( playing ) {
    //             video.current.pause()
    //             setPlaying( false )
    //         }
    //     }
    // })
    useEffect(() => {
        document.addEventListener('click', () => {
            if (!video.current) {
                return
            }
            video.current.play()
            // setPlaying( true )
        }, {
            once: true
        })
        document.addEventListener('touchstart', () => {
            if (!video.current) {
                return
            }
            video.current.play()
            // setPlaying( true )
        }, {
            once: true
        })
    }, [])
    return ( <
        video className = 'video-component'
        autoPlay = {
            true
        }
        poster = {
            poster
        }
        loop muted playsInline ref = {
            video
        }
        width = {
            width
        }
        height = {
            height
        } >
        <
        source src = {
            src
        }
        type = "video/mp4" / >
        <
        /video>
    )
}

export default Video
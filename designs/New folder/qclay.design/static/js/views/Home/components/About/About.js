import "./About.scss";
import "./Anim.scss";
import Card from "../../../../components/UI/Card/Card";
import {
    $t
} from "@/i18n/i18n";
import {
    useTransform
} from "@/Controller/hooks/useTransform";
import {
    screens
} from '../../constants'
import {
    memo
} from "react";

const About = memo(function About() {
    const {
        parent,
        target
    } = useTransform('horizontalScroll', {
        id: screens.ABOUT,
        minWidth: 576
    })
    const images = {
        "1-about": {
            poster: '/video/about/1-poster.webp',
            video: '/video/about/1.mp4',
        },
        "2-about": {
            poster: '/video/about/2-poster.webp',
            video: '/video/about/2.mp4',
        },
        "3-about": {
            poster: '/video/about/3-poster.webp',
            video: '/video/about/3.mp4',
        }
    }

    return ( <
        section ref = {
            parent
        }
        className = "about"
        id = "about" >
        <
        div ref = {
            target
        }
        className = "scroll" >
        <
        h2 >
        <
        span className = "-tr-12" > {
            $t("pages.about.title_1")
        } < /span> <
        span className = "-tr-13" > {
            $t("pages.about.title_2")
        } < /span> <
        /h2> <
        div className = "cards__container" > {
            $t("pages.about.cards").map((_, i) => ( <
                Card key = {
                    _.id
                }
                index = {
                    i + 1
                }
                color = {
                    _.color
                }
                video = {
                    images[_.id].video
                }
                poster = {
                    images[_.id].poster
                }
                video2 = {
                    images[_.id].video2
                }
                poster2 = {
                    images[_.id].poster2
                }
                title = {
                    _.title
                }
                text = {
                    _.text
                }
                frames = {
                    images[_.id].frames
                }
                />
            ))
        } <
        /div> <
        /div> <
        /section>
    )
})

export default About;
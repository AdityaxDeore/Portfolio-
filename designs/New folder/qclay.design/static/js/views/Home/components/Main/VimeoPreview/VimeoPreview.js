import {
    useEffect,
    useState
} from 'react';
import css from './VimeoPreview.module.scss';

const VimeoPreview = (props) => {
    const [active, setActive] = useState(true);

    useEffect(() => {
        const timerId = setTimeout(() => setActive(false), 8000);
        return () => clearTimeout(timerId);
    }, [])

    if (!active) return null;

    return ( <
        div className = {
            css.preview
        } >
        <
        picture >
        <
        source srcset = "/images/main/home.webp"
        type = "image/webp" / >
        <
        img src = "/images/main/home.webp"
        alt = "preview" / >
        <
        /picture> <
        /div>
    );
}

export default VimeoPreview;
import './PortfolioCircle.scss'
import './Anim.scss'
import cn from 'classnames'
import React from 'react'

const PortfolioCircle = React.forwardRef(({
    className
}, ref) => {
    return ( <
        div ref = {
            ref
        }
        className = {
            cn('portfolio-circle', className)
        } >
        <
        div className = 'circle' > < /div> <
        /div>
    )
})

export default PortfolioCircle
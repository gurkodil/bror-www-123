import * as React from 'react'
import Link from 'gatsby-link'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    href: string,
    children: React.ReactNode
}

const StyledLink = (props: Props) =>
    <span className='custom-link' {...props} ><Link to={props.href}>{props.children}</Link></span>

export default StyledLink

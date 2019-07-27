import React from 'react'
import Link from 'gatsby-link'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    href: string,
}

const StyledLink = (props: Props) =>
    <span className="custom-link" {...props} ><Link to={props.href}>{props.children}</Link></span>

export default StyledLink;
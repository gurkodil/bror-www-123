import React from 'react'
import './link.css'
import Link from 'gatsby-link'

const CustomLink = props =>
    <span className="custom-link" {...props} ><Link to={props.href}>{props.children}</Link></span>


export default CustomLink;
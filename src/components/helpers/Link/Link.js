import React from 'react'
import './link.css'

const Link = props =>
    <span className="custom-link" {...props} ><a href={props.href}>{props.children}</a></span>


export default Link;
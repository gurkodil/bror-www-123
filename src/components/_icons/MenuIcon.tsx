import * as React from 'react'

export default ({
    fill,
    width,
    height,
    className,
    onClick
}: React.SVGAttributes<SVGSVGElement>) =>
    <svg
        onClick={onClick}
        xmlns='http://www.w3.org/2000/svg'
        fill={fill}
        width={width}
        height={height}
        className={className}
        viewBox='0 0 283.46 283.46' >
        <rect x='126.36' width='30.74' height='283.46' />
        <rect x='0' y='126.36' width='283.46' height='30.74' />
    </svg>

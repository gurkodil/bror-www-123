
import * as React from 'react'

interface Props extends React.SVGAttributes<SVGSVGElement> {
    show: boolean
}

export default ({ fill,
    className,
    onClick,
    show
}: Props) =>
    <svg
        onClick={onClick}
        xmlns='http://www.w3.org/2000/svg'
        fill={fill}
        className={className}
        style={{ opacity: show ? 1.0 : 0.0 }}
        viewBox='0 0 222.2 401.8'>
        <rect
            x='-30.6'
            y='275.4'
            transform='matrix(0.7071 -0.7071 0.7071 0.7071 -173.0407 163.7029)'
            width='283.5'
            height='30.7'
        />
        <rect
            x='95.7'
            y='-30.6'
            transform='matrix(0.7071 -0.7071 0.7071 0.7071 -46.0135 111.0865)'
            width='30.7'
            height='283.5'
        />
    </svg>

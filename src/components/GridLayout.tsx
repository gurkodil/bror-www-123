/**
|--------------------------------------------------
| Creates N columns and populates them with
| child elements
|--------------------------------------------------
*/

import React, { Fragment } from 'react'

interface GridLayoutProps {
    children: JSX.Element[]
    columns: number
}

const GridLayout: React.FC<GridLayoutProps> = (props) => {
    const { columns, children } = props
    
    const nrOfRows = Math.ceil(children.length / columns)
    const remainer = children.length % columns

    const getColumnSize = (columnIndex: number): number => 
        nrOfRows + (columnIndex < remainer || remainer === 0 ? 0 : -1)
    
    const gridElements = Array.from({length: columns}, (_, columnIndex) => 
        <div 
            key={`column${columnIndex}`} 
        >
            {
                Array.from({ length: getColumnSize(columnIndex) }, (__, rowInColumn) =>
                    <Fragment key={`${rowInColumn}-${columnIndex}`} >
                        {children[rowInColumn * columns + columnIndex]}
                    </Fragment>)
            }
        </div>)
    
    return (
        <main {...props}>
            {gridElements}
        </main>
    )
}

export default GridLayout

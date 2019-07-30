import React from 'react'
import PropTypes from 'prop-types'


const GridLayout = (props) => {
    const columnWrapper = {}
    const result = []
    const { className } = props

    // create columns
    for (let i = 0; i < props.columns; i++) {
        columnWrapper[`column${i}`] = []
    }

    for (let i = 0; i < props.children.length; i++) {
        const columnIndex = i % props.columns
        columnWrapper[`column${columnIndex}`].push(
            <div key={i} style={{ marginBottom: `${props.gap}vw` }}>
                {props.children[i]}
            </div>
        )
    }

    for (let i = 0; i < props.columns; i++) {
        result.push(
            <div
                key={`col${i}`}
                style={{
                    flex: 1,
                }}>
                {columnWrapper[`column${i}`]}
            </div>,
        )
    }

    return (
        <div style={{ display: 'flex' }} className={className}>
            {result}
        </div>
    )
}

GridLayout.propTypes = {
    className: PropTypes.string,
    columns: PropTypes.number.isRequired,
    gap: PropTypes.number.isRequired,
    children: PropTypes.ReactNode,
}

export default GridLayout

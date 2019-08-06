import * as React from 'react'
import PropTypes from 'prop-types'
import GridLayout from '../../../components/GridLayout'

export default class PreviewOrder extends React.Component {

    state = {
        gridItems: undefined
    }

    render() {
        const { value } = this.props
        const gridItems = value.toJS()
        if (!gridItems) {
            return <p>Haha...</p>
        }

        if (gridItems.length === 0) {
            return <p>No project added yet!</p>
        }

        return (
            <GridLayout columns={2} gap={0} className="grid">
                {gridItems.map((gridItem, index) =>
                    <figure
                        key={`gridKey${index}`}
                        style={{ height: 'auto' }}
                    >
                        <img
                            style={{ width: '100%' }}
                            src={gridItem.thumbnail}
                            alt={gridItem.title}
                        />
                        <figcaption style={{ textAlign: 'center', fontFamily: 'Nitti Normal, Lato, sans-serif', fontSize: '12px' }}>{gridItem.title}</figcaption>
                    </figure>
                )}
            </GridLayout>
        )
    }
}

PreviewOrder.propTypes = {
    value: PropTypes.object
}

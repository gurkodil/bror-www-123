import React from 'react'
import GridLayout from '../../../components/helpers/GridLayout'//' //../../../../components/helpers/GridLayout'
export default class PreviewOrder extends React.Component {

    state = {
        gridItems: undefined
    }

    componentWillReceiveProps(props) {
        const { value } = props
        console.log("VALUE", value.toJS())
        console.log("PROPSFIELD", props.field.toJS())
        console.log("PROPSENTRY", props.entry.toJS())

        if (Array.isArray(value)) {
            this.setState({
                gridItems: value
            })
        } else {
            this.setState({
                gridItems: value.toJS()
            })
        }
    }

    render() {
        const { gridItems } = this.state
        if (!gridItems || gridItems.length === 0) {
            return <p>No project added yet!</p>
        }

        return (
            <GridLayout columns={3} gap={5} className="grid">
                {gridItems.map((gridItem, index) =>
                    <figure
                        key={`gridItenKeyla${index}`}
                        style={{ height: 'auto' }}
                    >
                        <img
                            style={{ width: '100%' }}
                            src={gridItem.thumbnail}
                            alt={gridItem.title}
                        />
                        <figcaption>{gridItem.title}</figcaption>
                    </figure>
                )}
            </GridLayout>
        )
    }
}
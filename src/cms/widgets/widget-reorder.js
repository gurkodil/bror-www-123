import * as React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from '@emotion/styled'

import { reorder, diff } from './utils'

const StyledBackground = styled.div`
  background: ${({ isDraggingOver }) =>
        isDraggingOver ? 'lightblue' : '#dedee2'};
  border-radius: 0.25rem;
  border-top-left-radius: 0;
  padding: 1rem;
  max-width: 24rem;
  box-sizing: border-box;
`

const StyledItem = styled.div`
  background: #fff;
  color: #222;
  border-radius: 0.25rem;
  padding: 0.5rem;
  box-sizing: border-box;
  margin-bottom: 0.25rem;
  box-shadow: ${({ isDragging }) =>
        isDragging
            ? '0 6px 12px 0 rgba(0, 0, 0, 0.4)'
            : '0 2px 6px 0 rgba(0, 0, 0, 0.2)'};
`

export class OrderWidget extends React.Component {
    state = {
        data: [],
        payload: undefined
    }
    async componentDidMount() {
        const { query, forID, value, onChange } = this.props
        console.log("Component did mount!!")
        console.log("query", query)
        console.log("forID", forID)
        console.log("value", value)
        console.log("onChange", onChange)


        //                                collection  id field    empty search: return all entries
        //                                vvvvvvvv    vvvvvvvv   vv
        const result = await query(forID, 'project', ['identifier'], '')

        console.log("RESULT", result.payload)
        const data = result.payload.response.hits.map(payload => {
            // useful data to display
            // vvvvvv
            const { thumbnail, title } = payload.data
            console.log("THUMBNAIL", thumbnail)
            console.log("title", title)

            return {
                title,
                thumbnail
            }
        })

        const currentOrder = value.toJS()
        console.log("CURRENT ORDER", currentOrder)
        const { newOrder, changed } = diff({
            currentOrder,
            data,
            key: 'title',
        })

        console.log("NEW ORDER", newOrder)
        console.log("CHANGED", changed)

        this.setState({ data: newOrder })
        if (changed) onChange(newOrder)
    }

    handleDragEnd = result => {
        const { onChange } = this.props

        if (!result.destination) return

        const { data } = this.state
        const sortedData = reorder(
            data,
            result.source.index,
            result.destination.index
        )

        this.setState({
            data: sortedData,
        })

        onChange(sortedData)
    }

    render() {
        const { data } = this.state
        if (data.length === 0) return <div>loading... great stuff</div>
        return (
            <DragDropContext onDragEnd={this.handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <StyledBackground
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            ref={provided.innerRef}
                        >
                            {data.map((item, i) => (
                                <Draggable
                                    key={item.title}
                                    draggableId={item.title}
                                    index={i}
                                >
                                    {(provided, snapshot) => (
                                        <StyledItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            isDragging={snapshot.isDragging}
                                        >
                                            <figure>
                                                <img src={item.thumbnail} alt={item.title} />
                                                <figcaption>{item.title}</figcaption>
                                            </figure>
                                        </StyledItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </StyledBackground>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}
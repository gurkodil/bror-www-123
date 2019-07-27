import * as React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from '@emotion/styled'
import { fromJS } from 'immutable'
import { reorder, diff } from '../utils'

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
  border-radius: 0rem;
  padding: 0.2rem;
  box-sizing: border-box;
  margin-bottom: 0.25rem;
  box-shadow: ${({ isDragging }) =>
        isDragging
            ? '0 6px 12px 0 rgba(0, 0, 0, 0.4)'
            : '0 2px 6px 0 rgba(0, 0, 0, 0.2)'};
`

export default class OrderWidget extends React.Component {

    state = {
        data: [],
    }

    async componentDidMount() {
        const { query, forID, value, onChange } = this.props

        // (forID, 'collectionName', ['idField'],
        // const result = await query(forID, 'project', ['title'], '')
        console.log("RESULT SLUG", "HEJ")

        const result = await query(forID, 'slug', ['slug'], '')
        console.log("RESULT SLUG", result)


        const data = result.payload.response.hits.map(payload => {
            const { thumbnail, title } = payload.data
            return {
                title,
                thumbnail
            }
        })

        if (!value) {
            onChange(data)
            this.setState({ data })
            return
        }

        const currentOrder = value.toJS()
        const { newOrder, changed } = diff({
            data,
            currentOrder,
            key: 'title',
        })

        this.setState({ data: newOrder })
        if (changed) onChange(fromJS(newOrder))
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

        onChange(fromJS(sortedData))
    }

    render() {
        const { data } = this.state
        if (data.length === 0) return <div>loading...</div>
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
                                            <div>
                                                <img style={{ width: '50px', height: '50px', verticalAlign: 'middle' }} src={item.thumbnail} alt={item.title} />
                                                <span style={{ margin: '10px' }}>{item.title}</span>                                            </div>
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
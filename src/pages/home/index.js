import React from 'react'
import { graphql } from 'gatsby'
import './home-page.css'

import GridLayout from '../../components/helpers/GridLayout'
import useWindowDimensions from '../../components/helpers/useWindowDimensions'
import Menu from '../../components/Menu/Menu'
import Title from '../../components/Title/Title'
import AOS from 'aos/dist/aos'

AOS.init({
    offset: 20,
    duration: 1550,
})

export default ({ data }) => {
    const { allMarkdownRemark } = data
    const { width } = useWindowDimensions();

    const gridItems = allMarkdownRemark.edges.map(edge => {
        const title = edge.node.frontmatter.title
        const thumbnail = edge.node.frontmatter.thumbnail
        const id = edge.node.id
        return {
            id,
            title,
            thumbnail
        }
    })

    AOS.refresh()
    let cols = width < 770 ? 2 : 3
    let gap = cols === 3 ? 5 : 3

    return (
        <React.Fragment>
            <Menu />
            <Title />
            <GridLayout columns={cols} gap={gap} className="grid">
                {gridItems.map((gridItem, index) =>
                    <div
                        // onClick={() => history.push(textToReadableUrl(gridItem.title))}
                        className="gridItem"
                        key={`gridItenKey${index}`}
                        style={{ height: 'auto' }}
                    >
                        <img data-aos="fade-up" style={{ width: '100%' }} src={gridItem.thumbnail} alt={gridItem.title}></img>
                        <p data-aos="fade-up">{gridItem.title}</p>
                    </div>
                )}
            </GridLayout>
        </React.Fragment>
    )
}

export const allProjectsQuery = graphql`
query allProjectsQuery {
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "projects-page"}}}) {
      edges {
        node {
          id
          frontmatter {
            title
            thumbnail
          }
        }
      }
    }
  }
`


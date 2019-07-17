import React from 'react'
import { graphql } from 'gatsby'

import GridLayout from '../../components/helpers/GridLayout'
import Layout from '../../components/Layout'
import AOS from 'aos/dist/aos'
import { navigateTo } from 'gatsby-link';

class HomePageGrid extends React.Component {

    constructor(props) {
        super(props)
        const { data } = props
        const { allMarkdownRemark } = data

        const gridItems = allMarkdownRemark.edges.map(edge => {
            const title = edge.node.frontmatter.title
            const slug = edge.node.fields.slug
            const thumbnail = edge.node.frontmatter.thumbnail
            const id = edge.node.id
            return {
                id,
                title,
                thumbnail,
                slug
            }
        })

        this.state = {
            windowMounted: false,
            gridItems
        }
    }

    getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window
        return {
            width,
            height
        }
    }

    componentDidMount() {
        AOS.init({
            offset: 20,
            duration: 1550,
        })

        this.setState({
            windowMounted: true
        })
    }

    render() {

        if (!this.state.windowMounted) {
            return null
        }
        AOS.refresh()
        const { gridItems } = this.state
        const { width } = this.getWindowDimensions()

        let cols = width < 770 ? 2 : 3
        let gap = cols === 3 ? 5 : 3

        return (
            <Layout>
                <GridLayout columns={cols} gap={gap} className="grid">
                    {gridItems.map((gridItem, index) =>
                        <figure onClick={() => navigateTo(gridItem.slug)}
                            // onClick={() => history.push(textToReadableUrl(gridItem.title))}
                            // className="gridItem"
                            key={`gridItenKey${index}`}
                            style={{ height: 'auto' }}
                        >
                            <img data-aos="fade-up" style={{ width: '100%' }} src={gridItem.thumbnail} alt={gridItem.title} />
                            <figcaption data-aos="fade-up">{gridItem.title}</figcaption>
                        </figure>
                    )}
                </GridLayout>
            </Layout>
        )
    }
}

export default HomePageGrid

export const allProjectsQuery = graphql`
query allProjectsQuery {
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "projects-page"}}}) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail
          }
        }
      }
    }
  }
`


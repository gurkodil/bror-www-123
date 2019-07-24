import React from 'react'
import { graphql } from 'gatsby'

import GridLayout from '../../components/helpers/GridLayout'
import Layout from '../../components/Layout'
import { navigateTo } from 'gatsby-link'
import AOS from 'aos'
import "aos/dist/aos.css"

class HomePageGrid extends React.Component {

    constructor(props) {
        super(props)
        const { data } = props
        const { allMarkdownRemark } = data

        AOS.init({
            offset: 20,
            duration: 1550,
        })

        /**
         * Get all unsorted projects
         */
        const gridItems = allMarkdownRemark.edges
            .filter(edge => /\/home\/[/.a-zA-Z0-9-]+$/.test(edge.node.fields.slug))
            .map(edge => {
                const slug = edge.node.fields.slug
                const title = edge.node.frontmatter.title
                const thumbnail = edge.node.frontmatter.thumbnail
                return ({
                    title,
                    thumbnail,
                    slug
                })
            })

        /**
         * Get the order of the projects
         */
        const order = allMarkdownRemark.edges
            .filter(edge => edge.node.fields.slug === "/settings/")
            .map(edge => edge.node.frontmatter.projectPreviews.map(prev => {
                return {
                    title: prev.title
                }
            }))
            .flat()

        /**
         * Order the projects
         */
        order && order.forEach((item, index) => {
            for (let i = gridItems.length - 1; i >= 0; i--) {
                if (gridItems[i].title === item.title) {
                    const elm = gridItems[i]

                    gridItems[i] = gridItems[index]
                    gridItems[index] = elm
                }
            }
        })

        this.state = {
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

    componentWillReceiveProps() {
        AOS.refresh()
    }

    render() {
        const { gridItems } = this.state
        const { width } = this.getWindowDimensions()

        let cols = width < 770 ? 2 : 3
        let gap = cols === 3 ? 5 : 3

        return (
            <Layout>
                <GridLayout columns={cols} gap={gap} className="grid">
                    {gridItems.map((gridItem, index) =>
                        <figure onClick={() => navigateTo(gridItem.slug)}
                            key={`gridItemKey${index}`}
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
    allMarkdownRemark(filter: {frontmatter: {templateKey: {regex: "/(projects|settings)-page/"}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            projectPreviews {
              title
              thumbnail
            }
            title
            thumbnail
          }
        }
      }
    }
  }
`
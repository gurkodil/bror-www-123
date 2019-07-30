import React from 'react'
import { graphql } from 'gatsby'
import AOS from 'aos'
import { navigate } from 'gatsby-link'
import Img from 'gatsby-image'
import GridLayout from '../../components/GridLayout'
import Layout from '../../components/Layout'
import "aos/dist/aos.css"

class HomePageGrid extends React.Component {

    constructor(props) {
        super(props)
        const { data } = props
        const { allMarkdownRemark } = data

        this.aos = AOS

        /**
         * Get all unsorted projects
         */
        const gridItems = allMarkdownRemark.edges
            .map(edge => {
                const { slug } = edge.node.fields
                const { thumbnail, title } = edge.node.frontmatter
                const { gridPosition } = edge.node.fields
            
                return ({
                    title,
                    thumbnail: thumbnail.childImageSharp,
                    slug,
                    gridPosition,
                })
            })
            .sort((a, b) => a.gridPosition > b.gridPosition)

        this.state = {
            gridItems,
            windowInitialized: false
        }
    }

    componentDidMount() {
        this.aos.init({
            offset: 20,
            duration: 1550,
        })

        this.setState({
            windowInitialized: true
        })
    }

    getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window
        return {
            width,
            height,
        }
    }

    componentWillReceiveProps() {
        this.aos.refresh()
    }

    render() {
        if (!this.state.windowInitialized) return null
        const { gridItems } = this.state
        const { width } = this.getWindowDimensions()

        const cols = width < 770 ? 2 : 3
        const gap = cols === 3 ? 5 : 3

        return (
            <Layout>
                <GridLayout columns={cols} gap={gap} className="grid">
                    {gridItems.map((gridItem, index) =>
                        <figure data-aos="fade-up" onClick={() => navigate(gridItem.slug)} className={'gridItem'}
                            key={`gridItemKey${index}`}
                        >
                            <Img style={{ width: '100%' }} fluid={gridItem.thumbnail.fluid} alt={gridItem.title} />
                            <figcaption>{gridItem.title}</figcaption>
                        </figure>
                    )}
                </GridLayout>
            </Layout >
        )
    }
}

export default HomePageGrid

export const allProjectsQuery = graphql`
query queryGrid {
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "projects-page"}}}) {
      edges {
        node {
          fields {
            slug
            gridPosition
          }
          frontmatter {
            title
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 720) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`


// `
// query allProjectsQuery {
//     allMarkdownRemark(filter: {frontmatter: {templateKey: {regex: "/(projects|settings)-page/"}}}) {
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             projectPreviews {
//               title
//               thumbnail
//             }
//             title
//             thumbnail
//           }
//         }
//       }
//     }
//   }
// `
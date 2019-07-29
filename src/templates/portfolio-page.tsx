import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import ProjectPage from './projects-page'

/**
 * Renders all projects included in the portfolio via @template ProjectPage
 */
const PortfolioPage = () => {
    return (<StaticQuery
        query={graphql`
    query allPortfoliosQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "projects-page"} includeInPortfolio: {eq: true}}}) {
          edges {
            node {
              frontmatter {
                title
                images
              }
            }
          }
        }
      }
    `}
        render={(data) => {
            const edges = data.allMarkdownRemark.edges
            return (
                edges.map((edge: PropsEdge, i: number) =>
                    <ProjectPage key={`portIndex${i}`} images={edge.node.frontmatter.images} />)
            )
        }}
    />)
}

interface PropsEdge {
    node: {
        frontmatter: {
            images: string[]
        }
    }
}

export default PortfolioPage

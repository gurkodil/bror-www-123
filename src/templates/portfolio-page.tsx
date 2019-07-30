import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import ProjectPage from './projects-page'

/**
 * Renders all projects included in the portfolio via @template ProjectPage
 */
const PortfolioPage = (): React.ReactNode => {
    return (<StaticQuery
        query={graphql`
    query allPortfoliosQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "projects-page"} includeInPortfolio: {eq: true}}}) {
          edges {
            node {
              frontmatter {
                title
              }
              childrenFile {
                childImageSharp {
                    sizes(maxWidth: 1240) {
                        ...GatsbyImageSharpSizes
                      }
                }
              }
            }
          }
        }
      }
    `}
        render={(data) => {
            const {edges} = data.allMarkdownRemark
            return (
                <div>
                    {
                        edges.map((edge: PropsEdge, i: number) =>
                            <ProjectPage key={`portIndex${i}`} images={edge.node.childrenFile} />)
                    }
                </div>
            )
        }}
    />)
}

interface PropsEdge {
    node: {
        childrenFile: any[]
    }
}

export default PortfolioPage

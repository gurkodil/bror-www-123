/**
|--------------------------------------------------
| Renders multiple projects that are marked are
| part of the portfolio.
|--------------------------------------------------
*/

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ProjectPageTemplate as Template } from './projects-page'
import Layout from '../components/Layout'
import { PortfolioPageProps, FluidImage } from '../interfaces/gatsby-image.interface'


const PortfolioPage = (): React.ReactNode => {
    const processQueryData = (data: PortfolioPageProps): FluidImage[][] => {
        return data.allMarkdownRemark.edges
            .map(edge => 
                edge.node.childrenFile
                    .map(file => file.childImageSharp.fluid))
    }
    
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
                    fluid(maxWidth: 1200) {
                        ...GatsbyImageSharpFluid
                    }
                }
              }
            }
          }
        }
      }
    `}
        render={(data: PortfolioPageProps) => {
            const allImages = processQueryData(data)

            return (
                <Layout>
                    { 
                        allImages.map((images, i: number) => 
                            <Template key={`p-${i}`} images={images} />)
                    }
                </Layout>
            )
        }}
    />)
}

export default PortfolioPage

import * as React from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

export const InfoPageTemplate = ({ content }: any) => {

    return (
        <section className='info-container'>
            <HTMLContent
                className='text-container' 
                content={ { __html: content }} 
            />
        </section>
    )
}

const InfoPage = ({ data }: any) => {
    const { markdownRemark: post } = data
    const { html } = post

    return (
        <Layout>
            <InfoPageTemplate content={html} />
        </Layout>
    )
}

export default InfoPage

export const infoPageQuery = graphql`
  query InfoPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`

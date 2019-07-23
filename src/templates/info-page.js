import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content from '../components/Content'

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
    const PageContent = contentComponent || Content

    return (
        <section className="section section--gradient">
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="section">
                            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                                {title}
                            </h2>
                            <PageContent className="content" content={content} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

AboutPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
    const { markdownRemark: post } = data
    const title = post.frontmatter.title
    const html = post.html

    console.log(html)
    return (
        <Layout>
            <h5>{title}</h5>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
        </Layout>
    )
}

AboutPage.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query InfoPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`

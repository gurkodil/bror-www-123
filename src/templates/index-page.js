import React from 'react'
import { navigateTo } from 'gatsby-link'
import Layout from '../components/Layout'

const SplashPage = ({ data }) => {
    const { markdownRemark } = data
    const title = markdownRemark.frontmatter.title
    const videoUrl = markdownRemark.frontmatter.video

    return (
        <Layout exludeNavBar={true}>
            <div className="parent" onClick={() => navigateTo('/home/')}>
                <h1 className="gradient2">{title}</h1>
                {videoUrl && <video playsInline="" autoPlay muted="" loop poster="" id="bgvid">
                    <source
                        src={videoUrl}
                        type="video/mp4" />
                </video>}
            </div>
        </Layout>
    )
}

export default SplashPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        video 
      }
    }
  }
`

import * as React from 'react'
import { navigateTo } from 'gatsby-link'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const SplashPage = ({ data }: any) => {
    const { markdownRemark } = data
    const { title } = markdownRemark.frontmatter
    const { video: videoUrl } = markdownRemark.frontmatter

    return (
        <Layout exludeNavBar={true}>
            <div className='parent' onClick={() => navigateTo('/home/')}>
                <h1 className='gradient2'>{title}</h1>
                {videoUrl && 
                <video 
                    playsInline={true}
                    autoPlay 
                    muted
                    loop
                    poster=''
                    id='bgvid'>
                    <source
                        src={videoUrl === 'BAD_URL' ? 
                            'https://files.cargocollective.com/c113847/splash_folio.mov' 
                            : videoUrl}
                        type='video/mp4' />
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

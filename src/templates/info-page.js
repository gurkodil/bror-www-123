import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

export const InfoPageTemplate = ({ title, content, contentComponent }) => {
    const PageContent = contentComponent || HTMLContent

    return (
        <section className="info-container">
            <PageContent className="text-container" content={content} />
        </section>
    )
}

InfoPageTemplate.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
}

const InfoPage = ({ data }) => {
    const { markdownRemark: post } = data
    const html = post.html

    console.log(html)
    return (
        <Layout>
            <InfoPageTemplate content={html} />
        </Layout>
    )
}

InfoPage.propTypes = {
    data: PropTypes.object.isRequired,
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
// import React from 'react'
// import PropTypes from 'prop-types'
// import { graphql } from 'gatsby'
// import Layout from '../components/Layout'
// import { HTMLContent } from '../components/Content'

// interface InfoTemplateProps {
//     title?: String | undefined,
//     content: PropTypes.Requireable<PropTypes.ReactNodeLike>,
//     contentComponent?: Function
// }

// interface InfoPageProps {
//     data: {
//         markdownRemark: {
//             frontmatter: {
//                 title: String
//             }
//             html: PropTypes.Requireable<PropTypes.ReactNodeLike>
//         },
//     }
// }

// export const InfoPageTemplate = ({ title, content, contentComponent }: InfoTemplateProps) => {
//     const PageContent = contentComponent || HTMLContent

//     return (
//         <section className="info-container">
//             <PageContent className="text-container" content={{ __html: content }} />
//         </section>
//     )
// }



// const InfoPage = ({ data }: InfoPageProps) => {
//     const { markdownRemark: post } = data
//     const html = post.html

//     console.log(html)
//     return (
//         <Layout>
//             <InfoPageTemplate content={html} />
//         </Layout>
//     )
// }

// InfoPage.propTypes = {
//     data: PropTypes.object.isRequired,
// }

// export default InfoPage

// export const infoPageQuery = graphql`
//   query InfoPage($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//   }
// `

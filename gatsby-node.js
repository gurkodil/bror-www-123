const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions

    return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()))
            return Promise.reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        posts.forEach(edge => {
            const id = edge.node.id
            const slug = edge.node.fields.slug
            console.log(slug)
            if (slug === "/settings/") return;
            createPage({
                path: slug,
                tags: edge.node.frontmatter.tags,
                component: path.resolve(
                    `src/templates/${String(edge.node.frontmatter.templateKey)}${edge.node.frontmatter.templateKey === 'projects-page' ? '.tsx' : '.tsx'}`
                ),
                // additional data can be passed via context
                context: {
                    id,
                },
            })
        })

        createPage({
            path: "/portfolio/",
            component: path.resolve(`src/templates/portfolio-page.tsx`)
        })

        // // Tag pages:
        // let tags = []
        // // Iterate through each post, putting all found tags into `tags`
        // posts.forEach(edge => {
        //     if (_.get(edge, `node.frontmatter.tags`)) {
        //         tags = tags.concat(edge.node.frontmatter.tags)
        //     }
        // })
        // // Eliminate duplicate tags
        // tags = _.uniq(tags)

        // // Make tag pages
        // tags.forEach(tag => {
        //     const tagPath = `/tags/${_.kebabCase(tag)}/`

        //     createPage({
        //         path: tagPath,
        //         component: path.resolve(`src/templates/tags.js`),
        //         context: {
        //             tag,
        //         },
        //     })
        // })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    fmImagesToRelative(node) // convert image paths for gatsby images

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}
// const _ = require('lodash')
// const path = require('path')
// const { createFilePath } = require('gatsby-source-filesystem')
// const { fmImagesToRelative } = require('gatsby-remark-relative-images')


// // function getUUIDfromString(str) {
// //     const regexUUID = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[~\d]*/
// //     const arr = regexUUID.exec(str)
// //     return arr[0]
// // }

// // function createImageNode(params) {
// //     const { url, uuid, createNode, createNodeField, createNodeId, store, cache } = params
// //     createRemoteFileNode({
// //         url,
// //         cache,
// //         store,
// //         createNode,
// //         createNodeId,
// //         ext: '.jpg'
// //     }).then(fileNode => {
// //         Promise.all([
// //             createNodeField({
// //                 node: fileNode,
// //                 name: 'RemoteLoadedImage',
// //                 value: 'true',
// //             }),
// //             createNodeField({
// //                 node: fileNode,
// //                 name: 'link',
// //                 value: url,
// //             }),
// //             createNodeField({
// //                 node: fileNode,
// //                 name: "uuid",
// //                 value: uuid,
// //             })])
// //             .then(res => {
// //                 console.log("RESULT node fields", res)
// //             })
// //             .catch(err => {
// //                 console.warn("Error during crate node field", err)
// //             })
// //     })
// //         .catch(err => {
// //             console.log("Error during create node field", err)
// //         })
// // }


// // function createImagePath(params) {
// //     const { edge, createNode, createNodeField, createNodeId, store, cache } = params
// //     const { images, thumbnail } = edge.node.frontmatter

// //     const thumbUUID = getUUIDfromString(thumbnail)
// //     createImageNode({
// //         url: `${thumbnail}-/format/jpg/'`,
// //         uuid: thumbUUID,
// //         createNode,
// //         createNodeField,
// //         createNodeId,
// //         store,
// //         cache,
// //     })
// //     images.forEach((image) => {
// //         const imageUUID = getUUIDfromString(image)
// //         console.log("IMAGE", image)
// //         console.log("IMAGE UUID", imageUUID)
        
// //     })

// // }


// exports.createPages = ({ actions, graphql, store, createNodeId, cache }) => {
//     const { createPage, createNode, createNodeField } = actions
//     return graphql(`
//     {
//       allMarkdownRemark(limit: 1000) {
//         edges {
//           node {
//             id
//             fields {
//               slug
//             }
//             frontmatter {
//               tags
//               templateKey
//               images
//               thumbnail
//             }
//           }
//         }
//       }
//     }
//   `).then(result => {
//         if (result.errors) {
//             result.errors.forEach(e => console.error(e.toString()))
//             return Promise.reject(result.errors)
//         }

//         const posts = result.data.allMarkdownRemark.edges

//         posts.forEach(edge => {
//             const { id } = edge.node
//             const { slug } = edge.node.fields
//             if (slug === '/settings/') return
            
//             createPage({
//                 path: slug,
//                 tags: edge.node.frontmatter.tags,
//                 component: path.resolve(
//                     `src/templates/${String(edge.node.frontmatter.templateKey)}${edge.node.frontmatter.templateKey === 'projects-page' ? '.js' : '.tsx'}`
//                 ),
//                 // additional data can be passed via context
//                 context: {
//                     id,
//                 },
//             })
//         })

//         createPage({
//             path: "/portfolio/",
//             component: path.resolve(`src/templates/portfolio-page.tsx`)
//         })

//         // // Tag pages:
//         // let tags = []
//         // // Iterate through each post, putting all found tags into `tags`
//         // posts.forEach(edge => {
//         //     if (_.get(edge, `node.frontmatter.tags`)) {
//         //         tags = tags.concat(edge.node.frontmatter.tags)
//         //     }
//         // })
//         // // Eliminate duplicate tags
//         // tags = _.uniq(tags)

//         // // Make tag pages
//         // tags.forEach(tag => {
//         //     const tagPath = `/tags/${_.kebabCase(tag)}/`

//         //     createPage({
//         //         path: tagPath,
//         //         component: path.resolve(`src/templates/tags.js`),
//         //         context: {
//         //             tag,
//         //         },
//         //     })
//         // })
//     })
// }


// exports.onCreateNode = ({ node, actions, getNode }) => {
//     const { createNodeField } = actions
//     fmImagesToRelative(node) // convert image paths for gatsby images

//     if (node.internal.type === `MarkdownRemark`) {
//         const value = createFilePath({ node, getNode })
//         createNodeField({
//             name: `slug`,
//             node,
//             value,
//         })
//     }
// }

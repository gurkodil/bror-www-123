// my-instagram-feed/gatsby-node.js
/* eslint-disable */
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
// import { get } from 'axios';

// Replace ACCESS_TOKEN with your Instagram token

function getUUIDfromString(str) {
    const regexUUID = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[~\d]*/
    const arr = regexUUID.exec(str)
    return arr[0]
}


exports.onCreateNode = async ({
    node,
    store,
    getNodes,
    cache,
    actions: { createNode, createNodeField, createParentChildLink },
    createNodeId,
}) => {
    if (node.frontmatter && node.frontmatter.templateKey === 'projects-page') {
        const { thumbnail: thumbnailUrl, images: ImageUrls, title: projectName } = node.frontmatter
        const orderNode = getNodes()
            .find(node => node.frontmatter
                && node.frontmatter.templateKey == 'settings-page')

        const maxGridIndex = orderNode && orderNode.frontmatter.projectPreviews.length
        const gridIndex = orderNode && orderNode.frontmatter.projectPreviews.findIndex(preview => preview.title === projectName)

        await createNodeField({
            node: node,
            name: 'gridPosition',
            value: gridIndex != -1 ? gridIndex : maxGridIndex,
        })

        const thumbnailUUID = getUUIDfromString(thumbnailUrl)

        let thumbnailNode;
        try {
            thumbnailNode = await createRemoteFileNode({
                url: thumbnailUrl,
                store,
                cache,
                createNode,
                createNodeId: () => `thumb~${thumbnailUUID}`,
            });

            if (thumbnailNode) {
                delete node.frontmatter.thumbnail
                console.log("DELETED NODE WITH ID", thumbnailNode.id)
                node.frontmatter.thumbnail___NODE = thumbnailNode.id
            }
        } catch (e) {
            // Ignore
            console.warn("Error thumbnode", e)
        }

        //   node.children = []



        for (let i = 0; i < ImageUrls.length; i++) {
            const imageUrl = ImageUrls[i]
            let fileNode;
            const imageUUID = getUUIDfromString(thumbnailUrl)

            try {
                fileNode = await createRemoteFileNode({
                    url: `${imageUrl}`,
                    store,
                    cache,
                    createNode,
                    createNodeId: () => `projectImage_${imageUUID}_${projectName.trim().replace(' ', '_')}-${i}`,
                });

                if (fileNode) {
                    createParentChildLink({ parent: node, child: fileNode });
                }
            } catch (error) {
                console.warn('error creating node', error);
            }
        }
    }
}

// exports.sourceNodes = async ({ actions, store, cache, createNodeId, getNodes }) => {
//     const { createNode, createNodeField } = actions
//     // Fetch data

//     const projectNodes = getNodes().filter(node => 
//         node.frontmatter
//         && node.frontmatter.templateKey === 'projects-page')

//     for (const node of projectNodes) {
//         const { thumbnail: thumbnailUrl, images: ImageUrls } = node.frontmatter
//         ImageUrls.push(thumbnailUrl)

//         for (const imageUrl of ImageUrls) {
//             const uuid = getUUIDfromString(imageUrl)

//             if (!uuid) return

//             let fileNode
//             try {
//                 fileNode = await createRemoteFileNode({
//                 // parentNodeId: node.id,
//                 // Add split so createRemoteFileNode creates the correct extension
//                 // (Instagram sometimes adds additional url params causing this bug)
//                 url: `${imageUrl}-/format/jpg/`,
//                 cache,
//                 store,
//                 createNode,
//                 createNodeId: id => uuid,
//                 ext: ".jpg",
//                 })
//                 // TODO: add additional fields
//                 await createNodeField({
//                 node: fileNode,
//                 name: 'RemoteImage',
//                 value: 'true',
//                 })
//             } catch (error) {
//                 console.warn('error creating node', error)
//             }
//         }

//     }
//     // use for loop for async/await support


//   }
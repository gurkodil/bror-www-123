import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
// import Layout from '../components/Layout'
import Content from '../components/Content'
import './project-page.css'
import Title from '../components/Title/Title'
import Menu from '../components/Menu/Menu'
import ArrowIcon from '../components/_icons/ArrowIcon'


export const ProjectPostTemplate = ({
    content,
    contentComponent,
    description,
    tags,
    title,
    helmet,
}) => {
    const PostContent = contentComponent || Content

    return (
        <section className="section">
            {helmet || ''}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            {title}
                        </h1>
                        <p>{description}</p>
                        <PostContent content={content} />
                        {tags && tags.length ? (
                            <div style={{ marginTop: `4rem` }}>
                                <h4>Tags</h4>
                                <ul className="taglist">
                                    {tags.map(tag => (
                                        <li key={tag + `tag`}>
                                            <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    )
}

// ProjectPostTemplate.propTypes = {
//     content: PropTypes.node.isRequired,
//     contentComponent: PropTypes.func,
//     description: PropTypes.string,
//     title: PropTypes.string,
//     helmet: PropTypes.object,
// }

// const ProjectPage = ({ data }) => {
//     const { markdownRemark: post } = data
//     const title = post.frontmatter.title
//     const images = post.frontmatter.images
//     console.log(images)
//     return (
//         <Fragment>
//             <h1>Title: {title}</h1>
//             {images.map((image, index) => <img src={image} alt={`${title}-${index}`}></img>)}
//         </Fragment>
//         // <Layout>
//         // </Layout>
//     )
// }

// ProjectPost.propTypes = {
//     data: PropTypes.shape({
//         markdownRemark: PropTypes.object,
//     }),
// }


export const projectsPageQuery = graphql`
    query ProjectById($id: String!) {
        markdownRemark(id: {eq: $id}) {
        frontmatter {
            title
            images
        }
        }
    }  
`
// export const ProjectPage

class ProjectPage extends React.Component {

    constructor(props) {
        super(props)
        const images = props.data.markdownRemark.frontmatter.images



        // const projectKey = props.match.params.project
        // const projectImages = projects[projectKey]
        this.state = {
            imageIndex: 0,
            projectImages: images,
            isUsingKeys: false
        }
        this.nextImage = this.nextImage.bind(this)
        this.prevImage = this.prevImage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    nextImage() {
        this.setState(prevState => {
            return {
                imageIndex: prevState.imageIndex + 1 < prevState.projectImages.length ?
                    prevState.imageIndex + 1 : 0
            }
        })
    }

    prevImage() {
        this.setState(prevState => {
            return {
                imageIndex: prevState.imageIndex === 0 ?
                    prevState.projectImages.length - 1 : prevState.imageIndex - 1
            }
        })
    }

    handleKeyPress({ key }) {

        const useKeys = () => {
            this.setState({
                isUsingKeys: true
            })
        }

        switch (key.toLowerCase()) {
            case 'arrowright':
                useKeys()
                this.nextImage()
                break
            case 'arrowleft':
                useKeys()
                this.prevImage()
                break
            default:
        }
    }

    render() {
        const { projectImages, imageIndex, isUsingKeys } = this.state
        if (projectImages && projectImages.length > 0) {
            return (<Fragment>
                <Title />
                <Menu />
                <div className="project-container"
                    onMouseMove={() => this.setState({ isUsingKeys: false })}
                >
                    <div className="image-container"
                        onKeyDown={this.handleKeyPress}
                        style={{ pointerEvents: isUsingKeys ? 'none' : 'auto' }}
                    >
                        <div className="navigation prev" onClick={this.prevImage}>
                            <ArrowIcon className={"arrow-icon left"} fill={"red"} />
                        </div>
                        <div className="navigation next" onClick={this.nextImage}>
                            <ArrowIcon className={"arrow-icon right"} fill={"red"} />
                        </div>

                        <img onClick={this.nextImage} src={projectImages[imageIndex]} alt={imageIndex} />
                    </div>
                </div>
            </Fragment>)
        } else {
            return (<h1>Not found!</h1>)
        }

    }
}

export default ProjectPage

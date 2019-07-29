import * as React from 'react'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import Content from '../components/Content'
import Layout from '../components/Layout'
import ArrowIcon from '../components/_icons/ArrowIcon'
import { navigate } from 'gatsby-link'

export const ProjectPostTemplate = ({
    content,
    contentComponent,
    description,
    tags,
    title,
    helmet,
}: any) => {
    const PostContent = contentComponent || Content

    return (
        <section className='section'>
            {helmet || ''}
            <div className='container content'>
                <div className='columns'>
                    <div className='column is-10 is-offset-1'>
                        <h1 className='title is-size-2 has-text-weight-bold is-bold-light'>
                            {title}
                        </h1>
                        <p>{description}</p>
                        <PostContent content={content} />
                        {tags && tags.length ? (
                            <div style={{ marginTop: `4rem` }}>
                                <h4>Tags</h4>
                                <ul className='taglist'>
                                    {tags.map((tag: string) => (
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

interface IProps {
    images?: string[],
    data?: {
        markdownRemark?: {
            frontmatter?: {
                images?: string[]
            }
        }
    }
}

interface IState {
    projectImages: string[],
    imageIndex: number,
    isUsingKeys: boolean
}

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

class ProjectPage extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props)
        const images = props.images || props.data.markdownRemark.frontmatter.images

        this.state = {
            imageIndex: 0,
            projectImages: images,
            isUsingKeys: false
        }
        this.nextImage = this.nextImage.bind(this)
        this.prevImage = this.prevImage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    public componentDidMount() {
        document.addEventListener('keydown',
            ({ keyCode }: KeyboardEvent) => this.handleKeyPress(keyCode));
    }

    public componentWillUnmount() {
        document.removeEventListener('keydown',
            ({ keyCode }: KeyboardEvent) => this.handleKeyPress(keyCode));
    }

    public render() {
        const { projectImages, imageIndex, isUsingKeys } = this.state
        if (projectImages && projectImages.length > 0) {
            return (<Layout>
                <section className='project-container'
                    onMouseMove={() => this.setState({ isUsingKeys: false })}
                >
                    <figure className='image-container'
                        onKeyDown={({ keyCode }: React.KeyboardEvent<HTMLElement>) => this.handleKeyPress(keyCode)}
                        style={{ pointerEvents: isUsingKeys ? 'none' : 'auto' }}
                    >
                        <button
                            className='navigation prev'
                            onClick={this.prevImage}>
                            <ArrowIcon show={!isUsingKeys} className={'arrow-icon left'} />
                        </button>

                        <button
                            className='navigation next'
                            onClick={this.nextImage}>
                            <ArrowIcon show={!isUsingKeys} className={'arrow-icon right'} />
                        </button>

                        <img src={projectImages[imageIndex]} alt={`Image${imageIndex}`} />
                    </figure>
                </section>
            </Layout>)
        } else {
            return (<h1>Not found!</h1>)
        }
    }

    private nextImage() {
        this.setState((prevState: IState) => {
            return {
                imageIndex: prevState.imageIndex + 1 < prevState.projectImages.length ?
                    prevState.imageIndex + 1 : 0
            }
        })
    }

    private prevImage() {
        this.setState((prevState: IState) => {
            return {
                imageIndex: prevState.imageIndex === 0 ?
                    prevState.projectImages.length - 1 : prevState.imageIndex - 1
            }
        })
    }

    private handleKeyPress(keyCode: number) {
        const keys = { LEFT: 37, RIGHT: 39, ESC: 27 }
        const useKeys = () => {
            this.setState({
                isUsingKeys: true
            })
        }

        switch (keyCode) {
            case keys.RIGHT:
                useKeys()
                this.nextImage()
                break
            case keys.LEFT:
                useKeys()
                this.prevImage()
                break
            case keys.ESC:
                navigate('/home/')
                break
            default:
        }
    }
}

export default ProjectPage

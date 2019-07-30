/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { navigate } from 'gatsby-link'
// import Img from 'gatsby-image'
import Layout from '../components/Layout'
import ArrowIcon from '../components/_icons/ArrowIcon'

interface SizesImageProps {
    childImageSharp: {
        sizes: {
        aspectRaio: number;
        base64: string;
        sizes: string;
        src: string;
        srcSet: string
        }
    }
}

interface IProps {
    images?: SizesImageProps[];
    data?: {
        markdownRemark?: {
            frontmatter?: {
                title?: string;
            },
            childrenFile?: SizesImageProps[]
        },
    };
}

interface IState {
    projectImages: any[];
    imageIndex: number;
    isUsingKeys: boolean;
}

class ProjectPage extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props)
        const images = props.images && props.images.map(childFile => childFile.childImageSharp)
            || props.data.markdownRemark.childrenFile.map(childFile => childFile.childImageSharp)

        this.state = {
            imageIndex: 0,
            projectImages: images,
            isUsingKeys: false,
        }
        this.nextImage = this.nextImage.bind(this)
        this.prevImage = this.prevImage.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    public componentDidMount() {
        document.addEventListener('keydown',
            ({ keyCode }: KeyboardEvent) => this.handleKeyPress(keyCode))
    }

    public componentWillUnmount() {
        document.removeEventListener('keydown',
            ({ keyCode }: KeyboardEvent) => this.handleKeyPress(keyCode))
    }

    public render() {
        const { projectImages, imageIndex, isUsingKeys } = this.state
        const image = projectImages[imageIndex]
        if (projectImages && projectImages.length > 0) {
            return (<Layout>
                <section className='project-container'
                    onMouseMove={() => this.setState({ isUsingKeys: false })}
                >
                    <figure className='image-container'
                        onKeyDown={({ keyCode }:
                            React.KeyboardEvent<HTMLElement>) => this.handleKeyPress(keyCode)}
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

                        <Img sizes={image.sizes} alt={`Image${imageIndex}`} />
                    </figure>
                </section>
            </Layout>)
        }
        return (<h1>Not found!</h1>)
    }


    private nextImage() {
        this.setState((prevState: IState) => ({
            imageIndex: prevState.imageIndex + 1 < prevState.projectImages.length ?
                prevState.imageIndex + 1 : 0,
        }))
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
                isUsingKeys: true,
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

export const projectsPageQuery = graphql`
query ProjectById($id: String!) {
    markdownRemark(id: {eq: $id}) {
      frontmatter {
        title
      }
      childrenFile {
        childImageSharp {
            sizes(maxWidth: 1240) {
                ...GatsbyImageSharpSizes
              }
        }
      }
    }
  }
`
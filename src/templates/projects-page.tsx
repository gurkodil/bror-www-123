/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import * as React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { navigate } from 'gatsby-link'
// import Img from 'gatsby-image'
import Layout from '../components/Layout'
import ArrowIcon from '../components/_icons/ArrowIcon'

const fullWidth = {
    width: '100%',
    height: 'auto',  
    maxWidth: 'none',
    maxHeight: 'none',
}

const fullHeight = {
    width: 'auto',
    height: '100%',
    maxWidth: 'none',
    maxHeight: '100%',
}

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
    windowInitialized: boolean;
    imageParentWidth: number;
    imageParentHeight: number;
}

class ProjectPage extends React.Component<IProps, IState> {
    private figureRef = React.createRef<HTMLDivElement>()

    public constructor(props: IProps) {
        super(props)
        const images = props.images && props.images.map(childFile => childFile.childImageSharp)
            || props.data.markdownRemark.childrenFile.map(childFile => childFile.childImageSharp)
        

        this.state = {
            imageIndex: 2,
            projectImages: images,
            isUsingKeys: false,
            windowInitialized: false,
            imageParentHeight: 400,
            imageParentWidth: 300,
        }
        this.nextImage = this.nextImage.bind(this)
        this.prevImage = this.prevImage.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    public componentDidMount() {
        document.addEventListener('keydown',
            ({ keyCode }: KeyboardEvent) => this.handleKeyPress(keyCode))
        window.addEventListener("resize", () => this.updateDimensions(this))

        this.updateImageParentResolution()

        this.setState({
            windowInitialized: true
        })

        

    }

    private updateImageParentResolution(): boolean {
        const node = this.figureRef.current

        if (node) {
            const {
                clientWidth, 
                clientHeight,
            } = node

            if (this.state.imageParentWidth !== clientWidth 
                || this.state.imageParentHeight !== clientHeight) {
                this.setState({
                    imageParentWidth: clientWidth,
                    imageParentHeight: clientHeight,
                })
                return true
            }
        }
        return false
    }

    public componentWillUnmount() {
        document.removeEventListener('keydown',
            ({ keyCode }: KeyboardEvent) => this.handleKeyPress(keyCode))
        window.removeEventListener("resize", () => this.updateDimensions(this))

    }

    // eslint-disable-next-line class-methods-use-this
    private updateDimensions(context) {
        context.updateImageParentResolution()
    }
    

    public componentWillMount() {
        this.updateDimensions(this)
    }

    private getImageDimensionStyle(image) {
        if (!image) return null

        const { imageParentWidth, imageParentHeight } = this.state
        const dispRatio = imageParentHeight > 0 ? imageParentWidth / imageParentHeight : 1.0
        const imgRatio = image && image.fluid ? image.fluid.aspectRatio : 1

        // (original height / original width) x new width = new height
        const getHeight = (scale) => (1 / imgRatio) * imageParentWidth * scale
        const getWidth = (scale) =>  (imageParentHeight * scale) / (1 / imgRatio)

        // Hacky arbitary scale factor
        const scale = Math.abs(imgRatio - dispRatio) < 0.3 ? 0.8 : 1

        return  { 
            height: imgRatio > dispRatio ? getHeight(scale) : imageParentHeight * scale, // imgRatio > dispRatio ? getHeight() : imageParentHeight, 
            width: imgRatio > dispRatio ? imageParentWidth * scale : getWidth(scale) // dispRatio ? getHeight() : imageParentHeight, 
        }
    }
  
    public render() {
        // if (!this.state.windowInitialized) return null
        const { projectImages, imageIndex, isUsingKeys } = this.state
        const image = projectImages ? projectImages[imageIndex] : undefined

        const imgStyle = this.getImageDimensionStyle(image)
      
        return (<Layout>
            <section className='project-container'
                onMouseMove={() => this.setState({ isUsingKeys: false })}
            >
                <figure
                    ref={this.figureRef}
                    onKeyDown={({ keyCode }:
                            React.KeyboardEvent<HTMLElement>) => this.handleKeyPress(keyCode)}
                    // style={{ pointerEvents: isUsingKeys ? 'none' : 'auto' }}
                >
                    { image && image.fluid && image.fluid.aspectRatio && <Img
                        style={imgStyle}
                            // style={{
                        //     ...imgStyle,
                        //     height: imgRatio > dispRatio ? '' : 'auto'
                        // }}
                        sizes={{ ...image.fluid, aspectRatio: image.fluid.aspectRatio }}
                        alt={`Image${imageIndex}`} />}
                </figure>
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
            </section>
        </Layout>)
      
    }

    private getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window
        return {
            width,
            height,
        }
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
            fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
            }
        }
      }
    }
  }
`
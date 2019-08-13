
import React, { useContext } from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import ReactResizeDetector from 'react-resize-detector'

import Layout from '../components/Layout'
import ArrowIcon from '../components/_icons/ArrowIcon'
import scaleImageToParent from '../utils/scale-image-to-parent'
import { ProjectPageProps, FluidImage, ContextInterface } from '../interfaces/gatsby-image.interface'

import {
    ImageSlideShowContext,
    ImageSlideShowProvider,
} from '../components/_helpers/ImageSlideShowContext'

const ArrowButton = ({ isNext = false }: { isNext?: boolean }) => {
    const { showKeys, next, prev }: ContextInterface = useContext(ImageSlideShowContext)
    return (<button
        className={`navigation ${isNext ? 'next' : 'prev'}`}
        onKeyDown={isNext ? next: prev}
        onClick={isNext ? next : prev}>
        <ArrowIcon show={showKeys} className={`arrow-icon ${isNext ? 'right' : 'left'}`} />
    </button>)
}

const Image: React.FC = () => {
    const { getImage } = useContext(ImageSlideShowContext)
    const image = getImage && getImage()
    return image && (<ReactResizeDetector handleWidth handleHeight>
        {({ width, height }) => {
            const style = scaleImageToParent(image.aspectRatio, width, height)  
            return (<Img
                style={style}
                sizes={{ ...image}}
            />)
        }}
    </ReactResizeDetector>) || <></>
}

type Props = { images: FluidImage[]}

export const ProjectPageTemplate: React.FC<Props> = ({ images }) => 
    <ImageSlideShowProvider images={images}>
        <section className='project-container'>
            <figure>
                <Image/>
            </figure>
            <ArrowButton/>
            <ArrowButton isNext/>
        </section>
    </ImageSlideShowProvider>


// eslint-disable-next-line react/display-name
export default ({ data }: ProjectPageProps) => {
    const images = data && data.markdownRemark.childrenFile.map(childFile => childFile.childImageSharp.fluid)
    return (
        <Layout>
            <ProjectPageTemplate images={images}/>
        </Layout>
    )
}

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

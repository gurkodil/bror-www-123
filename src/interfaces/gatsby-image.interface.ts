/**
|--------------------------------------------------
| Lax is salmon yes good swimmer
|--------------------------------------------------
*/

export interface FixedImage {
  width: number
  height: number
  src: string
  srcSet: string
  base64?: string
  tracedSVG?: string
  srcWebp?: string
  srcSetWebp?: string
}

export interface FluidImage {
  aspectRatio: number
  src: string
  srcSet: string
  sizes: string
  base64?: string
  tracedSVG?: string
  srcWebp?: string
  srcSetWebp?: string
}

export interface ImageProps {
  resolutions?: FixedImage
  sizes?: FluidImage
  fixed?: FixedImage
  fluid?: FluidImage
  fadeIn?: boolean
  title?: string
  alt?: string
  className?: string | object
  critical?: boolean
  style?: object
  imgStyle?: object
  placeholderStyle?: object
  backgroundColor?: string | boolean
  onLoad?: () => void
  onStartLoad?: (param: { wasCached: boolean }) => void
  onError?: (event: any) => void
  Tag?: string
}

export interface ContextInterface {
    next?: () => void,
    prev?: () => void,
    index?: number,
    showKeys?: boolean,
    setShowKeys?: (showKeys: boolean) => void,
    getImage?: () => FluidImage,
}

type ChildImageSharp = {
    childImageSharp?: {
        fluid?: FluidImage
    }
}

export interface FluidImageProps {
    images?: FluidImage[]
}

export interface ProjectPageProps extends FluidImageProps {
    data?: {
        markdownRemark?: {
            frontmatter?: {
                title: string
            }
            childrenFile?: ChildImageSharp[]
        }
    }
}

export interface PortfolioPageProps {
    allMarkdownRemark: {
        edges: {
            node: {
                childrenFile: ChildImageSharp[],
                frontmatter: {
                    title: string
                }
            }
        }[]
    }
}
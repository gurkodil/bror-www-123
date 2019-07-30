import * as React from 'react'
import { Helmet } from 'react-helmet'
import NavBar from './NavBar'
import useSiteMetadata from './SiteMetadata'
import './style/all.scss'
import './fonts/nitti.css'

interface IProps {
    children: any,
    exludeNavBar?: boolean
}

const TemplateWrapper = ({ children, exludeNavBar }: IProps) => {

    const { title, description } = useSiteMetadata()
    return (
        <React.Fragment>
            <Helmet>
                <html lang='en' />
                <title>{title}</title>
                <meta name='description' content={description} />

                <link
                    rel='shortcut icon'
                    type='image'
                    href='/img/jwd_rd.ico'
                />
                {/* <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/img/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    href='/img/favicon-32x32.png'
                    sizes='32x32'
                />
                <link
                    rel='mask-icon'
                    href='/img/safari-pinned-tab.svg'
                    color='#ff4400'
                /> */}
                <meta name='theme-color' content='#fff' />

                <meta property='og:type' content='business.business' />
                <meta property='og:title' content={title} />
                <meta property='og:url' content='/' />
                {/* <meta property='og:image' content='/img/og-image.jpg' /> */}
            </Helmet>
            {!exludeNavBar && <NavBar />}
            <div>{children}</div>
        </React.Fragment>
    )
}

export default TemplateWrapper

import React from 'react'
import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

import { OrderWidgetControl, PreviewOrderWidget } from './widgets/order'

const previewTest = () => {


    if (true) {
        return <div>
            <p>Hello! hehe!</p>
        </div>
    } else {
        return <p>Not found!</p>
    }

}

const preview = ({ value }) => <p>{value}</p>

CMS.registerWidget('order', OrderWidgetControl, PreviewOrderWidget)

CMS.registerMediaLibrary(uploadcare);

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)

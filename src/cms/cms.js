import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

import { OrderWidgetControl, PreviewOrderWidget } from './widgets/order'
// import { Widget as ReoderWidget } from '@ncwidgets/reorder'


// CMS.registerWidget('order', ReoderWidget)

CMS.registerWidget('order', OrderWidgetControl, PreviewOrderWidget)

CMS.registerMediaLibrary(uploadcare)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)

import CMS from 'netlify-cms-app'
import React from 'react'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import { createControl } from '@ncwidgets/reorder'
import { Widget as IdWidget } from '@ncwidgets/id'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'


import { OrderWidgetControl, PreviewOrderWidget } from './widgets/order'
// import { Widget as ReoderWidget } from '@ncwidgets/reorder'

const ListComponent = ({ item }) =>
    <>
        <img style={{ width: '50px', height: '50px', verticalAlign: 'middle' }} src={item.thumbnail} alt={item.title} />
        <span style={{ margin: '10px' }}>{item.title}</span>
    </>

const CustomReorderControl = createControl({
    renderListItem: item => <ListComponent item={item} />
})

CMS.registerWidget({
    name: "ncw-reorder",
    controlComponent: CustomReorderControl,
    previewComponent: PreviewOrderWidget,
})

CMS.registerWidget(IdWidget)
// CMS.registerWidget('order', ReoderWidget)

// CMS.registerWidget('order', OrderWidgetControl, PreviewOrderWidget)

CMS.registerMediaLibrary(uploadcare)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)

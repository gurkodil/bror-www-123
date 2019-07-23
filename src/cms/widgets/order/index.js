import OrderWidgetControl from './widget-reorder'
import PreviewOrderWidget from './widget-reorder-preview'

if (typeof window !== 'undefined') {
    window.Control = OrderWidgetControl
    window.Preview = PreviewOrderWidget
}

export { OrderWidgetControl, PreviewOrderWidget }
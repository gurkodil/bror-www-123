import * as React from 'react'

interface HTMLContentProps extends React.HTMLAttributes<HTMLDivElement> {
    content: {
        __html: string;
    } | undefined,
    className: string | undefined
}

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
    content: string | undefined
    className: string | undefined
}

export const HTMLContent = ({ content, className }: HTMLContentProps) => (
    <div className={className} dangerouslySetInnerHTML={content} />
)

const Content = ({ content, className }: ContentProps) => (
    <div className={className}>{content}</div>
)

export default Content

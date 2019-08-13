/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby-link'
import { FluidImage, ContextInterface } from '../../interfaces/gatsby-image.interface'

const keys = { LEFT: 37, RIGHT: 39, ESC: 27 }

const ImageSlideShowContext = React.createContext<ContextInterface>({})


function useKeyboardEvent(targetKey: number, callback: () => void, inspect: any): void {
    useEffect(() => {
        const handleKeyPress = ({ keyCode }: KeyboardEvent) => (keyCode === targetKey) ? callback() : undefined
        window.addEventListener('keydown', handleKeyPress)
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [inspect])
}

function useMouseMove(callback: () => void, ...inspect: any): void {
    useEffect(() => {
        window.addEventListener('mousemove', callback)
        return () => {
            window.removeEventListener('mousemove', callback)
        }
    }, inspect)
}

type Props = { images: FluidImage[]}

const ImageSlideShowProvider: React.FC<Props> = (props) => {
    const [index, setIndex] = useState<number>(0)
    const [images, setImages] = useState<Array<FluidImage>>([])
    
    const [showKeys, setShowKeys] = useState<boolean>(true)
    const [maxIndex, setMaxIndex] = useState<number>(0)

    const next = (): void => setIndex((index + 1) % maxIndex || 0)
    const prev = (): void => setIndex(index === 0 ? maxIndex - 1 : index - 1 || 0)
    
    useEffect(() => {
        const { images: imgs } = props
        setImages(imgs)
        setIndex(0)
        setMaxIndex(imgs.length)
        
    }, [])

    useKeyboardEvent(keys.LEFT, () => {
        setShowKeys(false)
        prev()
    }, prev)

    useKeyboardEvent(keys.RIGHT, () => {
        setShowKeys(false)
        next()
    }, next)

    useKeyboardEvent(keys.ESC, () => {
        navigate('/home/')
    }, index)

    useMouseMove(() => setShowKeys(true), index)

    
    return (
        <ImageSlideShowContext.Provider value={{
            next,
            prev,
            index,
            showKeys,
            setShowKeys,
            getImage: () => images[index],
        }}>
            {props.children}
        </ImageSlideShowContext.Provider>
    )
}

export {
    ImageSlideShowContext,
    ImageSlideShowProvider,
}

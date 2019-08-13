interface ImageProps {
    width: number
    height: number
}

const scaleToParent = (imgRatio: number, width: number, height: number): ImageProps => {
    if (!imgRatio || !height || !width) return null

    const dispRatio = height > 0 ? width / height : 1.0

    // (original height / original width) x new width = new height
    const getHeight = (scale: number): number => ((width * scale) / imgRatio) * scale
    const getWidth = (scale: number): number =>  ((height) / (1 / imgRatio)) * scale

    // Hacky arbitary scale factor
    const scale = 2 - Math.abs(imgRatio - dispRatio) < 0.3 ? 0.8 : 1

    const parentIsWider = imgRatio < dispRatio
    
    return {
        height: parentIsWider ? height * scale : getHeight(scale),
        width: parentIsWider ? getWidth(scale) : width * scale
    }
}

export default scaleToParent

import differenceBy from 'lodash/differenceBy'

export const hasItem = (data, item, key) => {
    return data.some(datum => datum[key] === item[key])
}

export const removeOutdatedItem = (data, outdated, key) =>
    data.filter(item => {
        return !outdated.some(outdatedItem => outdatedItem[key] === item[key])
    })

export const diff = ({
    currentOrder,
    data,
    key,
}) => {
    const outdatedItem = differenceBy(currentOrder, data, key)
    const newItem = differenceBy(data, currentOrder, key)
    if (outdatedItem.length === 0 && newItem.length === 0) {
        return {
            changed: false,
            newOrder: currentOrder,
        }
    }

    const newOrder = removeOutdatedItem(currentOrder, outdatedItem, key).concat(
        newItem
    )
    return {
        changed: true,
        newOrder,
    }
}

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}
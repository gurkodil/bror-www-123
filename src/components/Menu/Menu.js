import React, { useState, Fragment } from 'react'
import MenuIcon from '../_icons/MenuIcon'

const DialogMenu = ({ onClick }) =>
    <div className="dialogMenu" onClick={onClick}>

        <a href="/monokel-eyewear-metro">Monokel eyewear / Metro</a><br />
        <a href="/stuntwood-SS18">Stuntwood / SS18</a>
        <a href="/sthlm-glas-x-xleo-tecosky">STHLM GLAS x Leo Tecosky</a>
        <a href="/neble">NEBLE</a>
        <a href="/monokel-eyewear-x-v00">Monokel eyewear x VOO</a>
        <a href="/monokel-eyewar-metro-gif">Monokel Eyewear / Metro / GIF</a>

        <a href="/coloud-made-to-move">COLOUD / made to move</a>
        <a href="/ikea-kitchen-by-kids">IKEA / Kitchen by kids</a>
        <a href="/stundwood">Stuntwood</a>
        <a href="/portfolio"><strong>Portfolio</strong></a>
        <a href="/info">Info</a>

    </div>

const Menu = props => {
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(prevShowMenu => {
            const newShowMenu = !showMenu
            newShowMenu ?
                document.body.classList.add('modal-open') :
                document.body.classList.remove('modal-open')
            return newShowMenu
        })


    }

    return (
        <Fragment>
            <MenuIcon
                onClick={toggleMenu}
                height={25}
                width={25}
                fill={'black'}
                className={`menuIcon ${showMenu ? 'fa fa-menu-close' : 'fa fa-menu open'}`} />

            {showMenu && <DialogMenu onClick={toggleMenu} />}
        </Fragment>
    )
}

export default Menu

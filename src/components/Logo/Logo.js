import React from 'react'
import Tilt from 'react-tilt'
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-5" options={{ max: 55 }} style={{ height: 120, width: 120 }} >
                <div className="Tilt-inner pa1"><img alt='logo' style={{paddingTop:'10px'}} src={brain}></img> </div>
            </Tilt>
        </div>
    );
}
export default Logo;
import React from "react";
import loadingGif from '../utils/images/AppbarIcons/Loading.3.gif'
import Logo from "../utils/images/Logo/TECHTROVE.png"

const Loading = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center'
            style={{
                zIndex: 1,
                background: 'rgba(0, 0, 0, 0.1)', // Ajusta el valor alfa para controlar la opacidad del fondo
                backdropFilter: 'blur(8px)' // Opcional: Aplica un desenfoque al fondo
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={Logo} alt='Techtrove Logo' style={{ marginBottom: '15px' }} />
            </div>
        </div>
    )
}
export default Loading;
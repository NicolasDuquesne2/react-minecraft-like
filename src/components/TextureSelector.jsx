import { useStore } from '../hooks/useStore'
import { useEffect, useState } from 'react'
import { useKeyboard } from '../hooks/useKeyboard'
import { dirtImg , grassImg, glassImg, woodImg, logImg} from '../params/images'

const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    wood: woodImg,
    log: logImg,
}

function TextureSelector() {
    const [visible, setVisible] = useState()
    const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture])
    const {
        dirt,
        grass,
        glass,
        wood,
        log,
    } = useKeyboard()



    useEffect(() => {

        const textures = {
            dirt,
            grass,
            glass,
            wood,
            log,
        }

        const pressedTexture = Object.entries(textures).find(([k,v]) => v)
        if(pressedTexture) {
            setTexture(pressedTexture[0])
        }
    }, [setTexture, dirt, grass, glass, wood, log])

    useEffect(() => {
        const visibilityTimeout = setTimeout(() => {
            setVisible()
        }, 2000)
        setVisible(true)
        return () => {
            clearTimeout(visibilityTimeout)
        }
    }, [activeTexture])

    return visible && (
        <div className='absolute centered texture-selector'>
            {Object.entries(images).map(([k,src]) => (
                <img 
                    src={src} 
                    key={`ìmg - ${k}`}
                    alt={k}
                    className={`${k === activeTexture? "active": ""}`}
                />
            ))}
        </div>
    )
}



export default TextureSelector
import { useState } from "react"
import { useBox } from "@react-three/cannon"
import * as textures from "../params/textures"
import { useStore } from "../hooks/useStore"

function Cube({position, texture}) {
    const [isHovered, setHovered] = useState(false)

    const [addCube, removeCube] = useStore((state)=> [state.addCube, state.removeCube])
    

    const [ ref ] = useBox(() => ({
        type: 'Static',
        position
    }))

    const activeTexture = textures[texture + 'Texture']

    return (
        <mesh 
            ref={ref}
            onPointerMove = {(e) => {
                e.stopPropagation()
                setHovered(true)
            }}
            onPointerOut = {(e) => {
                e.stopPropagation()
                setHovered(false)
            }}
            onClick={(e) => {
                e.stopPropagation()
                const clickedFace = Math.floor(e.faceIndex /2)
                const {x, y, z} = ref.current.position

                if(e.altKey){
                    removeCube(x, y, z)
                    return
                }

                if(clickedFace === 0) {
                    addCube(x + 1 , y, z)
                } else if (clickedFace === 1) {
                    addCube(x - 1 , y, z)
                } else if (clickedFace === 2) {
                    addCube(x , y + 1, z)
                } else if (clickedFace === 3) {
                    addCube(x , y - 1, z)
                } else if (clickedFace === 4) {
                    addCube(x , y , z + 1)
                } else if (clickedFace === 5) {
                    addCube(x , y , z - 1)
                }
            }}
        >
            <boxGeometry attach="geometry" />
            <meshStandardMaterial 
                color={isHovered? 'grey': 'white'}
                attach="material" 
                map={activeTexture} 
                transparent={true}
                opacity={texture === 'glass'? 0.5: 1}    
            />
        </mesh>
    )
}


export default Cube
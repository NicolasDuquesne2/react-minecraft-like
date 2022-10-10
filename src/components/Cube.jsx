import { useBox } from "@react-three/cannon"
import * as textures from "../params/textures"

function Cube({position, texture}) {
    const [ ref ] = useBox(() => ({
        type: 'Static',
        position
    }))

    const activeTexture = textures[texture + 'Texture']

    return (
        <mesh ref={ref}>
            <boxGeometry attach="geometry" />
            <meshStandardMaterial attach="material" map={activeTexture} />
        </mesh>
    )
}


export default Cube
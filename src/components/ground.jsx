import { usePlane } from "@react-three/cannon"
import { NearestFilter, RepeatWrapping } from "three"
import { groundTexture } from "../params/textures"


function Ground () {


    // usePlane set x rotation to 90° then - Math.PI/2
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0], position: [0,0,0]
    }))

    //For textures repetitons and anti blur
    groundTexture.magFilter = NearestFilter
    groundTexture.wrapS = RepeatWrapping
    groundTexture.wrapT = RepeatWrapping
    groundTexture.repeat.set(100, 100)
    
    return (
        <mesh ref={ref}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach='material' map={groundTexture}/>
        </mesh>
    )
}

export default Ground
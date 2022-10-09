import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { useEffect, useRef } from "react"
import { Vector3 } from "three"
import { useKeyboard } from "../hooks/useKeyboard"


function Player() {
    const actions = useKeyboard()
    console.log('actions', Object.entries(actions).filter(([k, v]) => v))

    //import camera
    const { camera } = useThree()
    
    //set default caracs of a sphere (player's physics)
    const [ref, api ] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0,1,0]
    }))
    
    const pos = useRef([0,0,0])
    useEffect(() => {
        api.position.subscribe((p) => pos.current = p)
    }, [api.position])

    const vel = useRef([0,0,0])
    useEffect(() => {
        api.velocity.subscribe((v) => vel.current = v)
    }, [api.velocity])

    //attach camero to the sphere
    useFrame((() => {
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))
        api.velocity.set(0,1,0)
    }))

    return (
        <mesh ref={ref}>
        </mesh>
    )

}

export default Player
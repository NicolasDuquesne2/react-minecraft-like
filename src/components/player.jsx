import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { useEffect, useRef } from "react"
import { Vector3 } from "three"
import { useKeyboard } from "../hooks/useKeyboard"

const JUMP_FORCE = 4
const WALK_SPEED = 4

function Player() {
    const { moveBack, moveLeft, moveForward, moveRight, jump } = useKeyboard()
   

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
        const direction = new Vector3()
        const frontVector = new Vector3(0, 0, (moveBack ? 1 : 0) - (moveForward ? 1 : 0))
        const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0)

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(WALK_SPEED)
            .applyEuler(camera.rotation)

        api.velocity.set(direction.x, vel.current[1], direction.z)

        if (jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(vel.current[0], JUMP_FORCE ,vel.current[2])
        }

    }))

    return (
        <mesh ref={ref}>
        </mesh>
    )

}

export default Player
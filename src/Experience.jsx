import { OrbitControls,PointerLockControls} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


const Experience = () => {
    const boxRef = useRef();
    const torusRef = useRef();
    const sphereRef = useRef();

    useFrame((state, delta)=>{
        boxRef.current.rotation.x += delta;        
        torusRef.current.position.y = Math.sin(state.clock.getElapsedTime())+1;        
        sphereRef.current.position.x = Math.cos(state.clock.getElapsedTime())+10;
    })

    return (
        <>
            
            <mesh ref={boxRef} position={[6, 0, -2]}  scale={1}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
            </mesh>
            
            <mesh ref={torusRef} position={[14, 0, -7]}  scale={0.5}>
                <torusGeometry args={[2, 1, 32, 64]} />
                <meshStandardMaterial wireframe color="black" />
            </mesh>

            <mesh ref={sphereRef} position={[10,3,-7]} scale={0.7}>
                <sphereGeometry args={[2, 16, 32]} />
                <meshToonMaterial color="rgb(240, 128, 128)" />
            </mesh>
        </>
    )

}
export default Experience;
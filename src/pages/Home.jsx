import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import Loader from "../components/Loader"
import Island from "../models/Island"; ''
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../components/HomeInfo";

const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) { screenScale = [0.9, 0.9, 0.9]; }
    else { screenScale = [1, 1, 1]; }
    return [screenScale, screenPosition, rotation];
  }

  const adjustPlanForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.7, 1.7, 1.7];
      screenPosition = [0, -1.5, 0];
    }
    else {
      screenScale = [4, 4, 4];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlanForScreenSize();
  const [isRotating, setIsRotating] = useState(false);
  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>

          <directionalLight position={[1, 1, 1]} intensity={0} />
          <ambientLight intensity={0.4} />

          {/* <pointLight /> // emits light in all direction from a single source */}

          {/* <spotLight /> //similar to point light, emits light from one direction but in a shape of a cone hence angle can be adjusted */}

          <hemisphereLight
            groundColor="#000000"
            skyColor="#b1d1ff"
            intensity={1}
          />

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            planeScale={planeScale}
            planePosition={planePosition}
            isRotating={isRotating}
            rotation={[0, 20, 0]}
          />



        </Suspense>


      </Canvas>




    </section>
  )
}

export default Home
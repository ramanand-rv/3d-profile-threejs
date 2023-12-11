import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Loader from "../components/Loader"
import Island from "../models/Island";''
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";

const Home = () => {
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0, 9];
    }
    else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  return (
    <section className="w-full h-screen relative">
      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        Pop Up
      </div> */}

      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>

          <directionalLight position={[1, 1, 1]} intensity={0} />
          <ambientLight intensity={0.4}/>
          
          {/* <pointLight /> // emits light in all direction from a single source */}
          

          {/* <spotLight /> //similar to point light, emits light from one direction but in a shape of a cone hence angle can be adjusted */}
          
          <hemisphereLight 
            groundColor="#000000"
            skyColor="#b1d1ff"
            intensity={1}
           />

          <Sky />
          <Bird />
          <Plane />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
          />



        </Suspense>


      </Canvas>




    </section>
  )
}

export default Home
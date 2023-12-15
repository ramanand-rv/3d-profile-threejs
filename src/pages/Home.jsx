import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import got from '../assets/got.mp3';
import soundoff from '../assets/icons/soundoff.png';
import soundon from '../assets/icons/soundon.png';
import HomeInfo from "../components/HomeInfo";
import Loader from "../components/Loader";
import Bird from "../models/Bird";
import Island from "../models/Island";
import Plane from "../models/Plane";
import Sky from "../models/Sky";
''

const Home = () => {
  const audioRef = useRef(new Audio(got));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    if (isMusicPlaying) {
      audioRef.current.play();
    }
    return () => {
      audioRef.current.pause();
    }
  }, [isMusicPlaying]);

  const prevenRightClick = (e) => {
    e.preventDefault();
  }

  const [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -5.8, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) { screenScale = [0.9, 0.9, 0.9]; }
    else { screenScale = [1, 1, 1]; }
    return [screenScale, screenPosition, rotation];
  }

  const adjustPlanForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.7, 1.5, 1.7];
      screenPosition = [0, -2., -1];
    }
    else {
      screenScale = [4, 4, 4];
      screenPosition = [-12, 0, -8];
    }
    return [screenScale, screenPosition];
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlanForScreenSize();
  const [isRotating, setIsRotating] = useState(false);
  return (
    <section onContextMenu={prevenRightClick} className="w-full h-screen relative">
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
            scale={planeScale}
            position={planePosition}
            isRotating={isRotating}
            rotation={[0, 20, 0]}
          />

        </Suspense>
      </Canvas>

      <div className="absolute bottom-2 left-2">
        <img src={!isMusicPlaying ? soundoff : soundon} alt="sound"
          className=" w-10 h-10 cursor-pointer object-contain"
          onClick={() => setIsMusicPlaying(!isMusicPlaying)} />
      </div>
    </section>
  )
}

export default Home
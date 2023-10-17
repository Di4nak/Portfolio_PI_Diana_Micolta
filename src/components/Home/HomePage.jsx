import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Island } from "../../assets/foxs_islands/Scene";
import { Biplane } from "../../assets/aircarft_biplane/Scene";
import { Bird } from "../../assets/simple_bird/Scene";
import Loader from "../Loader/Loader";
import InfoBox from "../InfoBox/InfoBox";
import PlayButton from "../PlayButton/PlayButton";
import soundPath from "../../../public/engine_loop.wav";
import { mediaConstants } from "../../configs/mediaConstants";
import dragHandIcon from "../../../public/drag.png";
import "./HomePage.css";
import Experience from "../../Experience"
import Info from "../../Info"

const HomePage = () => {
  const audioRef = useRef(new Audio(soundPath));
  audioRef.current.volume = 0.1;

  const [isPlaneAnimating, setIsPlaneAnimating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // Camera settings from biography
  const cameraSettings = {
    position: [0, 0, 5],
    fov: 60
  }
  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [0.4, 0.4, 0.4];
      screenPosition = [0, -1, 0];
    } else {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.5, 0.5, 0.5];
      screenPosition = [0, 0, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -5.7, -43.4];
    }

    return [screenScale, screenPosition];
  };

  // Get the scale and position values based on screen size
  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  // For the sounds
  useEffect(() => {
    const audio = new Audio(mediaConstants.musicPath);
    audio.volume = 0.4;
    audio.loop = true;
    if (isPlaying) {
      audio.play();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying]);

  return (
    <>
      <div className="homepage-container">
        <InfoBox currentStage={currentStage} />

        <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

        {showHint && (
          <>
            <div className="hint-text">desplazate con el click derecho para explorar</div>
            <div className="hand-icon-outer-container">
              <div className="hand-icon-container">
                <img
                  src={dragHandIcon}
                  alt="Drag to explore"
                  className="hand-icon"
                />
                <div className="circle"></div>
              </div>
            </div>
          </>
        )}

        <Info name={"Diana C. Micolta C.- 2028287"} biography={"Student of Web 3D Developer"} />
        

        <Canvas className="homepage-canvas" camera={{ near: 4, far: 3000 }}>
        
          <Suspense fallback={<Loader />}>
            <Biplane
              position={biplanePosition}
              rotation={[0, 0, 0]}
              scale={biplaneScale}
              isAnimating={isPlaneAnimating}
            />
            <Bird
              position={[0, 0, 0]}
              rotation={[0, 1, 0]}
              scale={[0.3, 0.3, 0.3]}
            />
            <ambientLight intensity={0.3} />
            <spotLight position={[30, -50, 6]} angle={45} penumbra={5} />
            <pointLight position={[0, 35, 50]} />
            <Island
              position={islandPosition}
              rotation={[0.1, 0.67, 0]}
              scale={islandScale}
              setCurrentStage={setCurrentStage}
              setIsPlaneAnimating={setIsPlaneAnimating}
              audioRef={audioRef}
              setShowHint={setShowHint}
              isPlaying={isPlaying}
            />
          </Suspense>
          {/* biografia */}
          <Experience className="exp" position-x={20}/>
          

        </Canvas>
        


      </div>



    </>
  );
};

export default HomePage;

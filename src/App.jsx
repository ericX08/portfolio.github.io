//fix skills bug where i can go back before closing
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Loader from './assets/Loader';
import Gym from './model/gym';
import Sky from './model/sky';
import CameraController from './assets/CameraController';
import About from './pages/About';
import QTEBar from './assets/MiniGame';
import Projects from './pages/Projects';
import { arrow } from '../public';
import { Dumbbell, Play, RefreshCw, Home, XCircle } from 'lucide-react';


const Scene = ({ currentView, onCameraChange, cameraConfigs, onPopupTrigger, playAnimation, sliderPosition, playGame }) => {
  return (
    <>
      <CameraController currentView={currentView} cameraConfigs={cameraConfigs} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Environment preset="sunset" />
      <Gym 
        onCameraChange={onCameraChange} 
        currentView={currentView} 
        onPopupTrigger={onPopupTrigger} 
        playAnimation={playAnimation}
      />
      <Sky />
      {playGame && (
        <QTEBar 
          position={[-8.7, 2, -11]} 
          rotation={[0, 0, 0]} 
          scale={[2, 0.5, 0.5]} 
          sliderPosition={sliderPosition}
          successZoneStart={0.35}
          successZoneEnd={0.65}
        />
      )}
    </>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('outside');
  const [activePopup, setActivePopup] = useState(null);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [showGameResults, setShowGameResults] = useState(false);
  const [score, setScore] = useState(0);
  const [playGame, setPlayGame] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [direction, setDirection] = useState(1);
  const [canClick, setCanClick] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showStartPopup, setShowStartPopup] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const cameraConfigs = {
    outside: { position: [0, 3, -23.5], rotation: [0, 180, 0], fov: 54, enableMouseFollow: false },
    reception: { position: [0, 2, -13.5], rotation: [0, 200, 0], fov: 60, enableMouseFollow: true },
    about: { position: [9.75, 1.5, -9.5], rotation: [-5, 0, 0], fov: 54, enableMouseFollow: true },
    projects: { position: [6, 2, 14], rotation: [-2, 0, 0], fov: 70, enableMouseFollow: true },
    skills: { position: [-10, 1.6, 1], rotation: [0, 90, 0], fov: 70, enableMouseFollow: true },
    game: { position: [-8.7, 2, -5], rotation: [0, 0, 0], fov: 60, enableMouseFollow: false },
  };

  useEffect(() => {
    let animationFrame;
    if (playGame && !isPaused) {
      const animate = () => {
        setSliderPosition((prev) => {
          const newPosition = prev + 0.02 * speed * direction;
          if (newPosition > 1 || newPosition < 0) {
            setDirection((prev) => -prev);
          }
          return Math.max(0, Math.min(1, newPosition));
        });
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [playGame, speed, direction, isPaused]);

  useEffect(() => {
    let timeoutId;

    if (currentView === 'game') {
      timeoutId = setTimeout(() => {
        setShowStartPopup(true);
      }, 2000);
    } else {
      setShowStartPopup(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentView]);

  const handleCameraChange = (destination) => {
    setCurrentView(destination);
  };

  const handlePopupTrigger = (popupType) => {
    setActivePopup(popupType);
  };

  const handleClick = () => {
    if (!canClick || isPaused) return;

    if (sliderPosition >= 0.35 && sliderPosition <= 0.65) {
      setScore((prev) => prev + 1);
      setSpeed((prev) => prev * 1.05);
      setPlayAnimation(true);
      setCanClick(false);
      setIsPaused(true);
      setTimeout(() => {
        setCanClick(true);
        setPlayAnimation(false);
        setIsPaused(false);
      }, 1500);
    } else {
      handleGameOver();
    }
  };

  const handleStartGame = () => {
    setShowStartPopup(false);
    setShowGameResults(false);
    setPlayGame(true);
    setScore(0);
    setSpeed(1);
    setSliderPosition(0);
    setDirection(1);
    setCanClick(true);
    setIsPaused(false);
  };

  const handleGameOver = () => {
    setShowGameResults(true);
    setPlayGame(false);
    setPlayAnimation(false);
    setIsPaused(false);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  return (
    <section className='w-full h-screen relative'>
      <Canvas 
        className='w-full h-screen bg-transparent'
        camera={{ near: 0.1, far: 1000, position: [0, 0, 0], fov: 60 }}
      >
        <Suspense fallback={<Loader />}>   
          <Scene 
            currentView={currentView} 
            onCameraChange={handleCameraChange}
            cameraConfigs={cameraConfigs}
            onPopupTrigger={handlePopupTrigger}
            playAnimation={playAnimation}
            onGameOver={handleGameOver}
            sliderPosition={sliderPosition}
            playGame={playGame}
          />
        </Suspense>
      </Canvas>
      {currentView === 'game' && playGame && !isPaused && (
        <button
          onClick={handleClick}
          disabled={!canClick}
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 
                      bg-gradient-to-r ${canClick ? 'from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600' : 'from-gray-400 to-gray-500'} 
                      text-white font-bold py-4 px-8 rounded-full shadow-lg 
                      transition duration-300 ease-in-out transform hover:scale-105 
                      flex items-center justify-center space-x-2
                      ${canClick ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        >
          <Dumbbell className="w-6 h-6" />
          <span className="text-xl">LIFT!</span>
        </button>
      )}
      {currentView !== 'reception' && currentView !== 'outside' && !showGameResults && !playGame&& (
        <button
          className="absolute top-6 left-6 flex items-center text-white hover:text-gray-200 transition-colors duration-300 focus:outline-none"
          onClick={() => handleCameraChange('reception')}
        >
          <img src={arrow} alt="Back Arrow" className="w-6 h-6 mr-2 transform rotate-180" />
          <span className="text-lg font-semibold">Back to Reception</span>
        </button>
      )}
      {activePopup && currentView !== 'projects' && (
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '70%',
          height: '85%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #333',
          borderRadius: '10px',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <About activePopup={activePopup} onClose={() => setActivePopup(null)} />
        </div>
      )}
      {activePopup && currentView !== 'about' && (
        <div style={{
          position: 'absolute',
          top: '4%',
          left: '17%',
          width: '70%',
          height: '95%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #333',
          borderRadius: '10px',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <Projects activePopup={activePopup} onClose={() => setActivePopup(null)} />
        </div>
      )}
      {showStartPopup && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-8 rounded-xl text-center shadow-lg z-50 max-w-md w-full">
          <Dumbbell className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Lift?</h2>
          <p className="mb-6 text-gray-300">Challenge yourself with the Bench Press Game!</p>
          <button 
            onClick={handleStartGame}
            className="flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </button>
        </div>
      )}
      {showGameResults && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-8 rounded-xl text-center shadow-lg z-50 max-w-md w-full">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-3xl font-bold mb-4 text-white">Game Over</h2>
          <p className="text-xl mb-2 text-gray-300">Score: <span className="text-emerald-400 font-bold">{score}</span></p>
          <p className="text-xl mb-6 text-gray-300">High Score: <span className="text-emerald-400 font-bold">{highScore}</span></p>
          <div className="flex space-x-4">
            <button 
              onClick={handleStartGame}
              className="flex-1 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Play Again
            </button>
            <button 
              onClick={() => {handleCameraChange('reception'); setShowGameResults(false);}}
              className="flex-1 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Reception
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default App;
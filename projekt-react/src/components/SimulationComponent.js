import React, { useState, useEffect} from 'react';
import '../styles/SimulationComponent.css'; 

const SimulationComponent = (props) => {

  const onMainVisibilityChangeButton = props.onMainVisibilityChangeButton

  const simFunctions = props.simFunctions
  const simAlgorithms = props.simAlgorithms
  
  const [mainVisible, setMainVisible] = useState(true);

  useEffect(() => {
    onMainVisibilityChangeButton(mainVisible);
  }, [mainVisible]);

  
  
  const handleSimulationStart = () => {
    if(simAlgorithms.length > 0 & simFunctions.length > 0){
      console.log("Changed visibility")
      setMainVisible(false)
    }


    
  };

  return (
    <div className="simulation-container">
      <div className="content">
        <h2>Start the simulation</h2>
        <button onClick={handleSimulationStart}>Start</button>
      </div>
    </div>
  );
};

export default SimulationComponent;

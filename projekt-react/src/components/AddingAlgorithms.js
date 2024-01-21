import React, { useState, useEffect } from 'react';
import '../styles/SimulationComponent.css'; // Import the CSS file

const AddingAlgorithms = (props) => {
  const [algVis, setAlgVis] = useState(false)
  const handleAlgVisAdd = props.handleAlgVisAdd

  

  useEffect(() => {
    handleAlgVisAdd(algVis);
  }, [algVis, handleAlgVisAdd]);


  const handleClick = () => {
    setAlgVis(true)
  }

  return (
    <div className="simulation-container">
      <div className="content">
        <h2>Add New Algorithms</h2>
        <p>New optimization algorithms for testing given functions.</p>
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default AddingAlgorithms;

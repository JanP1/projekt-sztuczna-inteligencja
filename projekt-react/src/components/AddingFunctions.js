import React, { useState, useRef, useEffect } from 'react';
import '../styles/SimulationComponent.css'; // Import the CSS file

const AddingFunctions = (props) => {
  const [funVis, setFunVis] = useState(false)
  const handleFunVisAdd = props.handleFunVisAdd

  const [selectedFilePath, setSelectedFilePath] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    handleFunVisAdd(funVis);
  }, [funVis, handleFunVisAdd]);


  const handleClick = () => {
    setFunVis(true)
  }

  return (
    <div className="simulation-container">
      <div className="content">
        <h2>Add New Functions</h2>
        <p>A place to add new functions that have to be tested.</p>
        <button onClick = {handleClick}>Add</button>
      </div>
    </div>
  );
};

export default AddingFunctions;

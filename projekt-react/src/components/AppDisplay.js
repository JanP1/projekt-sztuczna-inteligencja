import React, {useState, useEffect} from 'react';
import '.././styles/App.css';
import SimulationComponent from './SimulationComponent';
import AddingAlgorithms from './AddingAlgorithms';
import AddingFunctions from './AddingFunctions';
import AlgorithmsList from './AlgorithmsList';
import FunctionsList from './FunctionsList';
import AddinGFunPage from './AddinGFunPage';
import AddingAlgPage from './AddingAlgPage';

export default function AppDisplay(props) {


  const onFunRoutChange = props.onFunRoutChange
  const onAlgRoutChange = props.onAlgRoutChange

  const onMainVisibilityChange = props.onMainVisibilityChange


  const [addAlgV, setAddAlgV] = useState(false)
  const [addFunV, setAddFunV] = useState(false)

  const [buttonMainVisibility, setButtonMainVisibility] = useState(true)
 

  const [grandParentAlgorithmValue, setGrandParentAlgorithmValue] = useState([]);

  const [canAddFunctions, setCanAddFunctions] = useState(true)

  const onMainVisibilityChangeButton = (value) => {
    setButtonMainVisibility(value);
  };
  


  const handleAlgChange = (value) => {
    setGrandParentAlgorithmValue(value);
    if(value.length > 1){
      setCanAddFunctions(false)
    }
    else{
      setCanAddFunctions(true)
    }
    // Handle the grandParentAlgorithmValue changes here
    console.log('Updated grandParentAlgorithmValue in grandparent component:', value);
  };
  
  const [grandParentFunctionValue, setGrandParentFunctionValue] = useState([]);
  const [canAddAlgorithms, setCanAddAlgorithms] = useState(true)

  const handleFunChange = (value) => {
    setGrandParentFunctionValue(value);
    if(value.length > 1){
      setCanAddAlgorithms(false)
    }
    else{
      setCanAddAlgorithms(true)
    }
    // Handle the grandParentAlgorithmValue changes here
    console.log('Updated grandParentFunctionValue in grandparent component:', value);
  };
  
  useEffect(() => {
    onFunRoutChange(grandParentFunctionValue);
  }, [grandParentFunctionValue, onFunRoutChange]);

  useEffect(() => {
    onAlgRoutChange(grandParentAlgorithmValue);
  }, [grandParentAlgorithmValue, onAlgRoutChange]);

  useEffect(() => {
    onMainVisibilityChange(buttonMainVisibility);
    console.log("app display visibility change", buttonMainVisibility)
  }, [buttonMainVisibility]);

  const handleAlgVisAdd = (value) => {
    setAddAlgV(value)
  }
  const handleFunVisAdd = (value) => {
    setAddFunV(value)
  }
  


  return (
    <>
      {addFunV && !addAlgV && <AddinGFunPage handleFunVisAdd={handleFunVisAdd}/>}
      {addAlgV && !addFunV && <AddingAlgPage handleAlgVisAdd={handleAlgVisAdd}/>}
      {!addAlgV && !addFunV && <div>
      <h1>Projekt ZSI</h1>
      <div className='app-container'>
        <SimulationComponent simFunctions={grandParentFunctionValue} simAlgorithms={grandParentAlgorithmValue}
        onMainVisibilityChangeButton={onMainVisibilityChangeButton}/>
      
        <AddingAlgorithms handleAlgVisAdd={handleAlgVisAdd}/>

        <AddingFunctions handleFunVisAdd={handleFunVisAdd}/>
      </div>
      <div className='app-container'>
        <div className='half-width'>
          <AlgorithmsList onAlgValueChange={handleAlgChange} canAddMore={canAddAlgorithms}/>
        </div>
        <div className='half-width'>
          <FunctionsList onFunValueChange={handleFunChange} canAddMore={canAddFunctions}/>
        </div>
      </div>
      </div>}
    </>
  );
}

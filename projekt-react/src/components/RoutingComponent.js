import React, { useState, useEffect } from 'react'
import AppDisplay from './AppDisplay';
import SimulationPage from './SimulationPage';
import Restart from './Restart';
export default function RoutingComponent() {

  const [unfinished, setUnfinished] = useState()
  const [gotResponse, setGotResponse] = useState()
  
  useEffect(() => {
    // Function to make the API call
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7140/Api/Solve/Resume');
        const data = await response.json();
        setUnfinished(data); // Set the data in the state variable
        setGotResponse(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  useEffect(() => {
      const handleBeforeUnload = (event) => {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []); // Empty dependency array ensures the effect runs only once on mount
  

  const [mainVisibility, setMainVisibility] = useState(true)
  const [simVisibility, setSimVisibility] = useState(false)

  const [funcNames, setFuncNames] = useState(['Function1']);    
  const [algNames, setAlgNames] = useState(['Function2']);    

  const onUnfinishedChange = (value) => {
    setUnfinished(value);
  }

  const onFunRoutChange = (updatedNames) => {
      setFuncNames(updatedNames);
      console.log('Updated functions in ROUTER component:', updatedNames);
  };

  const onAlgRoutChange = (updatedNames) => {
      setAlgNames(updatedNames);
      console.log('Updated algorithms in ROUTER component:', updatedNames);
  };
  const onMainVisibilityChange = (value) => {
      console.log("router visibility", value)
      
      setSimVisibility(!value)
      setMainVisibility(value);
  };
  console.log(simVisibility)

  if(!gotResponse){
    return(<p>Loading...</p>)
  }

  return (
      <>
      {!unfinished && mainVisibility && <AppDisplay onFunRoutChange={onFunRoutChange} onAlgRoutChange={onAlgRoutChange}
      onMainVisibilityChange={onMainVisibilityChange}/>}
      {!unfinished && simVisibility && <SimulationPage algRoutNames = {algNames} funcRoutNames = {funcNames} 
      onMainVisibilityChange={onMainVisibilityChange}/>}
      
      {unfinished && <Restart onUnfinishedChange={onUnfinishedChange}/>}
      </>
  )
}

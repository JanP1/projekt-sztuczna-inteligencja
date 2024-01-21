import React, { useEffect, useState } from 'react'
import '../styles/AlgorithmsList.css';
import FunctionListItems from './FunctionListItems';

export default function FunctionsList(props) {
  const onGrandParentValueChange = props.onFunValueChange;
  const canAddMoreFunctions = props.canAddMore
  const [myFunctions, setMyFunctions] = useState(null)

  const [functionNames, setFunctionNames] = useState([]);

  const [grandParentValue, setGrandParentValue] = useState([]);

  const handleNamesChange = (updatedNames) => {
    setFunctionNames(updatedNames);
    console.log('Updated functionNames in parent component:', updatedNames);
  };

  useEffect(() => {
    // Update grandParentValue whenever names changes in ParentComponent
    setGrandParentValue([...functionNames]); // Store a new copy of the names array
    onGrandParentValueChange([...functionNames]); // Pass grandParentValue to the parent of the ParentComponent
  }, [functionNames]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7140/Api/Dll/functionList');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setMyFunctions(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  },[])


  

  return (

    <div className='list-container'>
    <div className='list-content'>
      <h1>List Of Available Functions</h1>
      {myFunctions==null ? (

        <p>List currently empty.</p>

        ):(

        <FunctionListItems functions={myFunctions} onNamesChange={handleNamesChange} canAddMore={canAddMoreFunctions}/>

      )}
    </div>
    </div>
  )
}

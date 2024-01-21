import React, { useEffect, useState } from 'react'
import '../styles/AlgorithmsList.css';
import AlgorithmListItems from './AlgorithmListItems';

export default function AlgorithmsList(props) {

  const canAddMoreAlgorithms = props.canAddMore
  const onGrandParentValueChange = props.onAlgValueChange;
  const [myAlgorithms, setMyAlgorithms] = useState(null);
  const [algorithmNames, setAlgorithmNames] = useState([]);
  const [grandParentValue, setGrandParentValue] = useState([]);

  const handleNamesChange = (updatedNames) => {
    setAlgorithmNames(updatedNames);
    console.log('Updated algorithms in parent component:', updatedNames);
  };

  useEffect(() => {
    // Update grandParentValue whenever names changes in ParentComponent
    setGrandParentValue([...algorithmNames]); // Store a new copy of the names array
    onGrandParentValueChange([...algorithmNames]); // Pass grandParentValue to the parent of the ParentComponent
  }, [algorithmNames]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7140/Api/Dll/algorithmList');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData)
        setMyAlgorithms(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  },[])


  return (

    <div className='list-container'>
    <div className='list-content'>
      <h1>List Of Available Algorithms</h1>
      {myAlgorithms==null ? (

        <p>List currently empty.</p>

        ):(

        <AlgorithmListItems algorithms={myAlgorithms} onNamesChange={handleNamesChange} canAddMore={canAddMoreAlgorithms}/>

      )}
    </div>
    </div>
  )
}

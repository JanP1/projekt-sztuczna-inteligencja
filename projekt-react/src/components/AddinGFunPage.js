import React, {useState, useEffect}  from 'react'
import '.././styles/SimulationPage.css';
export default function AddinGFunPage(props) {
    const [funVis, setFunVis] = useState(true)
    const handleFunVisAdd = props.handleFunVisAdd
  
    


    useEffect(() => {
        handleFunVisAdd(funVis);
      }, [funVis, handleFunVisAdd]);
    
    
    const handleClick = () => {
    setFunVis(false)
    }


    const [name, setName] = useState();
    const [myPath, setMyPath] = useState();
    const [dim, setDim] = useState()
    const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
    const handlePathChange = (event) => {
        setMyPath(event.target.value);
    };
    const handleDimChange = (event) => {
      setDim(event.target.value);
    };

   
    const [apiResponse, setApiResponse] = useState()
    const handleAdd = async () => {
      if (name && myPath && dim){
      const entry = {
        "dllID": 0,
        "dllName": name,
        "dllPath": myPath,
        "dllType": "funkcja",
        "dllDim": dim
      }
      const request = JSON.stringify(entry)
      
      try {
      const response = await fetch(
        'https://localhost:7140/Api/Dll/AddDLLFile',
        {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: request,
          
        }
        
      );
      console.log(entry)
      setApiResponse(data);
      setFunVis(false);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Assuming the response is JSON
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }


      };
    }

    const handleKeyPress = (event) => {
      // Allow only digits (0-9) and the Backspace key
      const isValidInput = /^\d$/.test(event.key) || event.key === 'Backspace';
  
      if (!isValidInput) {
        // Prevent the input if the key is not a digit or Backspace
        event.preventDefault();
      }
    };
  
    return (
      <div >
        <button onClick = {handleClick}>Back</button>
        <div>
        <div className='simulation-container'>
            Enter the name of the function:
            <input className='dark-blue-input'
            type="text"
            value={name}
            onChange={handleNameChange}
            />
        </div>
        <div className='simulation-container'>
            Enter the path of the function file:
            <input className='dark-blue-input'
            type="text"
            value={myPath}
            onChange={handlePathChange}
            />
        </div>
        <div className='simulation-container'>
            Enter the dimention of the function:
            <input className='dark-blue-input'
            type="number"
            step="1"
            value={dim}
            onChange={handleDimChange}
            onKeyPress={handleKeyPress}
            />
        </div>
        <button onClick = {handleAdd}>Add</button>
        </div>
      </div>
    );
  };
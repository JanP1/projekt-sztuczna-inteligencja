import React, {useState, useEffect} from 'react'
import '.././styles/SimulationPage.css';
export default function AddingAlgPage(props) {
    const [algVis, setAlgVis] = useState(true)
    const handleAlgVisAdd = props.handleAlgVisAdd
  
    
  
    useEffect(() => {
      handleAlgVisAdd(algVis);
    }, [algVis, handleAlgVisAdd]);
  
  
    const handleClick = () => {
      setAlgVis(false)
    }
    const [name, setName] = useState();
    const [myPath, setMyPath] = useState();

    const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
    const handlePathChange = (event) => {
        setMyPath(event.target.value);
    };

    
    const [apiResponse, setApiResponse] = useState()
    const handleAdd = async () => {
      if (name && myPath){
      const entry = {
        "dllID": 0,
        "dllName": name,
        "dllPath": myPath,
        "dllType": "algorytm",
        "dllDim": 0
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
      setAlgVis(false);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Assuming the response is JSON
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }


      };
    }
  
   
  
    return (
      <div >
        <button onClick = {handleClick}>Back</button>
        <div>
        <div className='simulation-container'>
            Enter the name of the algorithm:
            <input className='dark-blue-input'
            type="text"
            value={name}
            onChange={handleNameChange}
            />
        </div>
        <div className='simulation-container'>
            Enter the path of the algorithm file:
            <input className='dark-blue-input'
            type="text"
            value={myPath}
            onChange={handlePathChange}
            />
        </div>
        <button onClick = {handleAdd}>Add</button>
          
        </div>
      </div>
    );
}

import React, {useState, useEffect} from 'react'
import '.././styles/SimulationPage.css';

export default function SimulationPage(props) {
  
  const functionsList = props.funcRoutNames
  const algNamesList = props.algRoutNames



  const onMainVisibilityChange = props.onMainVisibilityChange


  const [dimFun, setDimFun] = useState()
  const [dimAlg, setDimAlg] = useState()

  const [fetchedAlg, setFetchedAlg] = useState()
  const [fetchedFun, setFetchedFun] = useState()


  const [buttonMainVisibility, setButtonMainVisibility] = useState(false)
  const [simulationStarted, setSimulationStarted] = useState(false)
  
  const [dimentionsCompatible, setDimentionsCompatible] = useState(true)  
  console.log("Simulation Func names .. ", functionsList)
  console.log("Simulation Alg names .. ", algNamesList)




  // ----------------------------------------
  const [data, setData] = useState({});
  const [error, setError] = useState(null);


  const [jsonString2, setJsonString2] = useState()
  const [jsonString, setJsonString] = useState()
  const [names, setNames] = useState([]);
  const [intValues, setIntValues] = useState([]); // Add 0 to test the case
  
  
  


  const [upperBoundaries, setUpperBoundaries] = useState([]);
  const [steps, setSteps] = useState([]);
  const [lowerBoundaries, setLowerBoundaries] = useState([]);
  // ----------------------------------------

  console.log("u",upperBoundaries)



  useEffect(() => {
    onMainVisibilityChange(buttonMainVisibility);
    console.log("app display visibility change", buttonMainVisibility)
  }, [buttonMainVisibility]);


  const findUniqueNumber = (arr) => {
    const nonZeroNumbers = new Set(arr.filter(num => num !== 0));

    if (nonZeroNumbers.size === 1) {
      return nonZeroNumbers.values().next().value;
    } else {
      return 0;
    }
  }

  


  const handleSimulationStart1Alg = () => {
    if(functionsList && dimFun && inputValues && dimAlg && upperBoundaries && steps && lowerBoundaries){

      setSimulationStarted(true)

      const jsonString2 = []
      
      
      if (algNamesList.length === 1){
        console.log("Actual Simulation started")
        console.log('upp', upperBoundaries)
        console.log('low', lowerBoundaries)
        console.log('step', steps)
        console.log('funct', functionsList)
        console.log('inputV', inputValues[0][0]['field-min'])

        
        
        

        for (let i = 0; i < functionsList.length; i++) {
          let minList = []
          let maxList = []

          let paramList = []
          for (let k = 0; k < upperBoundaries.length; k++)
          {
            paramList.push([lowerBoundaries[k], upperBoundaries[k], steps[k]])
          }


          for (let j = 0; j < inputValues[i].length; j++){
            minList.push(inputValues[i][j]['field-min'])
            maxList.push(inputValues[i][j]['field-max'])
          }

          const entry = {
            parameters:JSON.stringify(paramList),
            min:minList,
            max:maxList,
            algorithm:algNamesList[0],
            function:functionsList[i]
          };
          jsonString2.push(entry);
        }
      }
      else{
        let minList = []
        let maxList = []

        let paramList = []
        for (let j = 0; j < inputValues[0].length; j++){
          minList.push(inputValues[0][j]['field-min'])
          maxList.push(inputValues[0][j]['field-max'])
        }
        for (let i = 0; i < algNamesList.length; i++) {
          const entry = {
            parameters:JSON.stringify(paramList),
            min:minList,
            max:maxList,
            algorithm:algNamesList[i],
            function:functionsList[0]
          };
          jsonString2.push(entry);
        }
      }
      setJsonString(JSON.stringify(jsonString2))

      console.log('Json',jsonString)

      const postData = async () => {
        try {
          const response = await fetch('https://localhost:7140/Api/Solve/List', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers as needed
            },
            body: JSON.stringify(jsonString2)
          });
    
          if (!response.ok) {
            console.log('Post didnt work')
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.log('Problem fetching Post')
          setError(error.message);
        }
      };

      postData()
    }
  }

  const handleBack = () => {
    console.log("Changed visibility")
    setButtonMainVisibility(true)
  }

  const [algNameFetch, setAlgNameFetch] = useState("")
  const [paramData, setParamData] = useState([])

  // Fetching data to check if the dimentions allow----------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7140/Api/Dll/algorithmList');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log("Checking if compatible", jsonData)
        setFetchedAlg(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7140/Api/Dll/functionList');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log("Checking if compatible fun", jsonData)
        setFetchedFun(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  },[])
  //---------------------------------------------------------------------------------------------------

  useEffect(() => {
    if(fetchedFun){
    const filteredValues = fetchedFun
      .filter(item => functionsList.includes(item.dllName))
      .map(item => item.dllDim);

    setDimFun(filteredValues);
    }
  }, [fetchedFun, functionsList]);

  useEffect(() => {
    if(fetchedAlg){
    const filteredValues = fetchedAlg
      .filter(item => algNamesList.includes(item.dllName))
      .map(item => item.dllDim);

    setDimAlg(filteredValues);
    }
  }, [fetchedAlg, algNamesList]);

  console.log("funDims", dimFun)
  console.log("algDim", dimAlg)

  useEffect(() => {
    if(dimFun && dimAlg){
      const checkArrays = (arrA, arrB) => {
        const uniqueNumbersA = Array.from(new Set(arrA.filter(item => typeof item === 'number' && item !== 0)));
        if (uniqueNumbersA.length === 0 || (uniqueNumbersA.length === 1 && uniqueNumbersA[0] === 0)) {
          return true;
        }
        if (uniqueNumbersA.length <= 1) {
          const uniqueValueA = uniqueNumbersA.length === 1 ? uniqueNumbersA[0] : 0;
    
          return (
            arrA.every(item => typeof item === 'number' && (item === 0 || item === uniqueValueA)) &&
            arrB.every(item => typeof item === 'number' && (item === 0 || item === uniqueValueA))
          );
        }
    
        return false;
      };
      
      setDimentionsCompatible(checkArrays(dimAlg, dimFun))
      
    }

    

  }, [fetchedAlg, fetchedFun]);

  

  const fetchData = async (name) => {
    try {
      const response = await fetch(`https://localhost:7140/Api/ParamInfo?name=${name}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const jsonData = await response.json();
      setParamData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // State variable to track if the initial fetch has been made
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);
  
  // Check if algNamesList is defined and has a length of 1
  useEffect(() => {
    if (dimentionsCompatible && algNamesList && algNamesList.length === 1 && !initialFetchComplete) {
      const algNameToFetch = algNamesList[0];
      setAlgNameFetch(algNameToFetch);
  
      // Call fetchData with the correct name after setting the parameter
      fetchData(algNameToFetch);
  
      // Update state to indicate that the initial fetch has been made
      setInitialFetchComplete(true);
    }
  }, [algNamesList, initialFetchComplete]); // useEffect will run whenever algNamesList or initialFetchComplete changes
  
  // Log paramData within the useEffect
  useEffect(() => {
    const newUpperBoundaries = paramData.map(param => param.upperBoundary);
    const newSteps = paramData.map(param => param.step);
    const newLowerBoundaries = paramData.map(param => param.lowerBoundary);

    setUpperBoundaries(newUpperBoundaries);
    setSteps(newSteps);
    setLowerBoundaries(newLowerBoundaries);
    
  }, [paramData]);
  
  
  console.log("Dims", dimentionsCompatible)

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  

  //--------------------------------------------------------------------
  

  const [inputValues, setInputValues] = useState();
  
  console.log(inputValues)
  const handleInputChange = (nameIndex, pairIndex, field, value) => {
    const floatValue = parseFloat(value) || 0;

    setInputValues((prevInputValues) => {
      const newInputValues = [...prevInputValues];
      newInputValues[nameIndex][pairIndex] = {
        ...newInputValues[nameIndex][pairIndex],
        [field]: floatValue,
      };
      return newInputValues;
    });
  };

  const handleAddPair = (nameIndex) => {
      setInputValues((prevInputValues) => {
        const newInputValues = [...prevInputValues];
        newInputValues[nameIndex] = [
          ...newInputValues[nameIndex],
          { 'field-min': 0, 'field-max': 0 },
        ];
        return newInputValues;
      });
    };

  //--------------------------------------------------------------------

  useEffect(() => {
    if(functionsList && dimFun && dimAlg){
      // console.log('finalDim', dimFun)
      // console.log('finalFun', functionsList)
      // setInputValues(() =>
      // functionsList && functionsList.map((name, index) => {
      //   const numPairs = dimFun&&dimFun[index];
      //   const initialPairs = numPairs === 0 ? [{ 'field-min': 0, 'field-max': 0 }] : [];
      //   return Array.from({ length: numPairs }, (_, pairIndex) => ({
      //     'field-min': 0,
      //     'field-max': 0,
      //   })).concat(initialPairs);
      // }))

      setInputValues(() =>
        functionsList.map((name, index) => {
          const numPairs = dimFun[index];

          // Keep the original condition when both numPairs and varA are 0
          if (numPairs === 0 && findUniqueNumber(dimAlg) === 0) {
            return [{ 'field-min': 0, 'field-max': 0 }];
          }

          // Change the logic when numPairs is 0 and varA is a number different than 0
          if (numPairs === 0 && findUniqueNumber(dimAlg) !== 0) {
            const numFields = findUniqueNumber(dimAlg);
            return Array.from({ length: numFields }, () => ({
              'field-min': 0,
              'field-max': 0,
            }));
          }

          // Default case when numPairs is not 0 or varA is 0
          const numFields = numPairs || findUniqueNumber(dimAlg);
          return Array.from({ length: numFields }, () => ({
            'field-min': 0,
            'field-max': 0,
          }));
        })
      );
    }
  }, [functionsList, dimFun]);

  if(!functionsList || !dimFun || !inputValues || !dimAlg){
    return(<p>Loading...</p>)
  }
  
  return (
    <>
      {simulationStarted && 
      <>
        <h1>Simulation has started</h1>
        <p>If no problems will occure, the results will be generated in a PDF form.</p>
        <div>
        <h2>This was sent to the server. Analize if there appeared to be a problem:</h2>
        <p>{jsonString}</p>
        </div>
      </>}
      {!simulationStarted && <div>
        <div className='top-div-layout'>
        <h1 className='top-page-layout'>Simulation options</h1>
        <button className='top-page-layout' onClick={handleBack}>Back</button>
        {dimentionsCompatible && <button className='top-page-layout' onClick={handleSimulationStart1Alg}>Start simulation</button>}
        {!dimentionsCompatible && <p>There happens to be a problem with the dimentions requirements of your functions and/or algorithms.</p>}
        </div>
        
        {dimentionsCompatible && <div>
        <div>
        <h2>List of Algorithms</h2>
        <ul>
          {algNamesList && algNamesList.map((name, index) => (
            <div className='alg-name' key={index}>{name}</div>
          ))}
        </ul>

        {paramData && paramData.map((param, index) => (
          <div className="simulation-container" key={index}>
            <h3>{param.name}</h3>
            <p>{param.description}</p>
            <p>Upper Boundary: {param.upperBoundary}</p>
            <p>Step: {param.step}</p>
            <p>Lower Boundary: {param.lowerBoundary}</p>
            
            <div>
              <p className='value-settings'>Step</p>
              <input
                className='value-settings dark-blue-input'
                type="number"
                step="0.1"
                value={steps[index]}
                onChange={(e) => {
                  // Handle onChange logic (if needed)
                  const newValue = parseFloat(e.target.value);
                  setSteps((prevValues) => {
                    const newValues = [...prevValues];
                    newValues[index] = isNaN(newValue) ? 0.1 : newValue;
                    return newValues;
                  });
                }}
                onBlur={(e) => {
                  // Handle onBlur logic (validation)
                  const newValue = parseFloat(e.target.value);
                  setSteps((prevValues) => {
                    const newValues = [...prevValues];
                    newValues[index] = isNaN(newValue) ? 0.1 : clamp(newValue, 0.1, 10);
                    return newValues;
                  });
                }}
              />
            </div>
            <div>
              <p className='value-settings'>Lower</p>
              <input
                className='value-settings dark-blue-input'
                type="number"
                step="0.1"
                value={lowerBoundaries[index]}
                onChange={(e) => {
                  // Handle onChange logic (if needed)
                  const newValue = parseFloat(e.target.value);
                  setLowerBoundaries((prevValues) => {
                    const newValues = [...prevValues];
                    newValues[index] = isNaN(newValue) ? param.lowerBoundary : newValue;
                    return newValues;
                  });
                }}
                onBlur={(e) => {
                  // Handle onBlur logic (validation)
                  const newValue = parseFloat(e.target.value);
                  setLowerBoundaries((prevValues) => {
                    const newValues = [...prevValues];
                    newValues[index] = isNaN(newValue)
                      ? param.lowerBoundary
                      : clamp(newValue, param.lowerBoundary, upperBoundaries[index] - 1);
                    return newValues;
                  });
                }}
              />
            </div>
            <div>
              <p className='value-settings'>Upper</p>
              <input
                className='value-settings dark-blue-input'
                type="number"
                step="0.1"
                value={upperBoundaries[index]}
                onChange={(e) => {
                  // Handle onChange logic (if needed)
                  const newValue = parseFloat(e.target.value);
                  setUpperBoundaries((prevValues) => {
                    const newValues = [...prevValues];
                    newValues[index] = isNaN(newValue) ? param.upperBoundary : newValue;
                    return newValues;
                  });
                }}
                onBlur={(e) => {
                  // Handle onBlur logic (validation)
                  const newValue = parseFloat(e.target.value);
                  setUpperBoundaries((prevValues) => {
                    const newValues = [...prevValues];
                    newValues[index] = isNaN(newValue)
                      ? param.upperBoundary
                      : clamp(newValue, lowerBoundaries[index] + 1, param.upperBoundary);
                    return newValues;
                  });
                }}
              />
            </div>
          </div>
        ))}

        
        </div>
        {/* -------------------------------------------Rendering functions----------------------------------------- */}
        <div>
            <h2>List of Functions</h2>
            
                <div >
                  <div>
                  {functionsList && functionsList.map((name, nameIndex) => {
                    const pairs = inputValues[nameIndex];
                    const inputFields = pairs && pairs.map((pair, pairIndex) => {
                      const fieldName = `Dimention ${pairIndex + 1}`;
                      return (
                        <div key={fieldName} className="simulation-container">
                          <p>{`${fieldName} for ${name}: `}</p>
                          <input
                            className='value-settings dark-blue-input'
                            type="number"
                            step="0.01"
                            value={pair['field-min']}
                            onChange={(e) => {
                              const floatValue = parseFloat(e.target.value) || 0;
                              const updatedPair = {
                                ...pair,
                                'field-min': Math.min(floatValue, pair['field-max']), // Ensure min is not bigger than max
                              };
                              handleInputChange(nameIndex, pairIndex, 'field-min', updatedPair['field-min']);
                            }}
                            placeholder="Min"
                          />
                          <input
                            className='value-settings dark-blue-input'
                            type="number"
                            step="0.01"
                            value={pair['field-max']}
                            onChange={(e) => {
                              const floatValue = parseFloat(e.target.value) || 0;
                              const updatedPair = {
                                ...pair,
                                'field-max': Math.max(floatValue, pair['field-min']), // Ensure max is not smaller than min
                              };
                              handleInputChange(nameIndex, pairIndex, 'field-max', updatedPair['field-max']);
                            }}
                            placeholder="Max"
                          />
                        </div>
                      );
                    });

                    // Add button to dynamically add new min-max inputs
                    const addButton =
                      dimFun[nameIndex] === 0 && findUniqueNumber(dimAlg) === 0 ? (
                        <button key={`addButton-${name}`} onClick={() => handleAddPair(nameIndex)}>
                          Add Min-Max Pair
                        </button>
                      ) : null;

                    return (
                      <div key={name}>
                        <h3>{name}</h3>
                        {inputFields}
                        {addButton}
                      </div>
                    );
                  })}
                  </div>
                </div>
             
        </div>
        </div>}
      </div>}
    </>
  )
}

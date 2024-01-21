import React, {useState, useEffect} from 'react'
import '../styles/ListItem.css';
// export default function AlgorithmListItems(props) {

//   const canAddMoreAlg = props.canAddMore
//   const algorithms = props.algorithms
//   const onNamesChange = props.onNamesChange

//   const [numOfDomain, setNumOfDomain] = useState([])

//   const [highlightedItems, setHighlightedItems] = useState({});
//   const [highlightedNames, setHighlightedNames] = useState([]);

  

//   useEffect(() => {
//     onNamesChange(highlightedNames);
//   }, [highlightedNames, onNamesChange]);

//   const toggleHighlight = (itemId) => {
//     setHighlightedItems((prevHighlighted) => {
//       if (!canAddMoreAlg && !prevHighlighted[itemId] && highlightedNames.length > 0) {
//         return prevHighlighted;
//       }

//       const updatedHighlights = {
//         ...prevHighlighted,
//         [itemId]: !prevHighlighted[itemId],
//       };

//       const updatedNames = Object.entries(updatedHighlights)
//       .filter(([, highlighted]) => highlighted)
//       .map(([id]) => {
//         const selectedItem = algorithms.find((item) => item.dllID === parseInt(id, 10));
//         return selectedItem ? selectedItem.dllName : ''; // Check if selectedItem exists before accessing its properties
//       });

//     setHighlightedNames(updatedNames);
//     console.log(updatedNames); // Logging the updated highlightedNames

//     return updatedHighlights;
//     });
//   };

//   console.log("Can add alg", canAddMoreAlg)

//   return (
//     <div className='list-item'>
//       {algorithms.map((alg) => (
//         <div className={`list-item-preview ${highlightedItems[alg.dllID] ? 'highlight' : ''}`} key={alg.dllID} 
//         onClick={() => toggleHighlight(alg.dllID)}>
//             <p>{alg.dllName}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

export default function AlgorithmListItems(props) {
  
  const canAddMoreAlg = props.canAddMore;
  const algorithms2 = props.algorithms;
  const onNamesChange = props.onNamesChange;

  const [algorithms, setAgorithms] = useState(algorithms2)

  const [apiResponse, setApiResponse] = useState(null);
  const [highlightedItems, setHighlightedItems] = useState({});
  const [highlightedNames, setHighlightedNames] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteConfirmationActive, setDeleteConfirmationActive] = useState(false);


  const deleteDataFromServer = async (name) => {
    try {
      const response = await fetch(`https://localhost:7140/Api/Dll/${name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };


  useEffect(() => {
    onNamesChange(highlightedNames);
  }, [highlightedNames, onNamesChange]);

  const toggleHighlight = (itemId) => {
    if (deleteConfirmationActive) {
      return;
    }

    setHighlightedItems((prevHighlighted) => {
      if (!canAddMoreAlg && !prevHighlighted[itemId] && highlightedNames.length > 0) {
        return prevHighlighted;
      }

      const updatedHighlights = {
        ...prevHighlighted,
        [itemId]: !prevHighlighted[itemId],
      };

      const updatedNames = Object.entries(updatedHighlights)
        .filter(([, highlighted]) => highlighted)
        .map(([id]) => {
          const selectedItem = algorithms.find((item) => item.dllID === parseInt(id, 10));
          return selectedItem ? selectedItem.dllName : '';
        });

      setHighlightedNames(updatedNames);

      return updatedHighlights;
    });
  };

  const handleDeleteClick = (itemToDelete) => {
    setShowDeleteConfirmation(true);
    setItemToDelete(itemToDelete);
    setDeleteConfirmationActive(true);
  };

  const handleDeleteConfirmation = (confirmed) => {
    setShowDeleteConfirmation(false);
    setDeleteConfirmationActive(false);

    if (confirmed && itemToDelete) {

      console.log(`Deleting item: ${itemToDelete.dllName}`);
      deleteDataFromServer(itemToDelete.dllName)
      const updatedItems = algorithms.filter(item => item.dllName !== itemToDelete.dllName);
      setAgorithms(updatedItems)
    }
  };

  return (
    <div className='list-item'>
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete {itemToDelete.dllName}?</p>
          <button onClick={() => handleDeleteConfirmation(true)}>Yes</button>
          <button onClick={() => handleDeleteConfirmation(false)}>No</button>
        </div>
      )}
      {algorithms.map((alg) => (
        <div key={alg.dllID}>
          <div
            className={`list-item-preview ${highlightedItems[alg.dllID] ? 'highlight' : ''}`}
            onClick={() => toggleHighlight(alg.dllID)}
          >
            <p>{alg.dllName}</p>
          </div>
          {!highlightedItems[alg.dllID] && !deleteConfirmationActive && (
            <button onClick={() => handleDeleteClick(alg)}>Delete</button>
          )}
        </div>
      ))}
      
    </div>
  );
}
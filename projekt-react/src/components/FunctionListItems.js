// import React, {useState, useEffect} from 'react'
// import '../styles/ListItem.css';

// export default function FunctionListItems(props) {
//   const canAddMoreFun = props.canAddMore
//   const functions = props.functions
//   const onNamesChange = props.onNamesChange

//   const [highlightedItems, setHighlightedItems] = useState({});
//   const [highlightedNames, setHighlightedNames] = useState([]);

//   useEffect(() => {
//     onNamesChange(highlightedNames); // Call the callback function when highlightedNames change
//   }, [highlightedNames, onNamesChange]);

//   const toggleHighlight = (itemId) => {
  
//     setHighlightedItems((prevHighlighted) => {
//       if (!canAddMoreFun && !prevHighlighted[itemId] && highlightedNames.length > 0) {
//         return prevHighlighted;
//       }
//       const updatedHighlights = {
//         ...prevHighlighted,
//         [itemId]: !prevHighlighted[itemId],
//       };

//       const updatedNames = Object.entries(updatedHighlights)
//       .filter(([, highlighted]) => highlighted)
//       .map(([id]) => {
//         const selectedItem = functions.find((item) => item.dllID === parseInt(id, 10));
//         return selectedItem ? selectedItem.dllName : ''; // Check if selectedItem exists before accessing its properties
//       });

//     setHighlightedNames(updatedNames);
//     console.log(updatedNames); // Logging the updated highlightedNames

//     return updatedHighlights;
//     });
//   };

//   console.log("Can add fun", canAddMoreFun)

//   return (
//     <div className='list-item'>
//       {functions.map((fun) => (
//         <div className={`list-item-preview ${highlightedItems[fun.dllID] ? 'highlight' : ''}`} key={fun.dllID} 
//         onClick={() => toggleHighlight(fun.dllID)}>
//             <p>{fun.dllName}</p>
//         </div>
//       ))}
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import '../styles/ListItem.css';

// DeleteConfirmation component for the confirmation window
const DeleteConfirmation = ({ itemToDelete, onConfirmation }) => {
  const handleConfirmation = (confirmed) => {
    onConfirmation(confirmed);
  };

  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete {itemToDelete.dllName}?</p>
      <button onClick={() => handleConfirmation(true)}>Yes</button>
      <button onClick={() => handleConfirmation(false)}>No</button>
    </div>
  );
};




export default function FunctionListItems(props) {
  const canAddMoreFun = props.canAddMore;
  const functions2 = props.functions;
  const onNamesChange = props.onNamesChange;

  const [apiResponse, setApiResponse] = useState(null);
  const [functions, setFunctions] = useState(functions2)
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
      if (!canAddMoreFun && !prevHighlighted[itemId] && highlightedNames.length > 0) {
        return prevHighlighted;
      }

      const updatedHighlights = {
        ...prevHighlighted,
        [itemId]: !prevHighlighted[itemId],
      };

      const updatedNames = Object.entries(updatedHighlights)
        .filter(([, highlighted]) => highlighted)
        .map(([id]) => {
          const selectedItem = functions.find((item) => item.dllID === parseInt(id, 10));
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
      const updatedItems = functions.filter(item => item.dllName !== itemToDelete.dllName);
      setFunctions(updatedItems)
    }
  };

  return (
    <div>
    <div className='list-item'>
      {deleteConfirmationActive && (
        <DeleteConfirmation
          itemToDelete={itemToDelete}
          onConfirmation={handleDeleteConfirmation}
        />
      )}
      {functions.map((fun) => (
        <div key={fun.dllID}>
          <div
            className={`list-item-preview ${highlightedItems[fun.dllID] ? 'highlight' : ''}`}
            onClick={() => toggleHighlight(fun.dllID)}
          >
            <p>{fun.dllName}</p>
          </div>
          {!highlightedItems[fun.dllID] && !deleteConfirmationActive && (
            <button onClick={() => handleDeleteClick(fun)}>Delete</button>
          )}
        </div>
      ))}
      
    </div>
    </div>
  );
}
import React, { useState } from 'react';

const Test = () => {
    const names = ['Name1', 'Name2', 'Name3', 'Name4'];
    const intValues = [3, 1, 0, 3]; // Add 0 to test the case
  
    const [inputValues, setInputValues] = useState(() =>
      names.map((name, index) => {
        const numPairs = intValues[index];
        const initialPairs = numPairs === 0 ? [{ 'field-min': 0, 'field-max': 0 }] : [];
        return Array.from({ length: numPairs }, (_, pairIndex) => ({
          'field-min': 0,
          'field-max': 0,
        })).concat(initialPairs);
      })
    );
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
  
    return (
      <div>
        {names.map((name, nameIndex) => {
          const pairs = inputValues[nameIndex];
          const inputFields = pairs.map((pair, pairIndex) => {
            const fieldName = `field-${pairIndex + 1}`;
            return (
              <div key={fieldName}>
                <label>{`${fieldName} for ${name}: `}</label>
                <input
                  type="number"
                  step="0.01"
                  value={pair['field-min']}
                  onChange={(e) => handleInputChange(nameIndex, pairIndex, 'field-min', e.target.value)}
                  placeholder="Min"
                />
                <input
                  type="number"
                  step="0.01"
                  value={pair['field-max']}
                  onChange={(e) => handleInputChange(nameIndex, pairIndex, 'field-max', e.target.value)}
                  placeholder="Max"
                />
              </div>
            );
          });
  
          // Add button to dynamically add new min-max inputs
          const addButton =
            intValues[nameIndex] === 0 ? (
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
    );
};
  
export default Test;
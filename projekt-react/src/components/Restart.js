import React, { useEffect, useState } from 'react'

export default function Restart(props) {
    const onUnfinishedChange = props.onUnfinishedChange;
    const [wantToResume, setWantToResume] = useState(true)
    const [apiResponse, setApiResponse] = useState(null);
    const [resuming, setResuming] = useState(false)


    
    

    const handleNoClick = async () => {
        try {
            setWantToResume(false)
            const response = await fetch('https://localhost:7140/Api/Solve/Resume', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain',
              },
              body: 'false' // Convert the boolean value to a string and send it as plain text
          });
  
              const data = await response.text(); // Assuming the response is in plain text
              setApiResponse(data);
              onUnfinishedChange(false);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
        

    }
    const handleYesClick = async () => {
        try {
          const response = await fetch('https://localhost:7140/Api/Solve/Resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain',
            },
            body: 'true' // Convert the boolean value to a string and send it as plain text
        });

            const data = await response.text(); // Assuming the response is in plain text
            setApiResponse(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <>
        {!resuming && <div>
            <h1>It appears that you have unfinished calculations.</h1>
            <p>Would you like to finish them?</p>
            <button onClick={handleYesClick}>Yes</button>
            <button onClick={handleNoClick}>No</button>
        </div>}
        </>
  )
}

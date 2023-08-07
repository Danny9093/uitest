import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

const InstitutionTable = () => {
  const [myInstitutions, setMyInstitutions] = useState([]);

  useEffect(() => {
    const callAPI = (keyword, scope, createinstitutionid) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({ "keyword": keyword, "scope": scope, "createinstitutionid": createinstitutionid });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://3se4klqlfa.execute-api.us-east-1.amazonaws.com/dev/", requestOptions)
        .then(response => response.json())
        .then(data => {
          // Assuming data is already parsed JSON object
          const parsedData = data;
          console.log(parsedData);

          setMyInstitutions(parsedData);
        })
        .catch(error => console.log('error', error));
    };

    callAPI(/* provide your keyword, scope, and createinstitutionid values */);
  }, []);

  const renderTable = () => {
    if (myInstitutions.length === 0) {
      return null;
    }

    const col = Object.keys(myInstitutions[0]);

    return (
      <table>
        <thead>
          <tr>
            {col.map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {myInstitutions.map((institution, index) => (
            <tr key={index}>
              {col.map((key, innerIndex) => (
                <td key={innerIndex}>{institution[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {renderTable()}
    </div>
  );
};

export default InstitutionTable;



/*export default App;*/

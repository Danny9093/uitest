import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

const InstitutionTable = () => {
  const [myInstitutions, setMyInstitutions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

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

  const filteredInstitutions = myInstitutions.filter(institution =>
    institution.IpedsName.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const renderTable = () => {
    if (filteredInstitutions.length === 0) {
      return <p>No institutions found.</p>;
    }

    const col = Object.keys(filteredInstitutions[0]);

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
          {filteredInstitutions.map((institution, index) => (
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
      <input
        type="text"
        placeholder="Search by institution name"
        value={searchKeyword}
        onChange={e => setSearchKeyword(e.target.value)}
      />
      {renderTable()}
    </div>
  );
};

export default InstitutionTable;

import React, { useState, useEffect } from 'react';
import {useApi} from '../utils/api';

function DocumentationList({onSelectDocument}) {
  const [documentations, setDocumentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchWithAuth } = useApi();

  useEffect(() => {
    const fetchDocumentations = async () => {
        try {
            const response = await fetchWithAuth('http://localhost:8080/api/documentation/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',                   
                }                
            });
            const data = await response.json();
         
            setDocumentations(data);
            setLoading(false);
            } catch (e) {
                setError(e.message);
                setLoading(false);
            }
        };
  
    fetchDocumentations();
  }, []);

  if (loading) {
    return <div>Loading documentations...</div>;
  }


  return (
    <div>
      <h2>List of Documentations</h2>
      {documentations.length > 0 ? (
        <ul>
          {documentations.map(doc => (
            <li key={doc.id} onClick={() => onSelectDocument(doc.id)}> 
              {doc.id}             
            </li>
          ))}
        </ul>
      ) : (
        <p>No documentations found.</p>
      )}
    </div>
  );
}

export default DocumentationList;
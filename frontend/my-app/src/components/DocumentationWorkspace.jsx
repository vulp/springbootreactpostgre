import React, { useState, useEffect } from 'react';
import DocumentationList from './DocumentationList';
import DocumentationEditor from './DocumentationEditor';
import {useApi} from '../utils/api';

function DocumentationWorkspace() {
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const { fetchWithAuth } = useApi();

  const handleSelectDocument = (id) => {  
    console.log('set',id);
    setSelectedDocumentId(id);
    setSelectedDocument(null);
  }

    useEffect(() => {
        const fetchDocumentation = async () => {
            try {
                const response = await fetchWithAuth(`http://localhost:8080/api/documentation/${selectedDocumentId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',                   
                    }                
                });
                const data = await response.json();
             console.log('jepa',data);
                setSelectedDocument(data);
                
                } catch (e) {
                  console.error(e);
                }
            };
      
        fetchDocumentation();
      }, [selectedDocumentId]);

  return (
    <div>
      <h1>Documentation Workspace</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <DocumentationList onSelectDocument={handleSelectDocument} />
        </div>
        <div style={{ flex: 2 }}>
          <DocumentationEditor document={selectedDocument} />
        </div>
      </div>
      {/* You might add a button here to create new documentation */}
    </div>
  );
}

export default DocumentationWorkspace;
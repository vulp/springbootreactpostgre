import React, { useState, useEffect } from 'react';
import {useApi} from '../utils/api';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function DocumentationList({documentations, onSelectDocument}) {
  //const [documentations, setDocumentations] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { fetchWithAuth } = useApi();

  const handleListItemClick = (id) => {   
    onSelectDocument(id);
    setSelectedIndex(id);    
  };
/*
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

  */
 // if (loading) {
   // return <div>Loading documentations...</div>;
  //}


  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {documentations.length > 0 ? (
    <List component="nav" aria-label="main mailbox folders">
      {documentations.map(doc => (
        <ListItemButton
          key={doc.id}
          selected={doc.id === selectedIndex}                
          onClick={(event) => handleListItemClick(doc.id)}
      >
        <ListItemIcon>
          
        </ListItemIcon>
        <ListItemText primary={doc.identifier} secondary={doc.id}/>
      </ListItemButton>
    ))}
    </List>
    ) : (
      <p>"plaa no cont"</p>
    )}
  </Box>
    
  );
}

export default DocumentationList;
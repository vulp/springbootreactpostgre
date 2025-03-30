import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {useAuth} from '../hooks/useAuth';
import {useApi} from '../utils/api';

function DocumentationEditor({document}) {
    const [documentContent, setDocumentContent] = useState('');
    const {logout} = useAuth();
    const {fetchWithAuth} = useApi();

    useEffect(() => {
        if (document && document.content) {
            setDocumentContent(document.content);
        } else {
            setDocumentContent(''); 
        }
    }, [document]);


    const handleChange = (value) => {
        setDocumentContent(value);
    };

    const handleSubmit = async () => {
        try {

            const result = await fetchWithAuth('http://localhost:8080/api/documentation/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content: documentContent}),
            });

            
        } catch (error) {
            console.error('Error',error);
        }
    }

    return (
        <div>
            <h2>Documentation Editor</h2>
            <p>todo naming needed</p>
            <ReactQuill
                theme="snow" // You can choose other themes as well
                value={documentContent}
                onChange={handleChange}
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote', 'code-block'],

                        [{'header': 1}, {'header': 2}],               // custom button values
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                        [{'direction': 'rtl'}],                         // text direction

                        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],

                        [{'color': []}, {'background': []}],          // dropdown with defaults and values
                        [{'font': []}],
                        [{'align': []}],

                        ['clean'],                                         // remove formatting button
                        ['link', 'image', 'video']                         // link and image, video
                    ],
                }}
                formats={[
                    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
                    'header', 'list', 'script', 'indent', 'direction', 'size', 'color',
                    'background', 'font', 'align', 'link', 'image', 'video'
                ]}
            />
            <div className="preview" style={{marginTop: '20px', border: '1px solid #ccc', padding: '10px'}}>
                <h3>Document Preview:</h3>
                <div dangerouslySetInnerHTML={{__html: documentContent}}/>
            </div>
            <button onClick={handleSubmit}>Save</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default DocumentationEditor;
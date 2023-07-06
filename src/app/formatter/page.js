'use client'
import React, { useState } from 'react';


const FormatData = () => {

    const [jsonData, setJsonData] = useState('');
    const [formattedJson, setFormattedJson] = useState('');

    const handleJsonChange = (event) => {
        setJsonData(event.target.value);
    };

    const formatJson = () => {
        try {
            const parsedJson = JSON.parse(jsonData);
            const prettyJson = JSON.stringify(parsedJson, null, 2);
            setFormattedJson(prettyJson);
        } catch (error) {
            console.error('Invalid JSON format', error);
            setFormattedJson('Invalid JSON format');
        }
    };

    return (
        <>
            <div className="col">
                <div className="card mt-4 shadow">
                    <div className="card-header">
                        Formatter
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <textarea
                                rows="10"
                                cols="50"
                                value={jsonData}
                                onChange={handleJsonChange}
                                placeholder="Enter JSON data..."
                            />
                        </div>
                        <div className='mt-2'>
                            <button className='btn btn-primary float-end' onClick={formatJson}>Format JSON</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className='shadow mt-4'>
                    <pre className='p-3'>{formattedJson}</pre>
                </div>
            </div>
        </>
    )
}

export default FormatData;
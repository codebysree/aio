'use client'

import { useState } from "react";

import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

export default function Dictionary() {

    const [word, setWord] = useState('');
    const [resultArr, setResultArr] = useState([]);

    const handleChange = (event) => {
        console.log(event.target)
        setWord(event.target.value);
    }

    const getMeaning = async () => {
        const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/<word>';
        const res = await fetch(url.replace('<word>', word));
        const resjson = await res.json();

        if (resjson[0] && resjson[0].meanings[0]) {
            const meaning = resjson[0].meanings[0].definitions;
            console.log('222', meaning);
            setResultArr(meaning);
        } else {
            setResultArr([]);
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        getMeaning();
    }

    return (
        <>
            <div className="col-lg-6 col-sm-12">
                <div className="card mt-2 shadow">
                    <div className="card-header">Dictionary</div>
                    <div className="card-body">
                        <div className="row">
                            <form id="dictionary" onSubmit={onFormSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" name="word" className="form-control" onChange={handleChange} placeholder="Type your word here ...." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2">
                                        <button type="submit" className="btn btn-link" onClick={getMeaning}>
                                            <i className="bi bi-search"></i>
                                        </button>

                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div >

            <div className="col-lg-6 col-sm-12 mt-2">

                <div className="card">
                    <div className="card-header">
                        Meaning
                    </div>
                    <div className="card-body">
                        {resultArr.length > 0 ?

                            <Accordion defaultActiveKey="0">
                                {
                                    resultArr.map((item, index) => (
                                        <Accordion.Item eventKey={index} key={index}>
                                            <Accordion.Header>
                                                <div className="clearfix">
                                                    <span className="float-start">
                                                        {item.definition}
                                                    </span>
                                                    <span className="badge bg-success float-end">{item.example?.length ? 1 : ''}</span>
                                                </div>
                                            </Accordion.Header>
                                            {item.example ?
                                                <Accordion.Body>
                                                    <Alert key='primary' variant='primary'>
                                                        <span><Badge bg="primary">Example :</Badge></span>
                                                        <hr></hr>
                                                        {item.example}
                                                    </Alert>
                                                </Accordion.Body> : ''}
                                        </Accordion.Item>

                                    ))
                                }
                            </Accordion>
                            :
                            <span>
                                <Badge bg="warning">Not Found</Badge>
                            </span>
                        }
                    </div>
                    <div className="card-footer">
                        Meaning
                    </div>

                </div>

            </div>
        </>
    )

}
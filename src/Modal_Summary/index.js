import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header';
import { useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Example using react-icons


const NWPModelTable = () => {
    const [models, setModels] = useState([
        { modelName: 'ARPEGE 25 & ICON 25', utcUpdate: '00', numOfDays: '4 & 8', numOfFiles: '2', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ARPEGE 25 & ICON 25', utcUpdate: '12', numOfDays: '4 & 8', numOfFiles: '2', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GEM 15km', utcUpdate: '00', numOfDays: '10', numOfFiles: '1539', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GEM 15km', utcUpdate: '12', numOfDays: '10', numOfFiles: '1539', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GFS 25km / 12.5km', utcUpdate: '00', numOfDays: '10', numOfFiles: '213', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GFS 25km / 12.5km', utcUpdate: '06', numOfDays: '10', numOfFiles: '213', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GFS 25km / 12.5km', utcUpdate: '12', numOfDays: '10', numOfFiles: '213', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'GFS 25km / 12.5km', utcUpdate: '18', numOfDays: '10', numOfFiles: '213', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ICON 13', utcUpdate: '00', numOfDays: '8', numOfFiles: '8', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ICON 13', utcUpdate: '06', numOfDays: '8', numOfFiles: '8', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ICON 13', utcUpdate: '12', numOfDays: '8', numOfFiles: '8', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ICON 13', utcUpdate: '18', numOfDays: '8', numOfFiles: '8', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ECMWF 9,10,100km', utcUpdate: '00', numOfDays: '2', numOfFiles: '23', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ECMWF 9,10,100km', utcUpdate: '06', numOfDays: '2', numOfFiles: '23', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ECMWF 9,10,100km', utcUpdate: '12', numOfDays: '2', numOfFiles: '23', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'ECMWF 9,10,100km', utcUpdate: '18', numOfDays: '2', numOfFiles: '23', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Basic', utcUpdate: '05', numOfDays: '7', numOfFiles: '1', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Basic', utcUpdate: '16', numOfDays: '7', numOfFiles: '1', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Basic 80mm', utcUpdate: '05', numOfDays: '7', numOfFiles: '1', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Basic 80mm', utcUpdate: '16', numOfDays: '7', numOfFiles: '1', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Multi Model', utcUpdate: '00', numOfDays: '7', numOfFiles: '3', d: false, e: false, fg: false, pt: false, remarks: '' },
        { modelName: 'Meteoblue Multi Model', utcUpdate: '12', numOfDays: '7', numOfFiles: '3', d: false, e: false, fg: false, pt: false, remarks: '' },
    ]);

    const [workDescription, setWorkDescription] = useState('');
    const [fetchmodels, setFetchModels] = useState([]);
    const [pendingworkDescription, setPendingWorkDescription] = useState();
    const [model, setModel] = useState([]);
    const [shift, setShift] = useState('');
    const shiftdata = shift;

    // Fetch data when the component mounts

    useEffect(() => {
        axios.get('http://localhost:5001/api/fetch-models')
            .then(response => {
                setFetchModels(response.data);
            })
            .catch(error => {
                console.error('Error fetching models:', error);
            });
    }, []);

    useEffect(() => {
        if (fetchmodels.length > 0) {
            const initializedModels = models.map((model, index) => ({
                ...model,
                d: fetchmodels[index]?.d === 1 || model.d,
                e: fetchmodels[index]?.e === 1 || model.e,
                fg: fetchmodels[index]?.fg === 1 || model.fg,
                pt: fetchmodels[index]?.pt === 1 || model.pt,
            }));
            setModels(initializedModels);
        }
    }, [fetchmodels]);


    // const handleChange = (index, event) => {
    //     const { name, type, checked, value } = event.target;
    //     const newModels = [...models];
    //     // Handle checkbox and text input changes
    //     if (type === 'checkbox') {
    //         newModels[index][name] = checked;
    //     } else {
    //         newModels[index][name] = value;
    //     }

    //     setModels(newModels);
    // };


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const dataToSend = models.map(model => ({
    //         ...model,
    //         remarks: `${model.remarks}, ${shiftdata}`,
    //         work_description: `${workDescription} ${shiftdata}`,
    //         pending_work_description: `${pendingworkDescription} ${shiftdata}`,

    //     }));

    //     try {
    //         const response = await fetch('http://localhost:3001/api/submit', {  // Adjust this endpoint
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(dataToSend),
    //         });

    //         if (response.ok) {
    //             alert('Data submitted successfully!');
    //             window.location.reload();
    //             // Reset the form after submission
    //             setModels(models.map(model => ({ ...model, d: false, e: false, fg: false, pt: false, remarks: '' })));
    //             setWorkDescription('');
    //             setPendingWorkDescription('');

    //         } else {
    //             alert('Failed to submit data.');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };


    // const handleChange = (index, event) => {
    //     const { name, value, type, checked } = event.target;

    //     const updatedModels = [...models];

    //     if (type === 'checkbox') {
    //         // Handle checkbox changes
    //         updatedModels[index][name] = checked;
    //     } else {
    //         // Handle text or textarea changes
    //         updatedModels[index][name] = value;
    //     }

    //     setModels(updatedModels);
    // };

    // const handleChange = (index, event) => {
    //     const { name, checked } = event.target;
    //     const updatedModels = [...models];
    //     updatedModels[index][name] = checked;
    //     setModels(updatedModels);
    // };
    const handleChange = (index, event) => {
        const { name, value, type, checked } = event.target;

        const updatedModels = [...models];

        if (type === 'checkbox') {
            // Handle checkbox changes
            updatedModels[index][name] = checked;
        } else {
            // Handle text or textarea changes
            updatedModels[index][name] = value;
        }

        setModels(updatedModels);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        // Confirm with the user before submitting
        const isConfirmed = window.confirm("Are you sure you want to insert the record?");
        if (!isConfirmed) return; // If user clicks "Cancel", exit the function

        const dataToSend = models.map(model => ({
            ...model,
            remarks: `${model.remarks}, ${shiftdata}`,
            work_description: `${workDescription} ${shiftdata}`,
            pending_work_description: `${pendingworkDescription} ${shiftdata}`,
        }));

        try {
            const response = await fetch('http://localhost:5001/api/submit', {  // Adjust this endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                alert('Data submitted successfully!');
                window.location.reload();

                // Reset the form after submission
                setModels(models.map(model => ({ ...model, d: false, e: false, fg: false, pt: false, remarks: '' })));
                setWorkDescription('');
                setPendingWorkDescription('');
            } else {
                alert('Failed to submit data.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };




    const handleSelectAllChange = (index, event) => {
        const isChecked = event.target.checked;
        const updatedModels = [...models];
        updatedModels[index] = {
            ...updatedModels[index],
            d: isChecked,
            e: isChecked,
            fg: isChecked,
            pt: isChecked,
        };
        setModels(updatedModels);
    };


    function getRowBorderColor(modelName) {
        switch (modelName) {
            case "ARPEGE 25 & ICON 25":
                return "bordersecondary"; // Gray
            case "GEM 15km":
                return "borderprimary"; // Blue
            case "GFS 25km / 12.5km":
                return "bordersuccess"; // Green
            case "ICON 13":
                return "borderorange"; // Orange (light tone)
            case "ECMWF 9,10,100km":
                return "bordercyan"; // Cyan (light tone)
            case "Meteoblue Basic":
                return "borderteal"; // Teal
            case "Meteoblue Basic 80mm":
                return "borderlightblue"; // Light Blue
            case "Meteoblue Multi Model":
                return "borderbeige"; // Beige (light tone)
            default:
                return ""; // Default no color
        }
    }



    return (
        <>
            <Header />
            <div className="container mt-4 border rounded">

                {/* <div className='row d-flex justify-content-center d-none'>
                    <div className='col-md-12 mt-4'>
                        <div className='table-responsive'>
                            <table className="table table-bordered table-striped">
                                <thead className="table-light">
                                    <tr>
                                        <th className='bg-success fs-4 whitetext' colSpan={9}>Previous Shift NWP - Model Summary</th>
                                    </tr>
                                    <tr>
                                        <th>Model Name</th>
                                        <th>UTC Update</th>
                                        <th>Number of Days</th>
                                        <th>Number of Files</th>
                                        <th>D</th>
                                        <th>E</th>
                                        <th>FG</th>
                                        <th>FT</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fetchmodels.map((fetching, index) => (

                                        <tr key={index}>
                                            <td>{fetching.modelName}</td>
                                            <td>{fetching.utcUpdate}</td>
                                            <td>{fetching.numOfDays}</td>
                                            <td>{fetching.numOfFiles}</td>

                                            <td>{fetching.d === 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                            <td>{fetching.e === 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                            <td>{fetching.fg === 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                            <td>{fetching.pt === 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                            <td>{fetching.remarks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}

                <div className='row d-flex justify-content-center'>
                    <div className='col-md-12 mt-5'>
                        <form onSubmit={handleSubmit}>
                            <div className='table-responsive'>
                                <table className="table table-bordered fs-8">
                                    <thead className='table-light'>
                                        <tr>
                                            <th className='bg-primary fs-4 whitetext' colSpan={10}>Current Shift NWP - Model Summary</th>
                                        </tr>
                                        <tr>
                                            <th>Model Name</th>
                                            <th>UTC Update</th>
                                            <th>No of Days</th>
                                            <th>No of Files</th>
                                            <th>D</th>
                                            <th>E</th>
                                            <th>FG</th>
                                            <th>FT</th>
                                            <th className='text-center bg-success whitetext border border-success'>Check<br /> All</th>
                                            <th>Remarks</th>
                                        </tr>
                                    </thead>

                                    {/* <tbody>
                                        {models.map((model, index) => (
                                            <tr key={index} className="formRow">
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={`form-control modelname ${getModelBgColor(model.modelName)}`}
                                                        value={model.modelName}
                                                        readOnly
                                                    />
                                                </td>


                                                <td>
                                                    <input type="text" className="form-control" value={model.utcUpdate} readOnly />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control" value={model.numOfDays} readOnly />
                                                </td>
                                                <td>
                                                    <input type="number" className="form-control" value={model.numOfFiles} readOnly />
                                                </td>
                                                {['d', 'e', 'fg', 'pt'].map((key) => (
                                                    <td key={key}>
                                                        <input
                                                            type="checkbox"
                                                            name={key}
                                                            className="form-check-input"
                                                            checked={model[key]}
                                                            disabled={!model[key]}
                                                            onChange={(event) => handleChange(index, event)}
                                                        />
                                                    </td>
                                                ))}
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        name="selectAll"
                                                        className="form-check-input bg-success"
                                                        checked={model.d && model.e && model.fg && model.pt}
                                                        onChange={(event) => handleSelectAllChange(index, event)}
                                                    />
                                                </td>
                                                <td>
                                                    <textarea
                                                        name="remarks"
                                                        className="form-control"
                                                        value={model.remarks}
                                                        onChange={(event) => handleChange(index, event)}
                                                        placeholder="Remarks"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody> */}

                                    <tbody>
                                        {models.map((model, index) => {
                                            // Determine if this is the first occurrence of the current modelName
                                            const isFirstOccurrence =
                                                index === 0 || models[index - 1].modelName !== model.modelName;

                                            // Calculate the rowSpan for the current modelName
                                            const rowSpan = models.filter((m) => m.modelName === model.modelName).length;

                                            return (
                                                <tr
                                                    key={index}
                                                    className={`formRow ${getRowBorderColor(model.modelName)}`}
                                                    style={{ borderWidth: "2px", borderStyle: "solid" }}
                                                >
                                                    {/* Render modelName only for the first occurrence */}
                                                    {isFirstOccurrence && (
                                                        <td rowSpan={rowSpan}>
                                                            <input
                                                                type="text"
                                                                className="form-control fs-6 mt-5"
                                                                value={model.modelName}
                                                                readOnly
                                                            />
                                                        </td>
                                                    )}
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={model.utcUpdate}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={model.numOfDays}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={model.numOfFiles}
                                                            readOnly
                                                        />
                                                    </td>
                                                    {["d", "e", "fg", "pt"].map((key) => (
                                                        <td key={key}>
                                                            <input
                                                                type="checkbox"
                                                                name={key}
                                                                className="form-check-input border border-white border-2"
                                                                checked={model[key]}
                                                                onChange={(event) => handleChange(index, event)}
                                                            />
                                                        </td>
                                                    ))}
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            name="selectAll"
                                                            className="form-check-input bg-success border"
                                                            checked={model.d && model.e && model.fg && model.pt}
                                                            onChange={(event) => handleSelectAllChange(index, event)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <textarea
                                                            name="remarks"
                                                            className="form-control"
                                                            value={model.remarks}
                                                            onChange={(event) => handleChange(index, event)}
                                                            placeholder="Remarks"
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>


                                </table>
                            </div>
                            <div className='row p-3'>
                                {/* <div className='col-md-4'>
                                    <select
                                        value={shift}
                                        onChange={(e) => setShift(e.target.value)}
                                        className="form-control mb-2 border border-2  border-success p-4 bg-light cursor-pointer"
                                        aria-label="Select Shift"
                                        required
                                    >
                                        <option value="">Select Shift <span className='text-danger'>*</span></option>
                                        <option value="Shift A">Shift A</option>
                                        <option value="Shift B">Shift B</option>
                                        <option value="Shift C">Shift C</option>
                                    </select>f
                                </div> */}

                                <div className='col-md-12 text-end'>
                                    <button type="submit" className="btn btn-success mt-3 mb-3 fs-5 px-5">Submit</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default NWPModelTable;

// Email code without Select All Option
// import React, { useState, useEffect } from 'react';
// import Header from '../Header';
// import axios from 'axios';

// function Email() {
//     const initialFormData = [
//         { revision: '01', email: 'revision1@leapgreenenergy.com', verified: false, remarks: '' },
//         { revision: '02', email: 'revision2@leapgreenenergy.com', verified: false, remarks: '' },
//         { revision: '03', email: 'revision3@leapgreenenergy.com', verified: false, remarks: '' },
//         { revision: '04', email: 'revision4@leapgreenenergy.com', verified: false, remarks: '' },
//         { revision: '05', email: 'revision5@leapgreenenergy.com', verified: false, remarks: '' },
//         { revision: '06', email: 'revision6@leapgreenenergy.com', verified: false, remarks: '' },
//         { revision: '07', email: 'revision7@leapgreenenergy.com', verified: false, remarks: '' },
//         { revision: '08', email: 'revision8@leapgreenenergy.com', verified: false, remarks: '' },
//         { revision: '09', email: 'revision9@leapgreenenergy.com', verified: false, remarks: '' },
//         { revision: '10', email: 'revision10@leapgreenenergy.com', verified: false, remarks: '' },
//         { revision: 'Schedule', email: 'schedules@leapgreenenergy.com', verified: false, remarks: '' },
//     ];

//     const [formData, setFormData] = useState(initialFormData);
//     const [emails, setEmails] = useState([]);


//     // Handle input change for form data
//     const handleChange = (index, field, value) => {
//         const newFormData = [...formData];
//         newFormData[index][field] = value;
//         setFormData(newFormData);
//     };


//     // Fetch data from the API and update formData with verified status from backend
//     useEffect(() => {
//         const fetchEmails = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5001/fetch-emails');
//                 const fetchedEmails = response.data;

//                 // Update formData based on verification status from backend
//                 const updatedFormData = formData.map((data) => {
//                     const matchedEmail = fetchedEmails.find(email => email.email === data.email);
//                     if (matchedEmail) {
//                         return {
//                             ...data,
//                             verified: matchedEmail.verified === 1, // Mark as verified if it's verified from the backend
//                             remarks: matchedEmail.remarks || '' // Populate remarks if any
//                         };
//                     }
//                     return data; // If not verified, retain current values
//                 });

//                 setEmails(fetchedEmails); // Store fetched emails in state
//                 setFormData(updatedFormData); // Update the formData with verified status
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchEmails();
//     }, []);



//     // Handle form submission
//     const handleSubmit = async (e) => {
//         const isConfirmed = window.confirm("Are you sure you want to insert the record?");
//         if (!isConfirmed) return;
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5001/save-emails', formData);
//             if (response.status === 200) {
//                 alert("Emails saved successfully!");
//                 window.location.reload();
//                 setFormData(initialFormData); // Reset form data
//             } else {
//                 alert("Error saving emails.");
//             }
//         } catch (error) {
//             console.error('Error saving emails:', error);
//             alert("Error saving emails.");
//         }
//     };

//     return (
//         <>
//             <Header />
//             <section>
//                 <div className='container'>
//                     <div className='row d-flex justify-content-center '>
//                         <div className='col-md-10 mt-5'>
//                             <div className='table-responsive fs-5'>
//                                 <form onSubmit={handleSubmit}>
//                                     <table className="table table-bordered text-center mt-5">
//                                         <thead>
//                                             <tr className='bg-success'>
//                                                 <th className='fs-3 whitetext text-start' colSpan={4}>Current Shift Email Verifications</th>
//                                             </tr>
//                                             <tr className='bg-light'>
//                                                 <th>Revision</th>
//                                                 <th>Email</th>
//                                                 <th>Send</th>
//                                                 <th>Remarks</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {formData.map((data, index) => (
//                                                 <tr key={index}>
//                                                     <td>{data.revision}</td>
//                                                     <td>
//                                                         <input
//                                                             type='email'
//                                                             className='form-control'
//                                                             value={data.email}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         <input
//                                                             className="form-check-input cursor-pointer"
//                                                             type="checkbox"
//                                                             checked={data.verified}
//                                                             onChange={(e) => handleChange(index, 'verified', e.target.checked)}
//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         <textarea
//                                                             className='form-control'
//                                                             placeholder='Remarks...'
//                                                             value={data.remarks}
//                                                             onChange={(e) => handleChange(index, 'remarks', e.target.value)}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>

//                                     <div className='text-end mb-4 me-4'>
//                                         <button className="btn btn-success px-5 fs-5">Save Emails</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }
// export default Email;






// Update Email With Select All Option
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';

function Email() {
    const initialFormData = [
        { revision: '01', email: 'revision1@leapgreenenergy.com', verified: false, remarks: '' },
        { revision: '02', email: 'revision2@leapgreenenergy.com', verified: false, remarks: '' },
        { revision: '03', email: 'revision3@leapgreenenergy.com', verified: false, remarks: '' },
        { revision: '04', email: 'revision4@leapgreenenergy.com', verified: false, remarks: '' },
        { revision: '05', email: 'revision5@leapgreenenergy.com', verified: false, remarks: '' },
        { revision: '06', email: 'revision6@leapgreenenergy.com', verified: false, remarks: '' },
        { revision: '07', email: 'revision7@leapgreenenergy.com', verified: false, remarks: '' },
        { revision: '08', email: 'revision8@leapgreenenergy.com', verified: false, remarks: '' },
        { revision: '09', email: 'revision9@leapgreenenergy.com', verified: false, remarks: '' },
        { revision: '10', email: 'revision10@leapgreenenergy.com', verified: false, remarks: '' },
        { revision: 'Schedule', email: 'schedules@leapgreenenergy.com', verified: false, remarks: '' },
    ];

    const [formData, setFormData] = useState(initialFormData);
    const [emails, setEmails] = useState([]);

    // Handle input change for form data
    const handleChange = (index, field, value) => {
        const newFormData = [...formData];
        newFormData[index][field] = value;
        setFormData(newFormData);
    };

    // Fetch data from the API and update formData with verified status from backend
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get('http://172.16.4.224:5001/fetch-emails');
                const fetchedEmails = response.data;

                // Update formData based on verification status from backend
                const updatedFormData = formData.map((data) => {
                    const matchedEmail = fetchedEmails.find(email => email.email === data.email);
                    if (matchedEmail) {
                        return {
                            ...data,
                            verified: matchedEmail.verified === 1, // Mark as verified if it's verified from the backend
                            remarks: matchedEmail.remarks || '' // Populate remarks if any
                        };
                    }
                    return data; // If not verified, retain current values
                });

                setEmails(fetchedEmails); // Store fetched emails in state
                setFormData(updatedFormData); // Update the formData with verified status
            } catch (err) {
                console.error(err);
            }
        };

        fetchEmails();
    }, []);

    const [selectAll, setSelectAll] = useState(false); // State for "Select All"

    // Handle "Select All" checkbox change
    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        const updatedFormData = formData.map((data) => ({
            ...data,
            verified: checked, // Update all checkboxes to match the "Select All" state
        }));
        setFormData(updatedFormData);
    };

    // Update the table header "Select All" checkbox to reflect current state
    useEffect(() => {
        const allSelected = formData.every((data) => data.verified);
        setSelectAll(allSelected);
    }, [formData]);




    // Handle form submission
    const handleSubmit = async (e) => {
        const isConfirmed = window.confirm("Are you sure you want to insert the record?");
        if (!isConfirmed) return;
        e.preventDefault();
        try {
            const response = await axios.post('http://172.16.4.224:5001/save-emails', formData);
            if (response.status === 200) {
                alert("Emails saved successfully!");
                // window.location.reload();
                setFormData(initialFormData); // Reset form data
            } else {
                alert("Error saving emails.");
            }
        } catch (error) {
            console.error('Error saving emails:', error);
            alert("Error saving emails.");
        }
    };

    return (
        <>
            <Header />
            <section>
                <div className='container'>
                    <div className='row d-flex justify-content-center '>
                        <div className='col-md-10 mt-5'>
                            <div className='table-responsive fs-5'>
                                <form onSubmit={handleSubmit}>
                                    <table className="table table-bordered text-center mt-5">
                                        <thead>
                                            <tr className='bg-success'>
                                                <th className='fs-3 whitetext text-start' colSpan={4}>Current Shift Email Verificationssss</th>
                                            </tr>
                                            <tr className='bg-light'>
                                                <th>Revision</th>
                                                <th>Email</th>
                                                <th>Send <br />
                                                    <input
                                                        className="form-check-input cursor-pointer m-1"
                                                        type="checkbox"
                                                        checked={selectAll} // Bind to "Select All" state
                                                        onChange={(e) => handleSelectAll(e.target.checked)} // Handle change
                                                    />
                                                    <label className="form-check-label m-1">
                                                        Select All
                                                    </label>
                                                </th>
                                                <th>Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{data.revision}</td>
                                                    <td>
                                                        <input
                                                            type='email'
                                                            className='form-control'
                                                            value={data.email}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            className="form-check-input cursor-pointer"
                                                            type="checkbox"
                                                            checked={data.verified}
                                                            onChange={(e) => handleChange(index, 'verified', e.target.checked)} // Update individual checkbox
                                                        />
                                                    </td>
                                                    <td>
                                                        <textarea
                                                            className='form-control'
                                                            placeholder='Remarks...'
                                                            value={data.remarks}
                                                            onChange={(e) => handleChange(index, 'remarks', e.target.value)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className='text-end mb-4 me-4'>
                                        <button className="btn btn-success border border-success border-2 px-5 fs-5">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
export default Email;
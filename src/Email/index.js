import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Example using react-icons

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
                const response = await axios.get('http://localhost:5000/fetch-emails');
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

    // Handle form submission
    const handleSubmit = async (e) => {
        const isConfirmed = window.confirm("Are you sure you want to insert the record?");
        if (!isConfirmed) return;
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/save-emails', formData);
            if (response.status === 200) {
                alert("Emails saved successfully!");
                window.location.reload();
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
                            {/* <div className='table-responsive fs-5'>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr className='bg-success'>
                                            <th className='fs-3 whitetext' colSpan={5}>Previous Shift Email Verifications</th>
                                        </tr>
                                        <tr className='bg-light'>
                                            <th>Revision</th>
                                            <th>Email</th>
                                            <th>Verification Status</th>
                                            <th>Remarks</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {emails.map((email) => (
                                            <tr key={email.id}>
                                                <td>{email.revision}</td>
                                                <td>{email.email}</td>
                                                <td>{email.verified === 1 ? <FaCheck className='textsuccess fs-4' /> : <FaTimes className='textdanger fs-4' />}</td>
                                                <td>{email.remarks}</td>
                                                <td className='text-uppercase'>
                                                    {new Date(email.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> */}

                            <div className='table-responsive fs-5'>
                                <form onSubmit={handleSubmit}>
                                    <table className="table table-bordered text-center mt-5">
                                        <thead>
                                            <tr className='bg-success'>
                                                <th className='fs-3 whitetext text-start' colSpan={4}>Current Shift Email Verifications</th>
                                            </tr>
                                            <tr className='bg-light'>
                                                <th>Revision</th>
                                                <th>Email</th>
                                                <th>Send</th>
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
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            checked={data.verified}
                                                            onChange={(e) => handleChange(index, 'verified', e.target.checked)}
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
                                        <button className="btn btn-success px-5 fs-5">Save Emails</button>
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



// // import React, { useState } from 'react';
// // import emailjs from 'emailjs-com';

// // const GreetingForm = () => {
// //     const [name, setName] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [countryCode, setCountryCode] = useState('+91'); // default country code
// //     const [phone, setPhone] = useState('');
// //     const [treatment, setTreatment] = useState(''); // yes or no
// //     const [preferredCountry, setPreferredCountry] = useState('');
// //     const [message, setMessage] = useState('');

// //     const handleNameChange = (e) => setName(e.target.value);
// //     const handleEmailChange = (e) => setEmail(e.target.value);
// //     const handleCountryCodeChange = (e) => setCountryCode(e.target.value);
// //     const handlePhoneChange = (e) => setPhone(e.target.value);
// //     const handleTreatmentChange = (e) => setTreatment(e.target.value);
// //     const handlePreferredCountryChange = (e) => setPreferredCountry(e.target.value);


// //     const sendGreeting = (e) => {
// //         e.preventDefault();

// //         const templateParams = {
// //             to_name: name,
// //             from_name: email,
// //             from_email: email,
// //             country_code: countryCode,
// //             phone: phone,
// //             treatment_status: treatment ? 'Yes' : 'No',
// //             preferred_country: preferredCountry
// //         };

// //         emailjs.send('service_j5t9x0t', 'template_yram1ky', templateParams, '139bcTk_zdGngQxy-')
// //             .then((response) => {
// //                 console.log('Email successfully sent!', response.status, response.text);
// //                 const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
// //                 modal.show();
// //             })
// //             .catch((error) => {
// //                 console.error('Failed to send email. Error:', error);
// //                 setMessage('Failed to send greeting.');
// //             });
// //     };

// //     const countryData = [
// //         { name: 'Afghanistan', code: 'AF', dial_code: '+93' },
// //         { name: 'Albania', code: 'AL', dial_code: '+355' },
// //         { name: 'Algeria', code: 'DZ', dial_code: '+213' },
// //         { name: 'Andorra', code: 'AD', dial_code: '+376' },
// //         { name: 'Angola', code: 'AO', dial_code: '+244' },
// //         { name: 'Antigua and Barbuda', code: 'AG', dial_code: '+1-268' },
// //         { name: 'Argentina', code: 'AR', dial_code: '+54' },
// //         { name: 'Armenia', code: 'AM', dial_code: '+374' },
// //         { name: 'Australia', code: 'AU', dial_code: '+61' },
// //         { name: 'Austria', code: 'AT', dial_code: '+43' },
// //         { name: 'Azerbaijan', code: 'AZ', dial_code: '+994' },
// //         { name: 'Bahamas', code: 'BS', dial_code: '+1-242' },
// //         { name: 'Bahrain', code: 'BH', dial_code: '+973' },
// //         { name: 'Bangladesh', code: 'BD', dial_code: '+880' },
// //         { name: 'Barbados', code: 'BB', dial_code: '+1-246' },
// //         { name: 'Belarus', code: 'BY', dial_code: '+375' },
// //         { name: 'Belgium', code: 'BE', dial_code: '+32' },
// //         { name: 'Belize', code: 'BZ', dial_code: '+501' },
// //         { name: 'Benin', code: 'BJ', dial_code: '+229' },
// //         { name: 'Bhutan', code: 'BT', dial_code: '+975' },
// //         { name: 'Bolivia', code: 'BO', dial_code: '+591' },
// //         { name: 'Bosnia and Herzegovina', code: 'BA', dial_code: '+387' },
// //         { name: 'Botswana', code: 'BW', dial_code: '+267' },
// //         { name: 'Brazil', code: 'BR', dial_code: '+55' },
// //         { name: 'Brunei', code: 'BN', dial_code: '+673' },
// //         { name: 'Bulgaria', code: 'BG', dial_code: '+359' },
// //         { name: 'Burkina Faso', code: 'BF', dial_code: '+226' },
// //         { name: 'Burundi', code: 'BI', dial_code: '+257' },
// //         { name: 'Cabo Verde', code: 'CV', dial_code: '+238' },
// //         { name: 'Cambodia', code: 'KH', dial_code: '+855' },
// //         { name: 'Cameroon', code: 'CM', dial_code: '+237' },
// //         { name: 'Canada', code: 'CA', dial_code: '+1' },
// //         { name: 'Central African Republic', code: 'CF', dial_code: '+236' },
// //         { name: 'Chad', code: 'TD', dial_code: '+235' },
// //         { name: 'Chile', code: 'CL', dial_code: '+56' },
// //         { name: 'China', code: 'CN', dial_code: '+86' },
// //         { name: 'Colombia', code: 'CO', dial_code: '+57' },
// //         { name: 'Comoros', code: 'KM', dial_code: '+269' },
// //         { name: 'Congo (Congo-Brazzaville)', code: 'CG', dial_code: '+242' },
// //         { name: 'Congo (DR Congo)', code: 'CD', dial_code: '+243' },
// //         { name: 'Costa Rica', code: 'CR', dial_code: '+506' },
// //         { name: 'Croatia', code: 'HR', dial_code: '+385' },
// //         { name: 'Cuba', code: 'CU', dial_code: '+53' },
// //         { name: 'Cyprus', code: 'CY', dial_code: '+357' },
// //         { name: 'Czech Republic', code: 'CZ', dial_code: '+420' },
// //         { name: 'Denmark', code: 'DK', dial_code: '+45' },
// //         { name: 'Djibouti', code: 'DJ', dial_code: '+253' },
// //         { name: 'Dominica', code: 'DM', dial_code: '+1-767' },
// //         { name: 'Dominican Republic', code: 'DO', dial_code: '+1-809' },
// //         { name: 'Ecuador', code: 'EC', dial_code: '+593' },
// //         { name: 'Egypt', code: 'EG', dial_code: '+20' },
// //         { name: 'El Salvador', code: 'SV', dial_code: '+503' },
// //         { name: 'Equatorial Guinea', code: 'GQ', dial_code: '+240' },
// //         { name: 'Eritrea', code: 'ER', dial_code: '+291' },
// //         { name: 'Estonia', code: 'EE', dial_code: '+372' },
// //         { name: 'Eswatini', code: 'SZ', dial_code: '+268' },
// //         { name: 'Ethiopia', code: 'ET', dial_code: '+251' },
// //         { name: 'Fiji', code: 'FJ', dial_code: '+679' },
// //         { name: 'Finland', code: 'FI', dial_code: '+358' },
// //         { name: 'France', code: 'FR', dial_code: '+33' },
// //         { name: 'Gabon', code: 'GA', dial_code: '+241' },
// //         { name: 'Gambia', code: 'GM', dial_code: '+220' },
// //         { name: 'Georgia', code: 'GE', dial_code: '+995' },
// //         { name: 'Germany', code: 'DE', dial_code: '+49' },
// //         { name: 'Ghana', code: 'GH', dial_code: '+233' },
// //         { name: 'Greece', code: 'GR', dial_code: '+30' },
// //         { name: 'Grenada', code: 'GD', dial_code: '+1-473' },
// //         { name: 'Guatemala', code: 'GT', dial_code: '+502' },
// //         { name: 'Guinea', code: 'GN', dial_code: '+224' },
// //         { name: 'Guinea-Bissau', code: 'GW', dial_code: '+245' },
// //         { name: 'Guyana', code: 'GY', dial_code: '+592' },
// //         { name: 'Haiti', code: 'HT', dial_code: '+509' },
// //         { name: 'Honduras', code: 'HN', dial_code: '+504' },
// //         { name: 'Hungary', code: 'HU', dial_code: '+36' },
// //         { name: 'Iceland', code: 'IS', dial_code: '+354' },
// //         { name: 'India', code: 'IN', dial_code: '+91' },
// //         { name: 'Indonesia', code: 'ID', dial_code: '+62' },
// //         { name: 'Iran', code: 'IR', dial_code: '+98' },
// //         { name: 'Iraq', code: 'IQ', dial_code: '+964' },
// //         { name: 'Ireland', code: 'IE', dial_code: '+353' },
// //         { name: 'Israel', code: 'IL', dial_code: '+972' },
// //         { name: 'Italy', code: 'IT', dial_code: '+39' },
// //         { name: 'Jamaica', code: 'JM', dial_code: '+1-876' },
// //         { name: 'Japan', code: 'JP', dial_code: '+81' },
// //         { name: 'Jordan', code: 'JO', dial_code: '+962' },
// //         { name: 'Kazakhstan', code: 'KZ', dial_code: '+7' },
// //         { name: 'Kenya', code: 'KE', dial_code: '+254' },
// //         { name: 'Kiribati', code: 'KI', dial_code: '+686' },
// //         { name: 'Kuwait', code: 'KW', dial_code: '+965' },
// //         { name: 'Kyrgyzstan', code: 'KG', dial_code: '+996' },
// //         { name: 'Laos', code: 'LA', dial_code: '+856' },
// //         { name: 'Latvia', code: 'LV', dial_code: '+371' },
// //         { name: 'Lebanon', code: 'LB', dial_code: '+961' },
// //         { name: 'Lesotho', code: 'LS', dial_code: '+266' },
// //         { name: 'Liberia', code: 'LR', dial_code: '+231' },
// //         { name: 'Libya', code: 'LY', dial_code: '+218' },
// //         { name: 'Liechtenstein', code: 'LI', dial_code: '+423' },
// //         { name: 'Lithuania', code: 'LT', dial_code: '+370' },
// //         { name: 'Luxembourg', code: 'LU', dial_code: '+352' },
// //         { name: 'Madagascar', code: 'MG', dial_code: '+261' },
// //         { name: 'Malawi', code: 'MW', dial_code: '+265' },
// //         { name: 'Malaysia', code: 'MY', dial_code: '+60' },
// //         { name: 'Maldives', code: 'MV', dial_code: '+960' },
// //         { name: 'Mali', code: 'ML', dial_code: '+223' },
// //         { name: 'Malta', code: 'MT', dial_code: '+356' },
// //         { name: 'Marshall Islands', code: 'MH', dial_code: '+692' },
// //         { name: 'Mauritania', code: 'MR', dial_code: '+222' },
// //         { name: 'Mauritius', code: 'MU', dial_code: '+230' },
// //         { name: 'Mexico', code: 'MX', dial_code: '+52' },
// //         { name: 'Micronesia', code: 'FM', dial_code: '+691' },
// //         { name: 'Moldova', code: 'MD', dial_code: '+373' },
// //         { name: 'Monaco', code: 'MC', dial_code: '+377' },
// //         { name: 'Mongolia', code: 'MN', dial_code: '+976' },
// //         { name: 'Montenegro', code: 'ME', dial_code: '+382' },
// //         { name: 'Morocco', code: 'MA', dial_code: '+212' },
// //         { name: 'Mozambique', code: 'MZ', dial_code: '+258' },
// //         { name: 'Myanmar (Burma)', code: 'MM', dial_code: '+95' },
// //         { name: 'Namibia', code: 'NA', dial_code: '+264' },
// //         { name: 'Nauru', code: 'NR', dial_code: '+674' },
// //         { name: 'Nepal', code: 'NP', dial_code: '+977' },
// //         { name: 'Netherlands', code: 'NL', dial_code: '+31' },
// //         { name: 'New Zealand', code: 'NZ', dial_code: '+64' },
// //         { name: 'Nicaragua', code: 'NI', dial_code: '+505' },
// //         { name: 'Niger', code: 'NE', dial_code: '+227' },
// //         { name: 'Nigeria', code: 'NG', dial_code: '+234' },
// //         { name: 'North Korea', code: 'KP', dial_code: '+850' },
// //         { name: 'North Macedonia', code: 'MK', dial_code: '+389' },
// //         { name: 'Norway', code: 'NO', dial_code: '+47' },
// //         { name: 'Oman', code: 'OM', dial_code: '+968' },
// //         { name: 'Pakistan', code: 'PK', dial_code: '+92' },
// //         { name: 'Palau', code: 'PW', dial_code: '+680' },
// //         { name: 'Palestine', code: 'PS', dial_code: '+970' },
// //         { name: 'Panama', code: 'PA', dial_code: '+507' },
// //         { name: 'Papua New Guinea', code: 'PG', dial_code: '+675' },
// //         { name: 'Paraguay', code: 'PY', dial_code: '+595' },
// //         { name: 'Peru', code: 'PE', dial_code: '+51' },
// //         { name: 'Philippines', code: 'PH', dial_code: '+63' },
// //         { name: 'Poland', code: 'PL', dial_code: '+48' },
// //         { name: 'Portugal', code: 'PT', dial_code: '+351' },
// //         { name: 'Qatar', code: 'QA', dial_code: '+974' },
// //         { name: 'Romania', code: 'RO', dial_code: '+40' },
// //         { name: 'Russia', code: 'RU', dial_code: '+7' },
// //         { name: 'Rwanda', code: 'RW', dial_code: '+250' },
// //         { name: 'Saint Kitts and Nevis', code: 'KN', dial_code: '+1-869' },
// //         { name: 'Saint Lucia', code: 'LC', dial_code: '+1-758' },
// //         { name: 'Saint Vincent and the Grenadines', code: 'VC', dial_code: '+1-784' },
// //         { name: 'Samoa', code: 'WS', dial_code: '+685' },
// //         { name: 'San Marino', code: 'SM', dial_code: '+378' },
// //         { name: 'Sao Tome and Principe', code: 'ST', dial_code: '+239' },
// //         { name: 'Saudi Arabia', code: 'SA', dial_code: '+966' },
// //         { name: 'Senegal', code: 'SN', dial_code: '+221' },
// //         { name: 'Serbia', code: 'RS', dial_code: '+381' },
// //         { name: 'Seychelles', code: 'SC', dial_code: '+248' },
// //         { name: 'Sierra Leone', code: 'SL', dial_code: '+232' },
// //         { name: 'Singapore', code: 'SG', dial_code: '+65' },
// //         { name: 'Slovakia', code: 'SK', dial_code: '+421' },
// //         { name: 'Slovenia', code: 'SI', dial_code: '+386' },
// //         { name: 'Solomon Islands', code: 'SB', dial_code: '+677' },
// //         { name: 'Somalia', code: 'SO', dial_code: '+252' },
// //         { name: 'South Africa', code: 'ZA', dial_code: '+27' },
// //         { name: 'South Korea', code: 'KR', dial_code: '+82' },
// //         { name: 'South Sudan', code: 'SS', dial_code: '+211' },
// //         { name: 'Spain', code: 'ES', dial_code: '+34' },
// //         { name: 'Sri Lanka', code: 'LK', dial_code: '+94' },
// //         { name: 'Sudan', code: 'SD', dial_code: '+249' },
// //         { name: 'Suriname', code: 'SR', dial_code: '+597' },
// //         { name: 'Sweden', code: 'SE', dial_code: '+46' },
// //         { name: 'Switzerland', code: 'CH', dial_code: '+41' },
// //         { name: 'Syria', code: 'SY', dial_code: '+963' },
// //         { name: 'Taiwan', code: 'TW', dial_code: '+886' },
// //         { name: 'Tajikistan', code: 'TJ', dial_code: '+992' },
// //         { name: 'Tanzania', code: 'TZ', dial_code: '+255' },
// //         { name: 'Thailand', code: 'TH', dial_code: '+66' },
// //         { name: 'Timor-Leste', code: 'TL', dial_code: '+670' },
// //         { name: 'Togo', code: 'TG', dial_code: '+228' },
// //         { name: 'Tonga', code: 'TO', dial_code: '+676' },
// //         { name: 'Trinidad and Tobago', code: 'TT', dial_code: '+1-868' },
// //         { name: 'Tunisia', code: 'TN', dial_code: '+216' },
// //         { name: 'Turkey', code: 'TR', dial_code: '+90' },
// //         { name: 'Turkmenistan', code: 'TM', dial_code: '+993' },
// //         { name: 'Tuvalu', code: 'TV', dial_code: '+688' },
// //         { name: 'Uganda', code: 'UG', dial_code: '+256' },
// //         { name: 'Ukraine', code: 'UA', dial_code: '+380' },
// //         { name: 'United Arab Emirates', code: 'AE', dial_code: '+971' },
// //         { name: 'United Kingdom', code: 'GB', dial_code: '+44' },
// //         { name: 'United States', code: 'US', dial_code: '+1' },
// //         { name: 'Uruguay', code: 'UY', dial_code: '+598' },
// //         { name: 'Uzbekistan', code: 'UZ', dial_code: '+998' },
// //         { name: 'Vanuatu', code: 'VU', dial_code: '+678' },
// //         { name: 'Vatican City', code: 'VA', dial_code: '+379' },
// //         { name: 'Venezuela', code: 'VE', dial_code: '+58' },
// //         { name: 'Vietnam', code: 'VN', dial_code: '+84' },
// //         { name: 'Yemen', code: 'YE', dial_code: '+967' },
// //         { name: 'Zambia', code: 'ZM', dial_code: '+260' },
// //         { name: 'Zimbabwe', code: 'ZW', dial_code: '+263' }
// //     ];

// //     const ReloadPage = () => {
// //         window.location.reload();
// //     };


// //     return (
// //         <div className='container'>

// //             <button type="button" class="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#exampleModalform">
// //                 Subscribe
// //             </button>



// //             <div class="modal fade" id="exampleModalform" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
// //                 <div class="modal-dialog">
// //                     <div class="modal-content">
// //                         <div class="modal-body p-2">
// //                             <div className='container'>
// //                                 <div className='row d-flex justify-content-center'>
// //                                     <div className='col-md-12 mt-4 border border-2 p-3 bg-light rounded'>
// //                                         <h2 className='fs-1 textsuccess border border-5 border-light bg-white shadow-sm p-2 text-center rounded'>Get In Touch</h2>
// //                                         <form onSubmit={sendGreeting}>
// //                                             <input
// //                                                 type="text"
// //                                                 placeholder="Enter Name"
// //                                                 className="form-control mt-3"
// //                                                 value={name}
// //                                                 onChange={handleNameChange}
// //                                                 required
// //                                             />
// //                                             <input
// //                                                 type="email"
// //                                                 placeholder="Enter Email"
// //                                                 className="form-control mt-3"
// //                                                 value={email}
// //                                                 onChange={handleEmailChange}
// //                                                 required
// //                                             />
// //                                             <div className="input-group mt-3">
// //                                                 <select
// //                                                     className="form-select"
// //                                                     value={countryCode}
// //                                                     onChange={handleCountryCodeChange}
// //                                                 >
// //                                                     {countryData.map((country) => (
// //                                                         <option key={country.code} value={country.dial_code}>
// //                                                             {country.name} ({country.dial_code})
// //                                                         </option>
// //                                                     ))}
// //                                                 </select>
// //                                                 <input
// //                                                     type="tel"
// //                                                     placeholder="Enter Phone Number"
// //                                                     className="form-control"
// //                                                     value={phone}
// //                                                     onChange={handlePhoneChange}
// //                                                     required
// //                                                 />
// //                                             </div>
// //                                             <select
// //                                                 className="form-control mt-3"
// //                                                 value={treatment}
// //                                                 onChange={handleTreatmentChange}
// //                                                 required
// //                                             >
// //                                                 <option value="">Treatment Required?</option>
// //                                                 <option value="Yes">Yes</option>
// //                                                 <option value="No">No</option>
// //                                             </select>
// //                                             <select
// //                                                 className="form-control mt-3"
// //                                                 value={preferredCountry}
// //                                                 onChange={handlePreferredCountryChange}
// //                                                 required
// //                                             >
// //                                                 <option value="">Select Preferred Country</option>
// //                                                 {countryData.map((country) => (
// //                                                     <option key={country.code} value={country.name}>
// //                                                         {country.name}
// //                                                     </option>
// //                                                 ))}
// //                                             </select>
// //                                             <div className='text-end'>
// //                                                 <button className="btn btn-success mt-3" type="submit">Send</button>
// //                                             </div>
// //                                         </form>
// //                                         {message && <p>{message}</p>}
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>



// //             <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
// //                 <div className="modal-dialog">
// //                     <div className="modal-content">
// //                         <div className="modal-header">
// //                             <h5 className="modal-title" id="exampleModalLabel">Greetings!</h5>
// //                         </div>
// //                         <div className="modal-body">
// //                             Hello {name}! Thank you for contacting, we appreciate your kindness, generosity, and support. One of our team members will contact you as soon as possible.
// //                         </div>
// //                         <div className="modal-footer">
// //                             <button type="button" className="btn btn-success" onClick={ReloadPage} data-bs-dismiss="modal">Close</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //         </div>
// //     );
// // };

// // export default GreetingForm;


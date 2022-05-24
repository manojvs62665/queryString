// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";

// export default function QueryString(props) {
//     // const [user, setUser] = useState('');
//     // const [email, setEmail] = useState('');
//     const [values, setValues] = useState({});
//     const [allData, setAllData] = useState([]);
//     const [filteredData, setFilteredData] = useState(allData);
//     const history = useHistory();

//     console.log("props",history)

//     useEffect(() => {
//         axios('https://jsonplaceholder.typicode.com/users')
//             .then(response => {
//                 setAllData(response.data);
//                 if (Object.keys(values).length === 0) {
//                     setFilteredData(response.data)
//                 }
//                 setFilteredData(history.location.state.result)
//                 // setUser(history.location.state.value)
//             })
//             .catch(error => {
//                 console.log('Error getting fake data: ' + error);
//             })
//     }, []);

//     const handleSearch = (event) => {
//         // let value = event.currentTarget.value;
//         setValues(values => {
//             return {...values, [event.target.name]: event.target.value};
//         });
//         let result = [];
//         let queryFilters;
//         if (values.user === "All" || values.email === "All") {
//             setFilteredData(allData);
//             history.push({
//                 pathname: '/query-string-three',
//                 state: { allData }
//             });
//         } else {
//             if(event.target.name === "user"){
//                 result = allData.filter((data) => {
//                     return (
//                         data.username.search(event.currentTarget.value) !== -1
//                     )
//                 });
//                 console.log("result", result)
//                 setFilteredData(result);
//             } else if(event.target.name === "email"){
//                 result = allData.filter((data) => {
//                     return (
//                       data.email.search(event.currentTarget.value) !== -1
//                     )
//                 });
//                 console.log("result", result)
//                 setFilteredData(result);
//             }
//             if(event.target.name === "user"){
//                 queryFilters = `user=${event.currentTarget.value}`
//             } else if(event.target.name === "email"){
//                 queryFilters = queryFilters ? queryFilters + `&email=${event.currentTarget.value}` : `?email=${event.currentTarget.value}`
//             }
//             history.push({
//                 pathname: '/query-string-three',
//                 search: `${queryFilters}`,
//                 state: { result: result, user: values.user, email: values.email }
//             });
//         }
//     }
//     console.log("values", values)

//     return (
//         <>
//             <div className="App">
//                 <div style={{ margin: '0 auto', marginTop: '10%' }}>
//                     {/* <label>Search:</label>
//                     <input type="text" value={user} onChange={(event) => handleSearch(event)} /> */}
//                     <select name="user" onChange={(event) => handleSearch(event)}>
//                         <option value="All">All</option>
//                         {allData?.map((val, i) => (
//                             <option value={val.username}>{val.username}</option>
//                         ))}
//                     </select>
//                     <select name="email" onChange={(event) => handleSearch(event)}>
//                         <option value="All">All</option>
//                         {allData?.map((val, i) => (
//                             <option value={val.email}>{val.email}</option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//             <div>
//                 {filteredData?.map((value, index) => {
//                     return (
//                         <div key={value.id}>
//                             <div>
//                                 <h3>{value.username}</h3>
//                                 <p>{value.email}</p>
//                             </div>
//                         </div>
//                     )
//                 })}
//             </div>
//         </>
//     );
// }
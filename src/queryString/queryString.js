import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

export default function QueryString() {
  const [value, setValue] = useState('');
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const [searchParams, setSearchParams] = "" // useSearchParams();
  const queryParams = queryString.parse(window.location.search);
  const queryParamsTwo = new URLSearchParams(window.location.search);
  let user = searchParams.get("user");
  let userTwo = queryParamsTwo.get("userTwo");

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        console.log(response.data)
        setAllData(response.data);
        const localStorageValue = localStorage.getItem("value")
        const localStorageEstData = localStorage.getItem("result")
        setFilteredData(JSON.parse(localStorageEstData));
        setValue(localStorageValue)
        console.log("value", localStorageValue)
      })
      .catch(error => {
        console.log('Error getting fake data: ' + error);
      })
  }, []);

  const handleSearch = (event) => {
    let value =event.currentTarget.value;
    setValue(value)
    localStorage.setItem("value", value)
    setSearchParams({user: value})
    let result = [];
    console.log(value);
    if(value === "All"){
      setFilteredData(allData);
      localStorage.setItem("result", JSON.stringify(allData))
    } else{
      result = allData.filter((data) => {
        return data.username.search(value) != -1;
      });
      console.log("result", result)
      setFilteredData(result);
      localStorage.setItem("result", JSON.stringify(result))
    }
  }

  return (
    <>
      <div className="App">
        <div style={{ margin: '0 auto', marginTop: '10%' }}>
          <label>Search:</label>
          <input type="text" value={value} onChange={(event) => handleSearch(event)} />
          <select value={value} onChange={(event) => handleSearch(event)}>
          <option value="All">All</option>
          {console.log("value", allData, filteredData)}
          {allData?.map((val, i) => (
            <option value={val.username}>{val.username}</option>
          ))}
          </select>
        </div>
      </div>
      <div>
        {filteredData?.map((value, index) => {
          return (
            <div key={value.id}>
              <div>
                {value.username}
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}

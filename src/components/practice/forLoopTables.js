import React, { useState } from "react";

export function ForLoopTable() {
  const [tableValue, setTableValue] = useState(0);
  const [countValue, setCountValue] = useState(0);
  const [showTablevalue, setShowTableValue] = useState(false);
  const [resultData, setResultData] = useState({});

  let initialNum = 1;
  let endTable = tableValue;
  let countOfNum = countValue;
  const tableValueHandler = (e) => {
    setShowTableValue(false);
    console.log("value", e.target.value);
    let value = e.target.value;
    setTableValue(value);
  };
  const tableCountHandler = (e) => {
    setShowTableValue(false);
    console.log("value for count", e.target.value);
    let value = e.target.value;
    setCountValue(value);
  };
  const listnerDisplayTable = () => {
    setShowTableValue(true);
    let tempResultData = {};
    for (let i = initialNum; i <= endTable; i++) {
      tempResultData[i] = [];
      for (let j = initialNum; j <= countOfNum; j++) {
        let result = i * j;
        tempResultData[i].push(`${i}*${j}=${result}`);
      }
    }
    setResultData(tempResultData);
  };
  const ShowTable = () => {
    return Object.keys(resultData).map((key) => {
      return (
        <ul>
          {resultData[key].map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
      );
    });
    // return Object.keys(resultData).map(key=> {
    //     return <ul>{resultData[key].map((val, idx) => <li key={idx}>{val}</li>)}</ul>
    // })
  };
  console.log("table end value =>", tableValue, "tabel count =>", countValue);
  return (
    <>
      Hi, This Tables
      <div>
        <label htmlFor="tableValue">Table End to : </label>
        <input type="number" onBlur={tableValueHandler}></input>
        <label htmlFor="countValue">Table counts to :</label>
        <input type="number" onBlur={tableCountHandler}></input>
        <hr></hr>
        <button onClick={listnerDisplayTable}>Table value</button>
      </div>
      <div>
        {showTablevalue && <h1>Tables Start From 1 to {tableValue}</h1>}
        <ShowTable />
      </div>
    </>
  );
}

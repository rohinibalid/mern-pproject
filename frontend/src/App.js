import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionTable from "./components/TransactionTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import './App.css';

const App = () => {
  const [month, setMonth] = useState("March");
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`/api/transactions`, {
        params: { month, page, search: searchText }
      });
      setTransactions(res.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const res = await axios.get(`/api/statistics`, {
        params: { month }
      });
      setStatistics(res.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchBarChartData = async () => {
    try {
      const res = await axios.get(`/api/bar-chart`, {
        params: { month }
      });
      setBarChartData(res.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
  }, [month, page, searchText]);

  return (
    <div className="App">
      <h1>Transactions Dashboard</h1>
      <label>
        Select Month:
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </label>
      <TransactionTable
        transactions={transactions}
        page={page}
        setPage={setPage}
        setSearchText={setSearchText}
      />
      <Statistics statistics={statistics} />
      <BarChart data={barChartData} />
    </div>
  );
};

export default App;

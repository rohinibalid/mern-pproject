app.get('/api/combined', async (req, res) => {
  const { month } = req.query;

  try {
    const transactions = await app.get(`/api/transactions?month=${month}`);
    const statistics = await app.get(`/api/statistics?month=${month}`);
    const barChart = await app.get(`/api/bar-chart?month=${month}`);
    const pieChart = await app.get(`/api/pie-chart?month=${month}`);

    res.json({ transactions, statistics, barChart, pieChart });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching combined data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

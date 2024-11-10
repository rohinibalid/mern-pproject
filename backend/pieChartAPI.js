app.get('/api/pie-chart', async (req, res) => {
  const { month } = req.query;
  const monthRegex = new RegExp(`-${month}-`, 'i');

  try {
    const categories = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: monthRegex } } },
      { $group: { _id: '$category', itemCount: { $sum: 1 } } }
    ]);

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pie chart data' });
  }
});

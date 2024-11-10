app.get('/api/statistics', async (req, res) => {
  const { month } = req.query;
  const monthRegex = new RegExp(`-${month}-`, 'i');

  try {
    const totalSales = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: monthRegex } } },
      { $group: { _id: null, totalSaleAmount: { $sum: '$price' }, soldCount: { $sum: { $cond: ['$sold', 1, 0] } }, notSoldCount: { $sum: { $cond: ['$sold', 0, 1] } } } }
    ]);

    res.json(totalSales[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching statistics' });
  }
});

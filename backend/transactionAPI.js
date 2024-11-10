app.get('/api/transactions', async (req, res) => {
  const { page = 1, perPage = 10, search = '', month } = req.query;
  const query = {
    dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') },
    ...(search && {
      $or: [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: parseFloat(search) }
      ]
    })
  };

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

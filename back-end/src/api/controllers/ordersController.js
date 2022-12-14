const ordersService = require('../services/ordersService');

const getAllSalesBySeller = async (req, res) => {
  const { id } = req.user;

  const { statusCode, result } = await ordersService.getAllSalesBySeller({ id });

  return res.status(statusCode).json(result);
};

const getSaleSellerById = async (req, res) => {
  const { id: sellerId } = req.user;
  const { id: saleId } = req.params;

  const { statusCode, result } = await ordersService.getSaleSellerById(sellerId, saleId);

  return res.status(statusCode).json(result);
};

const updateSalesBySeller = async (req, res) => {
  const { id } = req.params;

  const { statusCode, result } = await ordersService.updateSalesBySeller({ id, ...req.body });

  return res.status(statusCode).json(result);
};

module.exports = {
  getAllSalesBySeller,
  updateSalesBySeller,
  getSaleSellerById,
};

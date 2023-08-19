import { productManager } from '../DAL/DAOs/productsDaos/ProductsManagerMongo.js';
import { cartManager } from '../DAL/DAOs/cartsDaos/CartsManagerMongo.js';

export const getHome = async (req, res, next) => {
  try {
    const products = await productManager.findAll(100, 0, undefined, undefined, undefined, true);
    res.render('home', { products: products.docs });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { limit = 10, page = 0 } = req.query;
    const { idCart } = req.params
    const products = await productManager.findAll(limit, page, undefined, undefined, undefined, true);
    const cart = await cartManager.findOneByIdPopulated(idCart)   
    res.render('products', {
      products: products.docs,
      nextPage: products.nextPage,
      prevPage: products.prevPage,
      hasNextPage: products.hasNextPage,
      hasPrevPage: products.hasPrevPage,
      idCart,
      cantCart: cart.products.length 
    });
  } catch (error) {
    next(error);
  }
};

export const getRealTimeProducts = async (req, res, next) => {
  try {
    const products = await productManager.findAll(100, 0, undefined, undefined, undefined, true);
    if (req.user == undefined) {
      res.render('realTimeProducts', { products: products.docs });
    } else {
      
      res.render('realTimeProducts', { products: products.docs, firstName: req.user.firstName, cart: req.user.cart, role: req.user.role, email: req.user.email});
    }
  } catch (error) {
    next(error);
  }
};

export const getChat = async (req, res) => {
  res.render('chat');
};

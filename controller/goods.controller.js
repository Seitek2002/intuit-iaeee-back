const Goods = require("../models/Goods");

const goods_post = async (req, res) => {
  try {
    let { name, imgUrl, kindsOfClothing, price, sizes, color, category } =
      req.body;

    const goods = await Goods.findOne({ name });

    if (goods) {
      return res.status(400).json({ message: "This product is exist" });
    }

    const newGood = new Goods({
      name,
      imgUrl,
      kindsOfClothing,
      price,
      sizes,
      color,
      category,
      rating: 0,
    });
    await newGood.save();

    return res.json({ message: "The product are saved" });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server Error" });
  }
};

const goods_get = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const { sort } = req.query;
    console.log(req.query, "query");
    let goods;

    switch (sort) {
      case "rating": {
        goods = await Goods.find({})
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort({
            name: 1,
          });
        break;
      }
      case "price": {
        goods = await Goods.find({})
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort({
            price: 1,
          });
        break;
      }
      case "type": {
        goods = await Goods.find({})
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort({
            type: 1,
          });
        break;
      }
      case "size": {
        goods = await Goods.find({})
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort({
            size: 1,
          });
        break;
      }
      case "color": {
        goods = await Goods.find({})
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort({
            color: 1,
          });
        break;
      }
      case "kindsOfClothing": {
        goods = await Goods.find({})
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort({
            kindsOfClothing: 1,
          });
        break;
      }
      default:
        goods = await Goods.find({})
          .limit(limit * 1)
          .skip((page - 1) * limit);
    }

    return res.status(201).json(goods);
  } catch (e) {
    res.status(500).json({ message: "Ошибка при получении товаров" });
  }
};

const delete_goods = async (req, res) => {
  try {
    const goods = await Goods.findOne({ _id: req.query.id });

    if (!goods) {
      return res
        .status(400)
        .json({ message: "Товар для удаления не был найден" });
    }

    await goods.remove();

    return res.json({ message: "Товар был успешно удален" });
  } catch (err) {
    return res.status(400).json({ message: "Произошла ошибка" });
  }
};

const search_goods = async (req, res) => {
  try {
    const searchName = req.query.search;
    console.log(searchName);
    let goods = await Goods.find({});
    goods = goods.filter((good) => good.name.includes(searchName));
    return res.json(goods);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Search error" });
  }
};

module.exports = { goods_post, goods_get, delete_goods, search_goods };

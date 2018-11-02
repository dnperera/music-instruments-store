const Brand = require("../models/Brand");
exports.addBrand = function(req, res) {
  const newbrand = new Brand(req.body);
  newbrand.save((err, brand) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({
      success: true,
      brand
    });
  });
};

exports.getBrands = function(req, res) {
  Brand.find({}, function(err, brands) {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(brands);
  });
};

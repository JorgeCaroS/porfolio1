const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  ref: {
      type: String,
      required: false
  },
  name: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false  
  },
  tallas: {
    type: Array,
    required: false    
  },
  images: {
    type: Array,
    required: false    
  },
  
});

module.exports = mongoose.model('Products', productSchema);
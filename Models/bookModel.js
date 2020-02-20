const mongoose = require('mongoose');

const BookSchema= mongoose.Schema({

  titulo:{
    type:String,
    required: true,
  },
  autor:{
    type: String,
    required: true,
  },
  isbn:{
    type:String,
    required: true,
  },
  editorial:{
    type:String,
    required: true,
  },
  descripcion:{
    type:String,
    required: true,
  },
  precio:{
    type:String,
    required: true,
  }

});

module.exports = mongoose.model('Book', BookSchema);
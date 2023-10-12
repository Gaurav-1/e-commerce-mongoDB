const mongoose = require('mongoose');

module.exports.init = async function(){
    await mongoose.connect("mongodb+srv://gauravkohli471:3KORwUKtgR4dH8JG@cluster0.bm0gevx.mongodb.net/e_commerce?retryWrites=true&w=majority");
}
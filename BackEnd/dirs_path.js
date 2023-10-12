const path = require('path');

const utils = path.join(__dirname+'/utils');
const db = path.join(__dirname,'..','/DB');
const frontend = path.join(__dirname,'..','/Views');
const script = path.join(__dirname,'..','/Scripts');
const cssstyle = path.join(__dirname,'..','/Stylesheets')

module.exports={
    utils,
    db,
    frontend,
    script,
    cssstyle
};
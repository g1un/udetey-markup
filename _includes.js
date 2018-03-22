const folder = './src/includes/';
const fs = require('fs');

module.exports = () => {
    let includes = [];

    includes = fs.readdirSync(folder);
    let includesList = '';
    includes.forEach(include => {
        includesList += 'include ' + include + '\n';
    });

    includesList = includesList.replace('include _includes.pug', '');

    fs.writeFile(
        './src/includes/_includes.pug',
        includesList,
        err => { console.log(err ? 'Error :' + err : '_includes ok') }
    );
};
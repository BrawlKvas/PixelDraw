let fs = require('fs');

function save(nameFile, data) {
    fs.writeFile(nameFile, JSON.stringify(data), (e, d) => { });
}

function load(nameFile, bd) {
    try {
        return JSON.parse(fs.readFileSync(nameFile, 'utf8', (err) => {}));
    } catch(e) {

    }
}

module.exports.save = save;
module.exports.load = load;
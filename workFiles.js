let fs = require('fs');

function save(nameFile, data) {
    fs.writeFile(nameFile, JSON.stringify(data), (e, d) => { });
}

function load(nameFile, bd) {
    let result;

    try {
        result = fs.readFileSync(nameFile, 'utf8', (err) => {});

        return JSON.parse(result);
    } catch(e) {
        return [];
    }
}

module.exports.save = save;
module.exports.load = load;
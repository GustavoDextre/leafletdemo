const path = require("path");

function render(file, res) {
  return res.sendFile(path.join(__dirname + `/../src/views/${file}.html`));
}

class MapaController {
  async index(req, res) {
    return render("index", res);
  }
}

module.exports = new MapaController();
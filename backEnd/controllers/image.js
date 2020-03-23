const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "0c56b22fab71436b9714af496220e24a"
});

app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input);

const handleImage = db => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entires[0]);
    })
    .catch(err => res.status(400).json("Unable to Fetch Entires"));
};

module.exports = {
  handleImage
};

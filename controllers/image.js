const Clarifai = require("clarifai");

const API_KEY = process.env.API_CLARIFAI;

const app = new Clarifai.App({
  apiKey: API_KEY,
});

const handleApiCall = (req, res) => {
  app.models
    .initModel({
      id: Clarifai.FACE_DETECT_MODEL,
    })
    .then((faceDetectModel) => {
      faceDetectModel
        .predict(req.body.input)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => res.status(400).json("unable to work with API"));
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("Unable to get Entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};

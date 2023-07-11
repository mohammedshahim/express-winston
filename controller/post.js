const { default: axios } = require("axios");

exports.getPost = async (req, res) => {
  console.log("getPost");
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.toString());
    return res.status(500).json({ message: error.message });
  }
};

export default function handler(req, res) {
  try {
    const { id } = req.query
    console.log(id);
    //  Look up content from short-id
    return {

    }
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
}

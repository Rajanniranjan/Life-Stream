const JWT = require("jsonwebtoken");
//  is fun se kisi bhi route ko protect kar sakte hai jab
// tak us route ko token nhi milega and if not verify tab tak
// no access
module.exports = async (req, res, next) => {
  try {
    // token decrpt kiya yha
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        // decoded value use ki
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Auth Failed",
    });
  }
};

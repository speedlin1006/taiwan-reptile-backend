import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {

  try {

    const authHeader =
      req.headers.authorization

    if (!authHeader) {

      return res.status(401).json({
        message: "No token"
      })

    }

    const token =
      authHeader.split(" ")[1]

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.merchantId =
      decoded.merchantId

    req.role =
      decoded.role

    req.role =
      decoded.role

    next()

  } catch (err) {

    return res.status(401).json({
      message: "Invalid token"
    })

  }

}

export default authMiddleware
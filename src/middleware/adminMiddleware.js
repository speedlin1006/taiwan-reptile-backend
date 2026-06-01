const adminMiddleware = (
  req,
  res,
  next
) => {

  if (
    req.role !== "admin"
  ) {

    return res.status(403).json({

      message:
        "No permission"

    })

  }

  next()

}

export default adminMiddleware
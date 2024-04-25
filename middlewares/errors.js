const errorHandler = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    success: false,
    message: "Something went wrong, please try again later!",
    data: {},
  });
};

export { errorHandler };

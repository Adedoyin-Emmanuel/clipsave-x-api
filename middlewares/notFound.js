const notFound = (req, res) => {
  return res.satus(404).json({ success: false, message: "Route not found" });
};

export { notFound };

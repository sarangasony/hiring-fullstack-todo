export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: "Route not found." });
};

export const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((item) => item.message)
      .join(" ");

    return res.status(400).json({ message });
  }

  res.status(500).json({
    message: "Something went wrong. Please try again.",
  });
};

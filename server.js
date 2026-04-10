const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({ origin: "*" }));

// Helper function for error responses
const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: "error",
    message
  });
};

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to Oyewumi LordRock Stack 0 API");
});

// Main route
app.get("/api/classify", async (req, res) => {
  const { name } = req.query;

  // Validate presence
  if (name === undefined || name === null) {
    return sendError(res, 400, "Missing or empty name parameter");
  }

  // Validate type
  if (typeof name !== "string") {
    return sendError(res, 422, "name must be a string");
  }

  // Trim whitespace
  const trimmedName = name.trim();

  // Validate empty after trimming
  if (trimmedName === "") {
    return sendError(res, 400, "Missing or empty name parameter");
  }

  try {
    const response = await fetch(
      `https://api.genderize.io?name=${encodeURIComponent(trimmedName)}`
    );

    // Handle upstream failure
    if (!response.ok) {
      return sendError(res, 502, "Failed to fetch prediction from upstream service");
    }

    const rawData = await response.json();
    const { gender, probability, count, name: predictedName } = rawData;

    // Handle no prediction edge case
    if (gender === null || count === 0) {
      return sendError(res, 422, "No prediction available for the provided name");
    }

    const isConfident = probability >= 0.7 && count >= 100;
    const processedAt = new Date().toISOString();

    return res.status(200).json({
      status: "success",
      data: {
        name: predictedName,
        gender,
        probability,
        sample_size: count,
        is_confident: isConfident,
        processed_at: processedAt
      }
    });
  } catch (error) {
    return sendError(res, 502, "Failed to fetch prediction from upstream service");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
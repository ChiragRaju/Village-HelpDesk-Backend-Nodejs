const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const issueRoutes = require("./routes/issueRoutes");
const adminRoutes = require("./routes/adminRoutes");
const feedbackRoutes = require('./routes/feedbackRoutes');
const emailRoutes = require('./routes/emailRoutes');
const checkStatusRoutes = require('./routes/checkStatusRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const locationRoutes = require('./routes/locationRoutes');
const cors = require('cors');

const app = express();
app.use(express.static('uploads'));

// Set up CORS middleware here
app.use(cors({
  origin: 'http://localhost:3000', // Specify the allowed origin for CORS
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
  credentials: true, // Enable credentials (cookies, authorization headers)
}));

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

// Use authentication routes
app.use("/api/auth", authRoutes);

// Use issue-related routes
app.use("/api/issues", issueRoutes);

// Use admin-related routes
app.use("/api/admin", adminRoutes);

// Use feedback-related routes
app.use("/feedback", feedbackRoutes);

// Use email-related routes
app.use('/email', emailRoutes);

// Use check status routes
app.use('/status', checkStatusRoutes);

// Use supervisor-related routes
app.use('/supervisors', supervisorRoutes);

// Use location-related routes
app.use('/locations', locationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const issueRoutes = require("./routes/issueRoutes");
const adminRoutes=require("./routes/adminRoutes");
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
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, authorization headers)
}));

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/admin", adminRoutes);
app.use("/feedback", feedbackRoutes);
app.use('/email', emailRoutes);
app.use('/status', checkStatusRoutes);
app.use('/locations', locationRoutes);
app.use('/supervisors', supervisorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

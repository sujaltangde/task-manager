const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const helmet = require('helmet');

// Other middleware
const {errorHandler, handleUncaughtExceptions, handleUnhandledRejections} = require('./middlewares/errorHandler.js')

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({limit: '10mb'})); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.use('/api/user', userRoutes); 
app.use('/api/tasks', taskRoutes); 



app.use(errorHandler);


handleUnhandledRejections();
handleUncaughtExceptions();

app.get('/',(req, res, next) => {
  res.send('Working');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Export the app
module.exports = app;

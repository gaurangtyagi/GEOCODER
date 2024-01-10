const path = require('path'); 
const express = require('express'); 
const dotenv = require('dotenv'); 
const cors = require('cors'); // this will allow us to make cross origin requests
const connectDB = require('./config/db'); 
dotenv.config({ path: './config/config.env'});  // Load env Variables
const app = express(); 
connectDB(); // Connect to DB
// body parser
app.use(express.json()); 
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public'))); 


// Routes
app.use('/api/v1/stores', require('./routes/stores')); 

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`); 
}); 
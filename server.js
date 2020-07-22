const express=require('express');
const app = express();
const connectDB = require('./config/db');
// call connectDB
connectDB();
// initial Middleware
app.use(express.json({extended: false}));

app.get('/',(req,res) =>res.json('API is Work!'));

// define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));



const PORT =process.env.PORT || 5000;
app.listen(PORT,() =>console.log(`server running on PORT ${PORT}`) );

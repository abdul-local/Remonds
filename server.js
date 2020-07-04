const express=require('express');
const app = express();

app.get('/',(req,res) =>res.json('API is Work!'));



const PORT =process.env.PORT || 5000;
app.listen(PORT,() =>console.log('server running on PORT 5000') );

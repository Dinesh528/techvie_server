const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require("morgan");
const app = express();
const path = require('path');
const log = console.log;
//const PORT = process.env.PORT || 4001;
var cors = require('cors');
const appRoute =  require('./Routes/postRoutes');
const userRoute =  require('./Routes/userDataRouter');
const projectRoute =  require('./Routes/projectRoutes');
const Connections =  require('./Routes/Connections');


//Configure Db
const db= require('./config/keys').mongoURI;
//Connect to MongoDb
mongoose
    .connect(db)
    .then( ()=> {console.log("MongoDB successfully connected..")})
    .catch(err => console.log(err));



app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
//app.use(bodyParser=urlencoded({extended: true}));
var Router = express.Router();
//app.use(authentication)
app.use('/api',appRoute);
app.use('/api',userRoute);
app.use('/api',projectRoute);
app.use('/api',Connections);

//app Routes 
//appRoute.init(Router);

mongoose.Promise = global.Promise;


const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);

});

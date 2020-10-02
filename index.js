const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const {addUser, removeUser,getUser } = require('./services/chatuser');
const {addOnline, removeOnline, getOnline } = require('./services/onlineuser');

require('./models/User');
require('./models/Message');
require('./services/passport');

const { saveMessage } = require('./controllers');


mongoose.connect(keys.mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true });


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/testRoutes')(app);
require('./routes/userRoutes')(app);

// saveMessage("latest message ","5f64a46f551ad825fcefb84e","5f7478ca2fe0ce14e8dc255d","9a876ff4-9e62-4afa-a6f2-0e1737487e4e");
// saveMessage("latest latest ","5f7478ca2fe0ce14e8dc255d","5f64a46f551ad825fcefb84e","9a876ff4-9e62-4afa-a6f2-0e1737487e4e");



io.on('connection',(socket)=>{
    console.log("We have got a new connection!!!");
    socket.on('test',message=>{
        console.log(message)
    })
    socket.on('join',({uid,room}, callback)=>{
        console.log("someonehere")
        if(uid){
        const {user} = addUser({id:socket.id,uid,room});
        socket.join(user.room);
        }
 
    });

    socket.on('sendMessage',(message)=>{
        console.log(message)

        const user = getUser(message.uid);
        console.log(socket.id)
        socket.to(user.room).emit('arrivemessage', {uid:user.uid,message:message.message});
        saveMessage(message.message,message.uuid,message.uid,message.to,user.room);
    
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);
        
    })
});

const online = io.of('/online');

online.on('connection',socket => {

    socket.on('join',message=>{
        user_id = message.uid;
        addOnline({uid:user_id, skid:socket.id});
        online.emit('updateOnline',getOnline().map(e=>{return {uid:e.uid}}))
    })
    socket.on('disconnect',()=>{
        removeOnline(socket.id);
        online.emit('updateOnline',getOnline().map(e=>{return {uid:e.uid}}))

    })
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })

}
const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
});

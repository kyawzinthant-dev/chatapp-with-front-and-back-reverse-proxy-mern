const Message = require('../models/Message');

exports.saveMessage = (message,uuid,from,to,room) => {
    const msg = new Message(
        {
            message,
            uuid,
            from,
            to,
            room
        }
    )

    msg.save();
}
const users = [];

const addUser = ({ id,uid,room }) => {
    const existingUser = users.find((user)=> user.room === room && user.uid === uid);
    if(!existingUser){
        const user = {id,uid,room};

        users.push(user);
        console.log(users)
        return {user}
    }
   else{
       user = existingUser;
       return {user};
   }
  
}

const removeUser = (id) => {
    const index = users.findIndex((user)=> user.id===id);

    if(index !== -1){
        return users.splice(index,1)[0]
    }
}
const getUser = (uid) => users.find((user)=> user.uid===uid);

module.exports = { addUser, removeUser, getUser }
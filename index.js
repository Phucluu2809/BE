import express from 'express';
import dotenv from 'dotenv'; 
dotenv.config(); 
import user_router from './routes/user_router.js';
import fs from 'fs';
import dbjson from './db.json' with {type: "json"};

const PORT = 8001; 

const app = express(); 
app.use(express.json());

app.get('/', (req, res) => { //route
  const users = dbjson.users;
  res.status(200).json(users);
})
app.get("/:id", (req, res) => {
  const { id } = req.params;  
  const user = dbjson.users.find((user) => user.ID === parseInt(id)); 
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});


app.post("/", (req, res) => {
  const newUser = req.body; 
  if (dbjson.users.find((user)=> user.ID === newUser.ID)){
    return res.status(400).json({error: "User already exists"});
  }
  if (!newUser.ID || !newUser.name || !newUser.age) {
    return res.status(400).json({ error: "Missing required fields (ID, name, age)" });
  }
  dbjson.users.push(newUser);
  fs.writeFileSync('./db.json', JSON.stringify(dbjson, null, 2), 'utf-8');
  res.status(201).json(newUser);
});

app.put("/:id", (req, res) => {
  const { id } = req.params;  
  const updatedUser = req.body;  
  const userIndex = dbjson.users.findIndex((user) => user.ID === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  dbjson.users[userIndex].age = updatedUser.age;
  dbjson.users[userIndex].name = updatedUser.name;
  fs.writeFileSync('./db.json', JSON.stringify(dbjson, null, 2), 'utf-8');
  res.status(200).json(dbjson.users[userIndex]);
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;  
  const userIndex = dbjson.users.findIndex((user) => user.ID === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });  
  }
  dbjson.users.splice(userIndex, 1);
  fs.writeFileSync('./db.json', JSON.stringify(dbjson, null, 2), 'utf-8');
  res.status(200).json({ message: 'User deleted successfully' });
});



app.use(user_router);

app.listen(process.env.PORT, () => { 
  console.log(`server in running on http://localhost:${PORT}`);
})
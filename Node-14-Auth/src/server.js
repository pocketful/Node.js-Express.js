const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { PORT } = require('./config');
const { addUserToDb, findUserByEmail } = require('./models/userModel');

const app = express();

// temp db
const users = [
  { id: 1, email: 'hermione@email.com', password: '123456' },
  { id: 2, email: 'harry@email.com', password: '654321' },
];

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Middleware helper showBody
function showBody(req, res, next) {
  if (req.method === 'POST') {
    console.log('req.body ===', req.body);
  }
  next();
}

app.use(showBody);

// app.post('*', (req, res, next) => {
//   console.log('req.body ===', req.body);
//   next();
// });

app.get('/', (req, res) => {
  res.json('ok');
});

app.post('/login', async (req, res) => {
  const emailReceived = req.body.email;
  const passwordReceived = req.body.password;
  // check if email exists
  const foundUser = await findUserByEmail(emailReceived);
  console.log('foundUser ===', foundUser);
  // const foundUser = users.find((userObj) => userObj.email === emailReceived); // with temp array db

  if (!foundUser) {
    res.status(400).json({ error: 'Email or password not found (test:email)' });
    return;
  }

  // when pass not encrypted:
  // if email exists then check if passwords match
  // if (foundUser.password !== passwordReceived) {
  //   res.status(400).json({ error: 'Email or password not found (test:pass)' });
  //   return;
  // }

  // if email exists then check if passwords match
  // load hash from your password DB
  // bcrypt.compareSync('pass input', 'saved hashed pass'); // true false
  if (!bcrypt.compareSync(passwordReceived, foundUser.password)) {
    res.status(400).json({ error: 'Email or password not found (test:pass)' });
    return;
  }
  res.json('login success');
});

app.get('/users', (req, res) => {
  res.json(users);
});

// app.post('/register', showBody, (req, res) => { // if with showBody
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  // longer way
  // const salt = bcrypt.genSaltSync(10); // default 10
  // const hashedPass = bcrypt.hashSync(password, salt);
  // console.log('salt ===', salt);
  const hashedPass = bcrypt.hashSync(password, 10);
  console.log('hashedPass ===', hashedPass);

  const newUser = {
    email,
    password: hashedPass,
  };

  const insertResult = await addUserToDb(newUser.email, newUser.password);
  console.log('insertResult ===', insertResult);

  if (!insertResult) {
    res.status(500).json('something went wrong');
    return;
  }
  res.status(201).json('user created');
  // users.push(newUser);
  console.log('users ===', users);
});

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

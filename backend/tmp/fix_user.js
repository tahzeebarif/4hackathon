const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: '../.env' });

const fixUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/streamvibe');
    console.log('Connected to DB');

    const email = 'esha@gmail.com';
    const password = 'password123'; // Default password I'll set for them

    let user = await User.findOne({ email });
    if (user) {
      user.password = password;
      await user.save();
      console.log('User password updated');
    } else {
      user = await User.create({
        name: 'Esha',
        email: email,
        password: password
      });
      console.log('User created');
    }

    console.log(`Login with: ${email} / ${password}`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixUser();

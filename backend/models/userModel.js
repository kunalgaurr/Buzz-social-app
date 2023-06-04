const mongoose = require('mongoose');
const validate = require('validate');

function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Name is required'],
      RegExp: [/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, 'Please neter a valid name.'],
      max: [20, 'Name cannot exceed 20 characters.'],
      min: [3, 'Name cannot be less than 3 characters.'],
    },
    email: {
      type: String,
      require: [true, 'Email is required'],
      unique: [true, 'Email is not unique, user already exists.'],
      validate: {
        validator: validateEmail,
        message: 'Please enter a valid email address',
      },
      max: [30, 'Email cannot exceed 30 charcters.'],
    },
    password: {
      type: String,
      require: [true, 'Password is required.'],
    },
    description: {
      type: String,
      max: [200, 'Description must be less than 200 characters'],
      default: '',
    },
    phoneNumber: {
      type: String,
      max: [10, 'Phone number must be 10 characters.'],
      min: [10, 'Phone number must be 10 characters.'],
    },
    image: {
      type: String,
      default: '',
    },
    posts: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    friendRequests: {
      type: Array,
      default: [],
    },
    communities: {
      type: Array,
      default: [],
    },
    shares: {
      type: Array,
      default: [],
    },
    settings: {
      privacy: {
        type: String,
        default: 'Public',
      },
      imageVisibility: {
        type: String,
        default: 'To Everyone',
      },
      subscription: {
        type: String,
        default: 'Personal',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

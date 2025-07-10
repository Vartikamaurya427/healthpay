const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    maxlength: 15
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // allows multiple docs with null
  },
  name: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  profileImage: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otpHash: {
    type: String,
    default: null,
  },
  otpExpires: {
    type: Date,
    default: null,
  },
  pinHash: {
    type: String,
    default: null,
  },
  language: {
    type: String,
    default: null,
  }
}, {
  timestamps: true, // createdAt and updatedAt auto
  collection: 'Users' // 👈 matches tableName: "Users"
});

module.exports.User = mongoose.model("User", userSchema);




// models/user.js
// Sequelize v6 – Minimal model for “phone‑only + OTP” auth flow

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     "User",
//     {
//       phone: {
//         type: DataTypes.STRING(15), // store as “+9173…”, max 15 chars (E.164)
//         allowNull: false,
//         unique: true,
//         validate: {
//           notEmpty: true,
//         },
//       },

//       /* ✅ Set true after first successful OTP verification */
//       isVerified: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },

//       /* 📲 OTP handling (bcrypt‑hashed) */
//       otpHash: {
//         type: DataTypes.STRING(60), // bcrypt hash length
//         allowNull: true,
//       },
//       otpExpires: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//     },
//     {
//       tableName: "Users",
//       timestamps: true, // createdAt + updatedAt
//       indexes: [{ fields: ["phone"] }],
//     }
//   );

//   return User;
// };

//     profileImage: {
//       type: DataTypes.STRING,
//       defaultValue: '',
//     },
//     dob: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
     
//     deleted: {
//   type: DataTypes.BOOLEAN,
//   defaultValue: false
// },
// deletedAt: {
//   type: DataTypes.DATE,
//   allowNull: true
// },
// language: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   defaultValue: 'English'
// }


//   });


    
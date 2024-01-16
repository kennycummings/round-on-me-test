const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const argon2 = require('argon2');

class Member extends Model {
  static async hashPassword(password) {
    return argon2.hash(password);
  }

  checkPassword(loginPW) {
    return argon2.verify(this.password, loginPW);
  }
}

Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING, // Assuming Argon2 returns a string
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newMemberData) => {
        newMemberData.password = await Member.hashPassword(newMemberData.password);
        return newMemberData;
      },
      beforeUpdate: async (updatedMemberData) => {
        updatedMemberData.password = await Member.hashPassword(updatedMemberData.password);
        return updatedMemberData;
      },
    },
    sequelize,
    modelName: 'member',
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

module.exports = Member;
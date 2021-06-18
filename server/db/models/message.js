const Sequelize = require("sequelize");
const db = require("../db");
const { Op } = require("sequelize");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  readStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

Message.countUnread = async (conversationId, userId) => {
  const unreadMessages = await Message.count({
    where: {
      senderId: {
        [Op.not]:userId
      },
      readStatus: false,
      conversationId,
    }
  });
  return unreadMessages;
}

module.exports = Message;

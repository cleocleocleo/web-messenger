const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // find existing conversation
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    // confirm if supplied conversationId matches found conversation
    if (conversationId && conversationId !== conversation.id) {
        return res.sendStatus(401);
    };

    // if no conversation is found...
    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.has(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender, recipientId });
  } catch (error) {
    next(error);
  }
});

// Updates readStatus for messages in the active conversation
router.put("/read", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const senderId = req.user.id;
    const { conversationId } = req.body;

    const convo = await Conversation.findByPk(conversationId);
    if (convo.user1Id !== senderId && convo.user2Id !== senderId) {
      return res.sendStatus(401);
    }
    
    // Update messages in given convo NOT belonging to the user
    await Message.update({ readStatus: true }, {
      where: {
        readStatus: false,
        senderId: {
          [Op.not]: senderId
        },
        conversationId: conversationId
      }
    });
    // return convo Id so client can update notifications
    res.json({ conversationId });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

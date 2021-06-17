const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../utils/onlineUsers");

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
      if (onlineUsers.includes(sender.id)) {
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

module.exports = router;

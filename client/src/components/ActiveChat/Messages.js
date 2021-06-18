import React from "react";
import { Box, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles(() => ({
  avatar: {
    height: 20,
    width: 20,
    marginLeft: "auto",
    marginTop: 5,
    marginBottom: 5
  }
}));

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles();

  // Find ID for last read message
  const findLastRead = (msgArr) => {
    const filtered = msgArr.filter(msg => msg.senderId === userId && msg.readStatus);
    if (filtered.length > 0) {
      return filtered.pop().id;
    }
    return null
  };

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <Box key={message.id}>
            <SenderBubble text={message.text} time={time} id={message.id} />
            {message.id === findLastRead(messages) && <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>}
          </Box>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;

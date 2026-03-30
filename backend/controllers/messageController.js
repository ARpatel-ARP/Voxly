import { Conversation } from "../models/conversation.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Only create conversation if it doesn't exist
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Always create message, regardless of conversation status
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
      await gotConversation.save();
    }

    // SOCKET.IO
    const receiverSocketId = getReceiverSocketId(receiverId)
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage)
      }

    return res.status(200).json({
      newMessage,
      message: "Message sent",
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

//  GETmessage
export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id
        const senderId = req.id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] } // ✅ only 2 participants
        }).populate("messages")

        if (!conversation) {
            return res.status(200).json([])
        }

        return res.status(200).json(conversation.messages)
    } catch (error) {
        console.log(error)
    }
}

const ContactMessage = require("./mongodb/ContactMessage");
const { handleBadRequest } = require("../../utils/handleErrors");

const DB = process.env.DB || "MONGODB";

const createContactMessage = async (data) => {
  if (DB === "MONGODB") {
    try {
      let message = new ContactMessage(data);
      message = await message.save();
      return Promise.resolve(message);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("createContactMessage not in mongodb");
};

const getContactMessages = async () => {
  if (DB === "MONGODB") {
    try {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return Promise.resolve(messages);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve([]);
};

const deleteContactMessage = async (messageId) => {
  if (DB === "MONGODB") {
    try {
      const message = await ContactMessage.findByIdAndDelete(messageId);
      if (!message)
        throw new Error("Could not find this message in the database");
      return Promise.resolve(message);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("deleteContactMessage not in mongodb");
};

exports.createContactMessage = createContactMessage;
exports.getContactMessages = getContactMessages;
exports.deleteContactMessage = deleteContactMessage;

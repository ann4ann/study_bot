const TelegramAPI = require("node-telegram-bot-api");
const options = require("./options");
const { gameOptions, againOptions } = require("./options.js");
const token = "5666896388:AAHQN0RPWAS9UVEsCxYTVWwjk8CmEBvBY9w";

const bot = new TelegramAPI(token, { polling: true });

const chats = {};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Получить информацию о пользователе" },
    { command: "/game", description: "Запустить игру" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const userName = msg.from.first_name || "незнакомец";
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/06c/d14/06cd1435-9376-40d1-b196-097f5c30515c/1.webp"
      );
      return bot.sendMessage(
        chatId,
        `Добро пожаловать в мой первый бот, ${userName}!`
      );
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${userName} ${msg.from.last_name || ""}.`
      );
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    return bot.sendMessage(
      chatId,
      `Ты написал мне ${text}, у меня нет такой команды.`
    );
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (Number(data) === chats[chatId]) {
      return bot.sendMessage(chatId, "Ты угадал!", againOptions);
    } else {
      return bot.sendMessage(
        chatId,
        `Ты не угадал, загаданная цифра - ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, "Загадываю число от 0 до 9 ...");
  const randomNumber = Math.floor(Math.random() * 10);
  console.log(randomNumber);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Отгадай это число и напиши мне", gameOptions);
};

start();

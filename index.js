const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '1442467975:AAEjebeORLBSBEIC2QRrP8MHEzChfMlBjtc'

const bot = new TelegramBot(TOKEN, { polling: true })

const sticker1 = 'sticker.tgs'
const sticker2 = 'smile_st.tgs'

let users = []

const keyboard = [
  [
    {
      text: 'Хочу посмотреть, что еще есть', // текст на кнопке
      callback_data: 'terminator', // данные для обработчика событий
    },
  ],
  [
    {
      text: 'Отстаньте от меня',
      callback_data: 'beback',
    },
  ],
  [
    {
      text: 'Хочу посетить сайт компании',
      url: 'http://smart-ui.pro/', //внешняя ссылка
    },
  ],
]
const meKey = [
  [
    {
      text: 'Хочу узнать, кто тебя СОЗДАЛ', // текст на кнопке
      callback_data: 'me', // данные для обработчика событий
    },
  ],
  [
    {
      text: 'Отстаньте от меня',
      callback_data: 'beback',
    },
  ],
]
// bot.on('message', (msg) => {
//   const userId = msg.from.id

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(userId, `${msg.from.first_name} Received your message`)
// })

bot.onText(/[a-z][0-9][а-я]/gi, (msg) => {
  const userId = msg.from.id
  bot.sendMessage(userId, `Hello ${msg.from.first_name}`);
});

bot.onText(/(start|hello|привет)/gi, (msg) => {
  const userId = msg.from.id
  bot.sendMessage(
    userId,
    `Привет, ${msg.from.first_name}. Я тестовый и не очень серъезный бот компании SMART-UI. Давай посмотрим, что мы уже умеем? Например, ты можешь написать мне сообщение или выбрать из предложенных вариантов.  В дальнейшем, чтобы открыть клавиатуру, напиши мне "Поехали" или " Хочу еще". Можешь попробовать отправить мне стикер, а также я знаю  ответы на некоторые вопросы "Зачем" и "Почему", можешь спросить меня о чем-нибудь:-))`,     
    {
      // прикрутим клаву
      reply_markup: {
        inline_keyboard: meKey,
      },
    }
  )
  users.push(msg.from)
})
bot.onText(/^(почему|зачем|как)/gi, (msg) => {
  const userId = msg.from.id
  bot.sendMessage(
    userId,
    `Слушай, ${msg.from.first_name}. Много будешь знать - скоро состаришься :-))`
  )
})
bot.onText(/Хочу (еще|ещё)/gi, (msg) => {
  const userId = msg.from.id
  bot.sendMessage(
    userId,
    `А не много ли ты хочешь, ${msg.from.first_name}? :-))`
  )
})
bot.onText(/Покажи Софию/gi, (msg) => {
  const userId = msg.from.id
  bot.sendPhoto(userId, 's.jpg')
})
bot.on('sticker', (msg) => {
  const userId = msg.from.id
  
  
  bot.sendSticker(userId, sticker1)
  bot.sendSticker(userId, sticker2)
})
bot.onText(/Поехали/gi, (msg) => {
  const chatId = msg.chat.id //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(
    chatId,
    `Готов идти дальше, ${msg.from.first_name}? Тогда вот варианты`,
    {
      // прикрутим клаву
      reply_markup: {
        inline_keyboard: keyboard,
      },
    }
  )
})

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id

  let img = ''

  if (query.data === 'terminator') {
    //
    img = 'term.jpg'
    setTimeout(() => {
      bot.sendMessage(chatId, 'я же все-таки почти ИИ :-))')
    }, 2000)
    bot.sendMessage
  }

  if (query.data === 'beback') {
    //
    img = 'beback.jpg'
    setTimeout(() => {
      bot.sendMessage(chatId, "I'll be back")
    }, 2000)
  }
  if (query.data ===  'me') {
    //
    img = 'me.jpg'
    setTimeout(() => {
      bot.sendSticker(chatId, sticker2)
    }, 2000)
  }

  if (img) {
    bot.sendPhoto(chatId, img)
  }
})

//  GET USERS !!
bot.onText(/arr/, (msg) => {
  const userId = msg.from.id
  bot.sendMessage(userId, `${msg.from.first_name}. ${JSON.stringify(users)}`)
})
//

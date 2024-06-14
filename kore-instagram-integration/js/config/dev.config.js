module.exports = {
    sinchConfig: {
        ACCESS_KEY: process.env.SINCH_ACCESS_KEY,
        ACCESS_SECRET: process.env.SINCH_ACCESS_SECRET
    },
    koreConfig: {
        WEBHOOK_URL: `https://bots.kore.ai/chatbot/v2/webhook/${process.env.BOT_ID}`,
        AUTH_TOKEN: process.env.KORE_AUTH_TOKEN
    },
    demoDpd: {
        ACCESS_LINK: "https://demodpd.kore.ai/kitchensink-instagram-demo"

    }
}



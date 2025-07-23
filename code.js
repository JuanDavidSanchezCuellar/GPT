const axios = require("axios");

exports.handler = async (event) => {
    const userMessage = event.request.intent.slots.tema.value;

    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        },
        {
            headers: {
                Authorization: `Bearer TU_API_KEY_OPENAI`,
            },
        }
    );

    const answer = response.data.choices[0].message.content;

    return {
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text: answer,
            },
            shouldEndSession: false,
        },
    };
};

const env = {
    JWT: "",
    SEARCH_ASSIST_APP_ID: ""
};
const searchAssistRequest = async (query) => {
    const options = {
        url: `https://searchassist.kore.ai/searchassistapi/external/stream/${env.SEARCH_ASSIST_APP_ID}/livesearch`,
        method: "POST",
        body: JSON.stringify({
            query,
            maxNumOfResults: 3
        }),
        headers: {
            "Content-Type": "application/json",
            "auth": env.JWT
        }
    };

    const searchResultRaw = await fetch(options.url, options);
    const searchResult = await searchResultRaw.json();

    console.log(searchResult.template.results.web);
};

searchAssistRequest("generative AI");

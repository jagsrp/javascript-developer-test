const { httpGet } = require('./mock-http-interface');

/**
 * Attempts to parse a JSON string into an object.
 *
 * If the string is not valid JSON, returns an object with a single key-value pair where the key is "message" and the value is the error message.
 *
 * @param {string} body - The JSON string to parse
 * @returns {object} - The parsed object or an object containing the error message
 */
const parseBody = (body) => {
    try {
        const parsedBody = JSON.parse(body);
        return parsedBody;
    } catch (error) {
        console.error(`Invalid body string`, error);
        return { message: "Invalid body string." };
    }
}

/**
 * Given a URL, returns a promise that resolves to an object containing the Arnie quote or an error message.
 *
 * @param {string} url - The URL to fetch the Arnie quote
 * @returns {Promise<{ "Arnie Quote": string } | { "FAILURE": string } >} - The resolved promise containing the Arnie quote or error message
 */
const getArnieQuote = async (url) => {
    const { status, body } = await httpGet(url);
    const { message } = parseBody(body)
    return status === 200 ? { "Arnie Quote" : message } : { "FAILURE" : message };
}

/**
 * Given an array of URLs, returns a promise that resolves to an array of objects containing the Arnie quotes or error messages.
 *
 * @param {string[]} urls - The array of URLs to fetch the Arnie quotes
 * @returns {Promise<Array<{ "Arnie Quote": string } | { "FAILURE": string } >>} - The resolved promise containing an array of objects, each containing either the quote or an error message
 */
const getArnieQuotes = async (urls) => {
    const arnieQuotes = await Promise.all(urls.map(getArnieQuote));
    return arnieQuotes;
};

module.exports = {
  getArnieQuotes,
};

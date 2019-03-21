const mail = require('./mail');

module.exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  const body = JSON.parse(event.body);

  return mail
    .send('newsletter', 'Newsletter', body)
    .then((data) => {
      return {
        headers,
        statusCode: 200,
        body: JSON.stringify(data)
      };
    })
    .catch((err) => {
      return {
        headers,
        statusCode: 200,
        body: JSON.stringify(err)
      };
    });
};

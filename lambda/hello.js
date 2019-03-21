module.exports.handler = async () => {
  const headers = {
    'Content-Type': 'application/json'
  };

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello Lambda!' })
  };
};

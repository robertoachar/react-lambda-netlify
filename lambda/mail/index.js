const mailer = require('nodemailer');

const config = require('./config');
const newsletter = require('./templates/newsletter');

const transport = mailer.createTransport({
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS
  }
});

const loadTemplate = async (action) => {
  let template = '';

  switch (action) {
    case 'newsletter':
      template = newsletter;
      break;

    default:
      template = '';
  }

  return template;
};

module.exports.send = async (template, subject, body) => {
  let html = await loadTemplate(template);

  const entries = Object.entries(body);
  entries.forEach((entry) => {
    html = html.replace(`{=${entry[0]}}`, entry[1]);
  });

  const options = {
    from: config.MAIL_BOX,
    to: config.MAIL_BOX,
    subject,
    html
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(options, (err, info) => {
      if (err) return reject(err);

      return resolve(info);
    });
  });
};

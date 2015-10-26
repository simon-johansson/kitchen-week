
const nodemailer = require('nodemailer');
const mandrillTransport = require('nodemailer-mandrill-transport');
const config = require('../../config');

const transporter = nodemailer.createTransport(mandrillTransport({
  auth: {
    apiKey: config.keys.mandrill
  }
}));

export default transporter;

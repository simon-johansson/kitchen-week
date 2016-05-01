
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import config from '../../config';

const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: config.keys.sendgrid
  }
}));

export default transporter;

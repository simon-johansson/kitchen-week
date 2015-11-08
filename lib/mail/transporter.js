
import nodemailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';
import config from '../../config';

const transporter = nodemailer.createTransport(mandrillTransport({
  auth: {
    apiKey: config.keys.mandrill
  }
}));

export default transporter;

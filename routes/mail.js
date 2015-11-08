
import {Router} from 'express';
import propagate from '../lib/propagate';
import getTemplateData from '../lib/getTemplateData';
import {
  reminderTemplate,
  statusTemplate,
  summaryTemplate
} from '../lib/mail/templates';

const router = Router();

const respond = (req, res, next, template) => {
  const compileTemplate = data => template.render(data);
  const sendHTML = template => res.send(template.html);
  const onError = (err) => {
    let error = new Error(err);
    error.status = 500;
    return next(error);
  };

  getTemplateData()
  .then(compileTemplate)
  .then(sendHTML)
  .catch(onError);
};

router.get('/reminder', (...args) => {
  respond(...args, reminderTemplate);
});

router.get('/status', (...args) => {
  respond(...args, statusTemplate);
});

router.get('/summary', (...args) => {
  respond(...args, summaryTemplate);
});

export default router;

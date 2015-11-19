
import {Router} from 'express';
import mail from '../lib/mail';
import {giveFeedback} from '../lib/spreadsheet';
import propagate from '../lib/propagate';
import getTemplateData from '../lib/getTemplateData';

const router = Router();

const onSuccess = res => {
  return () => res.json('Feedback given');
};

const onError = res => {
  const err = { error: 'Could not give feeback' };
  return () => res.status(500).json(err);
};

const renderTemplate = (req, res, next, template) => {
  const render = data => res.render(template, data);
  const onError = (err) => {
    const error = new Error(err);
    error.status = 500;
    next(error);
  };

  getTemplateData()
    .then(render)
    .catch(onError);
};

router.get('/', (...args) => {
  renderTemplate(...args, 'index');
});

router.get('/highscore', (...args) => {
  renderTemplate(...args, 'highscore');
});

router.post('/feedback', (req, res, next)  => {
  giveFeedback(req.body.type)
    .then(onSuccess(res))
    .catch(onError(res));
});

export default router;


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

router.get('/', (req, res, next) => {
  const renderTemplate = data => res.render('index', data);
  const onError = (err) => {
    const error = new Error(err);
    error.status = 500;
    next(error);
  };

  getTemplateData()
    .then(renderTemplate)
    .catch(onError);
});

router.post('/feedback', (req, res, next)  => {
  // console.log(req.body.type);
  giveFeedback(req.body.type)
    .then(onSuccess(res))
    .catch(onError(res));
});

//router.post('/negative', (req, res)  => {
//  giveNegativeFeedback()
//    .then(onSuccess(res))
//    .catch(onError(res));
//});

export default router;

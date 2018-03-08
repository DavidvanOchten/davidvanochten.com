import AboutController from './AboutController.js';
import BaseController from './BaseController.js';
import CaseController from './CaseController.js';
import ContactController from './ContactController.js';
import IndexController from './IndexController.js';
import NewsController from './NewsController.js';
import OfflineController from './OfflineController.js';
import WorkController from './WorkController.js';

const Controllers = {
  about: AboutController,
  base: BaseController,
  case: CaseController,
  contact: ContactController,
  index: IndexController,
  news: NewsController,
  offline: OfflineController,
  work: WorkController
};

export default Controllers;
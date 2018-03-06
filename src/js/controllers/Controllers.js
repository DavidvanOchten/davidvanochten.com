import BaseController from './BaseController.js';
import CaseController from './CaseController.js';
import HomeController from './HomeController.js';
import OfflineController from './OfflineController.js';
import WorkController from './WorkController.js';

const Controllers = {
  base: BaseController,
  case: CaseController,
  home: HomeController,
  offline: OfflineController,
  work: WorkController
};

export default Controllers;
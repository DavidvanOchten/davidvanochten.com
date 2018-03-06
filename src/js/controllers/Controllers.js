import BaseController from './BaseController.js';
import HomeController from './HomeController.js';
import OfflineController from './OfflineController.js';
import WorkController from './WorkController.js';

const Controllers = {
  base: BaseController,
  home: HomeController,
  offline: OfflineController,
  work: WorkController
};

export default Controllers;
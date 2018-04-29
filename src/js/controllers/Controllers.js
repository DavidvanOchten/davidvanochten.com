import BaseController from './BaseController.js';
import CaseController from './CaseController.js';
import ContactController from './ContactController.js';
import ErrorController from './ErrorController.js';
import IndexController from './IndexController.js';
import NotesController from './NotesController.js';
import OfflineController from './OfflineController.js';
import ProfileController from './ProfileController.js';
import WorkController from './WorkController.js';

const Controllers = {
  base: BaseController,
  case: CaseController,
  contact: ContactController,
  error: ErrorController,
  index: IndexController,
  notes: NotesController,
  offline: OfflineController,
  profile: ProfileController,
  work: WorkController
};

export default Controllers;
import BaseController from './BaseController.js';
import ContactController from './ContactController.js';
import ErrorController from './ErrorController.js';
import IndexController from './IndexController.js';
import NotesController from './NotesController.js';
import OfflineController from './OfflineController.js';
import ProfileController from './ProfileController.js';
import ProjectController from './ProjectController.js';
import WorkController from './WorkController.js';

const Controllers = {
  base: BaseController,
  contact: ContactController,
  error: ErrorController,
  index: IndexController,
  notes: NotesController,
  offline: OfflineController,
  profile: ProfileController,
  project: ProjectController,
  work: WorkController
};

export default Controllers;
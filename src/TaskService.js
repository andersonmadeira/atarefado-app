import Realm from 'realm';
import Task from './Task';

let repo = new Realm({
  schema: [{
    name: 'task',
    primaryKey: 'id',
    properties: {
      id: {
        type: 'string', indexed: true
      },
      title: 'string',
      completed: 'bool',
      createdAt: 'date',
      updatedAt: 'date',
    }
  }]
});

let TaskService = {
  findAll: function (sortBy) {
    if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
    let results = repo.objects('task').sorted(sortBy);
    return Array.from(results);
  },

  findByLabel: function (label) {
    let results = repo.objects('task').filtered('title contains "' + label + '"');
    return Array.from(results);
  },

  save: function (task) {
    if (repo.objects('task').filtered("title = '" + task.title + "'").length) return;

    repo.write(() => {
      task.updatedAt = new Date();
      repo.create('task', task);
    })
  },

  delete: function (task) {
    repo.write(() => {
      repo.delete(task);
    });
  },

  update: function (task, callback) {
    if (!callback) return;
    repo.write(() => {
      callback();
      task.updatedAt = new Date();
    });
  }
};

TaskService.save(new Task('Meet old ben'));
TaskService.save(new Task('Learn to use the lightsaber'));
TaskService.save(new Task('Train with master yoda'));
TaskService.save(new Task('Use the force'));
TaskService.save(new Task('Destroy the Death Star'));
TaskService.save(new Task('Free Han'));

export default TaskService;

import Realm from 'realm';
import Task from './Task';

let repository = new Realm({
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
})

let TaskService = {
  findAll: function (sortBy) {
    if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
    return repository.objects('task').sorted(sortBy);
  },

  save: function (task) {
    if (repository.objects('task').filtered("title = '" + task.title + "'").length) return;

    repository.write(() => {
      task.updatedAt = new Date();
      repository.create('task', task);
    })
  },

  update: function (task, callback) {
    if (!callback) return;
    repository.write(() => {
      callback();
      task.updatedAt = new Date();
    });
  }
};

TaskService.save(new Task('Lorem ipsum'));
TaskService.save(new Task('Watch Star Wars The Clone Wars'));
TaskService.save(new Task('Train with master yoda'));
TaskService.save(new Task('Use the force'));
TaskService.save(new Task('Destroy the Death Star'));
TaskService.save(new Task('Free Han'));

export default TaskService;

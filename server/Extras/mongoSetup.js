db.Todo.drop();
db.Todo.insert({
  dateLastModified: Date.now(),
  dueDate: Date.now(),
  title: 'Sample title',
  description: 'Sample description',
  isDone: true,
});

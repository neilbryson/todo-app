db.Todo.drop();
db.Todo.insert({
  dateLastModified: new Date(),
  dueDate: new Date(),
  title: 'Sample title',
  description: 'Sample description',
  isDone: true,
});

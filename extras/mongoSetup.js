db.todo.drop();
db.todo.insert({
  dateLastModified: Date.now(),
  dueDate: Date.now(),
  title: 'Sample title',
  description: 'Sample description',
  isDone: true,
});

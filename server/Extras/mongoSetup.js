db.Todo.drop();
db.Todo.insert({
  DateLastModified: new Date(),
  DueDate: new Date(),
  Title: 'Sample title',
  Description: 'Sample description',
  IsDone: true,
});
db.Todo.createIndex({ Title: "text", Description: "text" });

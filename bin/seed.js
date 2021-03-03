#!/usr/bin/env node

const {
  database,
  models: { Todo },
} = require('../server/db');

const seed = async () => {
  await database.sync({ force: true });

  await Todo.create({
    taskName: 'Buy dog food',
    assignee: 'Cody',
  });

  await Todo.create({
    taskName: 'Take over world',
    assignee: 'Cody',
  });

  await Todo.create({
    taskName: 'Buy dog food',
    assignee: 'Cody',
  });

  database.close();
  console.log(`
    Seeding successful!
    Time to do stuff!
  `);
};

seed().catch((err) => {
  database.close();
  console.log(`
    Error seeding:
    ${err.message}
    ${err.stack}
  `);
});

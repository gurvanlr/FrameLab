import Database from "mysql2-async";

const db = new Database({
    host: "127.0.0.1",
    user: "root",
    password: "22730/GAla/22",
    database: "framelab_test",
    skiptzfix: true,
    dateStrings: true,
});

export default db;
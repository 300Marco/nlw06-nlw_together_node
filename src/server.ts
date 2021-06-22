import "reflect-metadata";
import express from "express"; // Importando express
const app = express(); // atribuindo o express a uma variável

app.listen("3000", function() {
    console.log("Server is running");
});
import cowsay from "cowsay";
import { readFileSync } from "fs";
import path from "path";
import lolcat from "./lolcat.js";
import express from "express";

const app = express();
const port = 8000;

/** @type {string[]} a list of fortunes from `fortunes.txt` with newlines at the start and end */
const fortunes = readFileSync(path.join(process.cwd(), "fortune.txt"), "utf8").split("%");

/** @returns {string} a fortune from fortunes global */
const fortune = () => { return fortunes[Math.floor(Math.random() * fortunes.length)].trim() };

app.get("/", (_, res) => {
    let output = "";
    try { output = lolcat(cowsay.say({text : fortune()}), 1) }
    catch (e) { output = "lolz" }

    res.set("Content-Type", "text/plain");
    res.status(200).send(output);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

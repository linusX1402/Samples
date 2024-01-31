"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DATAPATH = __dirname + '/../data/posts.json';
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(__dirname + '/../public'));
app.use(express_1.default.json());
app.listen(port, () => {
    console.log("/n");
    console.log('*********** Server started **********');
    console.log(`Available at http://localhost:${port}`);
    console.log(`*************************************`);
});
app.post("/addPost", (req, res) => {
    let newPost = req.body;
    console.log(newPost);
    fs_1.default.readFile(DATAPATH, 'utf-8', (err, data) => {
        if (err)
            throw err;
        let json = JSON.parse(data);
        json.posts.push(newPost);
        fs_1.default.writeFile(DATAPATH, JSON.stringify(json, null, 2), 'utf-8', (err) => {
            if (err)
                throw err;
            console.log('new Post added');
            res.send({ 'success': true });
        });
    });
});
app.get("/getAllPosts", (req, res) => {
    fs_1.default.readFile(DATAPATH, 'utf-8', (err, data) => {
        if (err)
            throw err;
        res.send(data);
    });
});
app.get("/getPost/:id", (req, res) => {
    let id = parseInt(req.params.id);
    fs_1.default.readFile(DATAPATH, 'utf-8', (err, data) => {
        if (err)
            throw err;
        let json = JSON.parse(data);
        let post = json.posts[id - 1];
        res.send(post);
    });
});

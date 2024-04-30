const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;

mongoose.connect('mongodb+srv://holyfreire:senha@crud.qnnhw8i.mongodb.net/?retryWrites=true&w=majority&appName=Crud');

const filmSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true },
    trailer_url: { type: String, required: true }
});

const Film = mongoose.model('Film', filmSchema);


// Adicionar dados
app.post("/add", async (req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    });

    await film.save();
    res.send("Filme adicionado com sucesso!");
});

// Editar dados
app.put("/edit/:id", async (req, res) => {
    const filmId = req.params.id;
    const updatedFilm = {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    };

    await Film.findByIdAndUpdate(filmId, updatedFilm);
    res.send("Filme atualizado com sucesso!");
});

// Excluir dados
app.delete("/delete/:id", async (req, res) => {
    const filmId = req.params.id;
    await Film.findByIdAndDelete(filmId);
    res.send("Filme excluído com sucesso!");
});

// Consultar registro individualmente
app.get("/film/:id", async (req, res) => {
    const filmId = req.params.id;
    const film = await Film.findById(filmId);
    res.send(film);
});

// Consultar um grupo de registros
app.get("/films", async (req, res) => {
    const films = await Film.find();
    res.send(films);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

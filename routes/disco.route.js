const express = require('express');
const app = express();
const discoRoutes = express.Router();

let Disco = require('../model/Disco');


// api para adicionar disco
discoRoutes.route('/add').post(function (req, res){
    let disco = new Disco(req.body);
    disco.save()
        .then(disco => {
            res.status(200).json({ 'status': 'Sucesso', 'mssg': 'Disco adicionado com sucesso!' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'Erro', 'mssg': 'Disco não foi salvo!' });
        });
});

// api para consultar discos
discoRoutes.route('/').get(function (req, res){
    Disco.find(function (err, discos) {
        if (err) {
            res.status(400).send({ 'status': 'Erro', 'mssg': 'Algo falhou na consulta!' });
        }
        else {
            res.status(200).json({ 'status': 'Sucesso', 'discos': discos });
        }
    });
});

// api para consultar um disco específico
discoRoutes.route('/disco/:id').get(function (req, res) {
    let id = req.params.id;
    Disco.findById(id, function (err, disco) {
        if (err) {
            res.status(400).send({ 'status': 'Erro', 'mssg': 'Algo falhou na consulta!' });
        }
        else {
            res.status(200).json({ 'status': 'Sucesso', 'disco': disco });
        }
    });
});

// api para atualizar um disco específico
discoRoutes.route('/update/:id').put(function (req, res) {
    Disco.findById(req.params.id, function (err, disco) {
      if (!carro) {
        res.status(400).send({ 'status': 'Erro', 'mssg': 'Disco não localizado!' });
        } else {
            disco.artista = req.body.artista;
            disco.nomeDisco = req.body.nomeDisco;
            disco.ano = req.body.ano;

            disco.save().then(disco => {
                res.status(200).json({ 'status': 'Sucesso', 'mssg': 'Disco atualizado!' });
            })
        }
    })
});

// api para deletar um disco específico
discoRoutes.route('/delete/:id').delete(function (req, res) {
    Disco.findByIdAndRemove({ _id: req.params.id }, function (err,) {
        if (err) {
            res.status(400).send({ 'status': 'Erro', 'mssg': 'Algo saiu errado!' });
        }
        else {
            res.status(200).json({ 'status': 'Sucesso', 'mssg': 'Disco deletado com sucesso!' });
        }
    });
});

module.exports = discoRoutes;
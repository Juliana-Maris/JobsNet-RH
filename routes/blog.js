const async = require("async");
const express = require("express");
const helpers = require("../helpers");
const models = require("../models");
const sequelize = require("sequelize");
const slugify = require("slugify");
const Promise = require("bluebird");

const router = express.Router();

// Render the home page and list all blog posts
router.get("/", (req, res) => {
  models.Post.findAll({
    order: sequelize.literal("createdAt DESC")
  }).then(posts => {
    let postData = [];

    async.eachSeries(posts, (post, callback) => {
      post = post.get({ plain: true });
        postData.push({
          title: post.title,
          cargo: post.cargo,
          nome: post.nome,
          cpf: post.cpf,
          ident: post.ident,
          nasc: post.nasc,
          civil: post.civil,
          sexo: post.sexo,
          cep: post.cep,
          rua: post.rua,
          bairro: post.bairro,
          cidade: post.cidade,
          estado: post.estado,
          telefone: post.telefone,
          celular: post.celular,
          email: post.email,
          veiculo: post.veiculo,
          habilitacao: post.habilitacao,

          //body: post.body,
          createdAt: post.createdAt,
          slug: post.slug
        });
        callback();
    }, err => {
      return res.render("index", { posts: postData });
    });
  });
});

// Render the user dashboard
router.get("/dashboard", (req, res, next) => {
  models.Post.findAll({
    order: sequelize.literal("createdAt DESC")
  }).then(posts => {
    let postData = [];

    posts.forEach(post => {
      postData.push(post.get({ plain: true }));
    });

    return res.render("dashboard", { posts: postData });
  });
});

// Create a new post
router.post("/dashboard", (req, res, next) => {
  models.Post.create({
    title: req.body.title,
    cargo: req.body.cargo,
    nome: req.body.nome,
    cpf: req.body.cpf,
    ident: req.body.ident,
    nasc: req.body.nasc,
    civil: req.body.civil,
    sexo: req.body.sexo,
    cep: req.body.cep,
    rua: req.body.rua,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    estado: req.body.estado,
    telefone: req.body.telefone,
    celular: req.body.celular,
    email: req.body.email,
    veiculo: req.body.veiculo,
    habilitacao: req.body.habilitacao,

    // body: req.body.body,
    slug: slugify(req.body.title).toLowerCase()
  }).then(newPost => {
    models.Post.findAll({
      order: sequelize.literal("createdAt DESC")
    }).then(posts => {
      let postData = [];

      posts.forEach(post => {
        postData.push(post.get({ plain: true }));
      });

      res.render("dashboard", { post: newPost, posts: postData });
    });
  });
});

// View a post
router.get("/:slug", (req, res, next) => {
  models.Post.findOne({
    where: {
      slug: req.params.slug
    }
  }).then(post => {
    if (!post) {
      return res.render("error", {
        message: "Page not found.",
        error: {
          status: 404,
        }
      });
    }

    post = post.get({ plain: true });
    res.render("post", { post });
  });
});

module.exports = router;

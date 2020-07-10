const express = require("express");
const db = require("../data/helpers/projectModel");
const { count } = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
    db.get()
        .then(projects => {
            res.status(200).json({ projects });
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching projects." });
        })
});

router.get("/:id", (req, res) => {
    db.get(req.params.id)
        .then(project => {
            res.status(200).json({ project });
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching projects." });
        })
});

router.post("/", (req,res) => {
    if ( req.body.name && req.body.description ) {
        db.insert(req.body)
            .then(newPost => {
                res.status(201).json({ newPost })
            })
            .catch(error => {
                res.status(500).json({ message: "Error posting new post." });
            })
    } else {
        res.status(400).json({ message: "Make sure the name and description fields are entered!" });
    }
});

router.put("/:id", (req, res) => {
    if ( req.body.name && req.body.description ) {
        db.update(req.params.id, req.body)
            .then(updatedPost => {
                res.status(201).json({ updatedPost })
            })
            .catch(error => {
                res.status(500).json({ message: "Error updating post." });
            })
    } else {
        res.status(400).json({ message: "Make sure the name and description fields are entered!" });
    }
});

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            res.status(200).json({ message: `${count} project has been deleted.` });
        })
        .catch(error => {
            res.status(500).json({ message: "Error deleting project." });
        })
})

module.exports = router;
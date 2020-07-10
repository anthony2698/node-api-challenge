const express = require("express");
const db = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
    db.get()
        .then(actions => {
            res.status(200).json({ actions });
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching actions." });
        })
});

router.get("/:id", (req, res) => {
    db.get(req.params.id)
        .then(action => {
            res.status(200).json({ action });
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching action." });
        })
});

router.post("/", (req,res) => {
    if ( req.body.notes && req.body.description && req.body.project_id ) {
        db.insert(req.body)
            .then(newAction => {
                res.status(201).json({ newAction })
            })
            .catch(error => {
                res.status(500).json({ message: "Error posting new action." });
            })
    } else {
        res.status(400).json({ message: "Make sure the notes, project_id and description fields are entered!" });
    }
});

router.put("/:id", (req, res) => {
    if ( req.body.notes && req.body.description && req.body.project_id ) {
        db.update(req.params.id, req.body)
            .then(updatedAction => {
                res.status(201).json({ updatedAction })
            })
            .catch(error => {
                res.status(500).json({ message: "Error updating action." });
            })
    } else {
        res.status(400).json({ message: "Make sure the notes, project_id and description fields are entered!" });
    }
});

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            res.status(200).json({ message: `${count} action has been deleted.` });
        })
        .catch(error => {
            res.status(500).json({ message: "Error deleting action." });
        })
});

module.exports = router;
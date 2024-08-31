import {Router} from "express";

const itemRoute: Router = Router();

// Archive-Item routes of various archives (multiple use-cases)
itemRoute.get("/:archiveSlug", (req, res) => res.send("Get all items of an archive"));
itemRoute.post("/:archiveSlug", (req, res) => res.send("Create an item in an archive"));
itemRoute.get("/:archiveSlug/:itemSlug", (req, res) => res.send("Get an item"));
itemRoute.put("/:archiveSlug/:itemSlug", (req, res) => res.send("Update an item"));
itemRoute.delete("/:archiveSlug/:itemSlug", (req, res) => res.send("Delete an item"));
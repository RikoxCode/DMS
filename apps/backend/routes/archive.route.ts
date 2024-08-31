import {Router} from "express";

const archiveRoute: Router = Router();

// Archive routes of various archives (multiple use-cases)
archiveRoute.get("/", (req, res) => res.send("Get all archives"));
archiveRoute.post("/", (req, res) => res.send("Create an archive"));
archiveRoute.get("/:archiveSlug", (req, res) => res.send("Get an archive"));
archiveRoute.put("/:archiveSlug", (req, res) => res.send("Update an archive"));
archiveRoute.delete("/:archiveSlug", (req, res) => res.send("Delete an archive"));
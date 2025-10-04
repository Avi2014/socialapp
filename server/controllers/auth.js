import { db } from "../connect.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  //step 1: check user if exists

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //step 2: create a user, first hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const q =
      "INSERT INTO users(`username`,`email`,`password`,`name`) VALUE (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });

  //step 3: hash the password using bcrypt
  // step 4: generate a jwt token
  // step 5: send the jwt token in a http-only cookie
};

export const login = (req, res) => {};

export const logout = (req, res) => {};

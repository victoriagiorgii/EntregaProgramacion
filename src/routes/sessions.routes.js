import { Router } from "express";
//import passport from "passport";
import { usersService } from "../percistencia/index.js";

const router = Router();

//sign up
router.post("/signUp", async (req, res) => {
  try {
    const userInfo = req.body;
    const result = await usersService.addUser(userInfo);
    if (result) {
      res.render("logIn", {
        message: "Registrado con exito",
        style: "logIn.css",
      });
    }
  } catch (error) {
    res.render("signUp", { error: "error registro del usuario"});
  }
});

//log in
router.post("/login", async (req, res) => {
  try {
    const loginForm = req.body;
    //corroborar si el user existe
    const user = await usersService.getUser({ email: loginForm.email });
    if (!user) {
      return res.render("Login", {
        error: "Usuario no definido",
      });
    }
    //corroborar contraseña
    if (user.password !== loginForm.password) {
      return res.render("logIn", {
        error: "credencial incorrecta",
      });
    }
    //info ok
    req.session.email = user.email;
    const userName = user.name;
    res.redirect("/index", 200, { userName });
  } catch (error) {
    res.render("logIn", { error: "login error" });
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error)
        return res.render("profile", {
          error: "logout error",
        });
    });
    res.redirect("/", 200, { style: "logIn.css" });
  } catch (error) {
    res.render("profile", { error: "logout error" });
  }
});

export { router as sessionsRouter };
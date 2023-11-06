import { Router } from "express";
//import passport from "passport";
import { usersService } from "../percistencia/index.js";

const router = Router();

//sign up
router.post("/singUp", async (req, res) => {
  try {
    const userInfo = req.body;
    const result = await usersService.addUser(userInfo);
    if (result) {
      res.render("Login", {
        message: "Registrado con exito",
      });
    }
  } catch (error) {
    res.render("singUp", { error: "error registro del usuario"});
  }
});

//log in
router.post("/Login", async (req, res) => {
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
      return res.render("Login", {
        error: "credencial incorrecta",
      });
    }
    //info ok
    req.session.email = user.email;
    const userEmail = user.name;
    res.redirect("/profile", 200, { userEmail });
  } catch (error) {
    res.render("Login", { error: "login error" });
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
    res.redirect("/", 200,{});
  } catch (error) {
    res.render("profile", { error: "logout error" });
  }
});

export { router as sessionsRouter };
import { Router } from "express";
import { usersService } from "../percistencia/index.js";
import passport from "passport";
import { generateToken } from "../utils.js";
import { config } from "../config/config.js";

const router = Router();

//sign up
router.post("/singUp",passport.authenticate ("singUpLocalStrategy",{ session:false, failureRedirect:"api/sessions/fail-singUp",
}), async(req,res)=> {
  //try {
   // const userInfo = req.body;
   // const result = await usersService.addUser(userInfo);
   // if (result) {
      res.render("login", {
        message: "Registrado con exito",
      });
    }
);
router.get("fail-singUp", (req,res)=>{
  res.render("singUp", {
    error:"error creacion de usuario",
    
  });
});

//} catch (error) {
  //res.render("singUp", { error: "error registro del usuario"});
//}



//sign up with github
router.get("/singUp-github", passport.authenticate("singUpGithubStrategy"));
router.get(
  config.github.callbackUrl,
  passport.authenticate("singUpGithubStrategy", {
    session: false,
    failureRedirect: "/api/sessions/fail-singUp",
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.cookie("cookieToken", token).render("profile", {});
  }
);



//log in
router.post("/login", passport.authenticate("loginLocalStrategy",{
  session:false,
  failureRedirect:"/api/sessions/fail-login",
}), async (req, res) => {
   
    //const loginForm = req.body;
    //corroborar si el user existe
    //const user = await usersService.getUser({ email: loginForm.email });
   // if (!user) {
  const token = generateToken(req.user)
  res
  .cookie("cookieToken", token)
  .json({ status: "success", message: "login successfully" });
}
);

router.get("/fail-login", (req, res) => {
res.render("login", {
error: "login error",
});
});

//log in up with github
router.get("/login-github", passport.authenticate("loginGithubStrategy"));
router.get(
  config.github.callbackUrl,
  passport.authenticate("loginGithubStrategy", {
    session: false,
    failureRedirect: "/api/sessions/fail-login",
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res
      .cookie("cookieToken", token)
      .redirect("/profile", 200, {});
  }
);
  

//profile
router.post("/profile", passport.authenticate("jwtAuth", {
    session: false,
    failureRedirect: "/api/sessions/fail-auth",
  }),
  async (req, res) => {
    try {
      res.json({ status: "success", message: "valid request", data: req.user });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/fail-auth", (req, res) => {
  res.json({ status: "error", message: "token invalido" });
});

  
  
  

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("cookieToken");
    res.redirect("/");
  } catch (error) {
    res.render("profile", { error: "logout error"});
  }
});

export { router as sessionsRouter };
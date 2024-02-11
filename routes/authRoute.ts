import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}
const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  const errorMsg =  req.session.messages?.[req.session.messages.length - 1];
  res.render("login" , { errorMsg });
  //res.render('login')
  //Property 'messages' does not exist on type 'Session & Partial<SessionData>'
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true
    
    /* FIX ME: 😭 failureMsg needed when login fails */
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;

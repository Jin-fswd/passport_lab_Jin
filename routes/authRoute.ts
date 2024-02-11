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
//----------------------------github login-------------
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));


router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // 성공적인 인증 후 HTML 응답을 전송
    res.send(`
      <script>
        window.opener.postMessage('loginSuccess', '*');
        window.close();
      </script>
    `);
  }
);
/*
router.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/login' }),
  function(req, res) {
    // 성공적인 인증 후 사용자를 리디렉션할 경로
    res.redirect('/dashboard');
  }
);
*/


//-----------------------------------------------------
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;

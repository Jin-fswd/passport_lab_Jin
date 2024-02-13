import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { SessionData } from "express-session";
router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/dashboard/revoke/:key",(req, res) => {
  console.log("revoke");
  const key = req.params.key
  console.log(key);
  
  req.sessionStore.destroy(key);
  res.redirect("/auth/login");
})

router.get("/admin", ensureAuthenticated, (req, res) => {
  const user = req.user;
  console.log(user);

  if(req.sessionStore.all === undefined) {
    throw new Error("this can not be hanppens! lol");
  } else {
    req.sessionStore.all((err, sessions:any) => {
      if(err) {
        console.error("세션조회중 에러발생", err)
      } else if(sessions != null) {
        const data:any = [];
        const sessionKeys = Object.keys(sessions);
        sessionKeys.forEach(key => {
          const sessionData = sessions[key];
          const userData = {
            userid:sessionData["passport"].user,
            sessionkey:key
          }
          data.push(userData);
        })
        
        res.render("admin", { userInfo:req.user, datas: data });
      }
    })
  }

});
export default router;

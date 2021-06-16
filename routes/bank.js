var express = require('express');
var router = express.Router();
var pool = require("./pool")


/* GET create user page. */
router.get('/createuser', function (req, res, next) {
  res.render('createuser', { status: null });
});

/* GET create Home page. */
router.get('/home', function (req, res, next) {
  res.render('home', { status: null });
});


router.get('/insertrecord', function (req, res) {


  pool.query("insert into users(name,email,balance)values(?,?,?)", [req.query.name, req.query.email, req.query.balance], function (error, result) {
    if (error) {
      console.log("ERROR:", error)
      res.render("createuser", { status: false })
    }
    else {
      res.render("createuser", { status: true })
    }



  })


})
router.get('/displayall', function (req, res, next) {
  pool.query("select * from users", function (error, result) {

    if (error) { res.render('displayusers', { data: [] }); }
    else {
      res.render('displayusers', { data: result });

    }
  })


});

router.get('/thistory', function (req, res, next) {
  pool.query("select * from historyy", function (error, result) {

    if (error) { res.render('thistory', { data: [] }); }
    else {
      res.render('thistory', { data: result });

    }
  })


});



var sqlq = "select * from users  where userid = ? ; select * from users  where userid <> ?";
router.get('/displaybyid', function (req, res, next) {
  pool.query(sqlq, [req.query.userid, req.query.userid], function (error, result) {

    if (error) {
      console.log("RETT:", error)
      res.render('transferpage', { user : [], users: [] });
    }
    else {
    
      res.render('transferpage', { user: result[0], users: result[1]});

    }
  })


});



router.get('/updaterecord', function (req, res, next) {
  var send = parseInt(req.query.ubalance) - parseInt(req.query.tamount)
  var get = parseInt(req.query.tbalance) + parseInt(req.query.tamount)
  var to_id = (req.query.to)
  var ub=parseInt(req.query.ubalance)
  var so=parseInt(req.query.tamount)
  var today = new Date();
  var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + " & " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var qsql = ("update users set  balance=? where userid=? ; update users set  balance=? where userid=? ; insert into historyy(fromm,too,amount,date)values(?,?,?,?)")
 if(ub<so)
 {
  res.render("result",{msg:"",msgg:"Insufficient Balance"})
 }
 else if(so<1)
 {
  res.render("result",{msgg:"INVALID AMOUNT!!! Must be greater than zero",msg:""})
 }
 
        else{
          pool.query(qsql, [send, req.query.uid, get, to_id, req.query.uname, req.query.tname, req.query.tamount, date], function (error, result) {
            if (error) {
              console.log(error)
              res.render("result",{msgg:"SERVER ERROR!!!",msg:""})
            }
            else {
              res.render("result",{msg:"TRANSACTION SUCCESSFUL",msgg:""})
            }



          })
          }

});

router.get("/fetchname", function (req, res, next) {

  pool.query("select * from users where userid=?", [req.query.userid], function (error, result) {
    if (error) {
      res.status(500).json([])

    }
    else {
      res.status(200).json(result)

    }


  })

});



module.exports = router
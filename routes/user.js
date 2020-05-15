const express = require('express');
const router = express.Router();
const user = require('../models/User');
const patDetails = require('../models/doctor');
var mongoose = require('mongoose');
const Login = mongoose.model('user');
const docData =mongoose.model('patDetails',
{medicine: {
    type: String,
},
patientname: {
    type:String,
},
pathistory: {
    type: String,
},
}
);
const db=require('../models/db')


const collection = {
        //want=true
        login: "doctorlogin",
        plogin: "login"

    }
    //register hande

router.get('/login', (req, res) => {
    res.render('login', {})
});


function insertRecord(req,res) {
    var login=new Login();
    login.name = req.body.nameps;
    login.username = req.body.usernameps;
    login.address = req.body.addressps;
    login.phone = req.body.phoneps;
    login.password = req.body.Passwordps;
    login.password2 = req.body.Password2ps;
       
    login.save((err,doc) => {
        if(!err) {
            console.log('sign up succesfull');
            res.render('patient',{})
        }
            else {
            console.log('error during record insertion');
            }
    });                                   
}
function insertPatDetails(req,res) {
    var patDetail=new docData()
    const nameOfMed=req.body.nameOfMed;
    const numberOfMed=req.body.numberOfMed;
    const NuberOfMedDay=req.body.NuberOfMedDay;
    patDetail.pathistory=req.body.patHistory;
    var medDetails=`${nameOfMed}:${numberOfMed}:${NuberOfMedDay}`;
    patDetail.medicine=medDetails;
    patDetail.save((err,doc) => {
        if(!err) {
            console.log('succeswful');
        } else {
            console.log('error during insertion')
        }
    })

}




router.post('/login',(req,res,next) => {
    
    
    const name = req.body.nameps;
    const username = req.body.usernameps;
    const address = req.body.addressps;
    const phone = req.body.phoneps;
    const password = req.body.Passwordps;
    const password2 = req.body.Password2ps;
    const namepl = req.body.namepl;
    const passwordpl = req.body.Passwordpl;
    const namedl = req.body.Namedl;
    const passowrddl = req.body.Passworddl;


    let error = [];

    var data = {
        "name": name,
        "username": username,
        "address": address,
        "phone": phone,
        "password": password,
        "password2": password2
        

    }

    var logindata = {
        "namepl": namepl,
        "passwordpl": passwordpl
        
    }

    var doctorData = {
        "namedl":namedl,
        "passowrddl":passowrddl
    } 


    if ( username || address || name || phone || password || password2 ) {
        insertRecord(req,res);
    } else {
        if (namepl || passwordpl ) {
            
            
            Login.findOne({ username:logindata.namepl, password:logindata.passwordpl}, function(err, user) {
                if(err) {
                    console.log(err);
                    return res.status(500).send();
                }

                if(!user) {
                    
                    console.log('user not found');
                    res.render('login')
                } else {
                    res.render('patient',{patientName:`Patient: ${logindata.namepl}`});
                }

                
            })
            
            } else {

                if (namedl || passowrddl ) {
                
                Login.findOne({ username:doctorData.namedl, password:doctorData.passowrddl}, function(err, user) {
                    if(err) {
                        console.log(err)

                    }

                    if(!user) {
                        console.log('doctor credintials not found')
                        res.render('login');
                    } else {
                        res.redirect('/user/doctor');
                    }
                })
                }
        }
    }
    

})


router.get('/doctor', (req, res) => {
    res.render('doctor', {})
});


router.post('/doctor',(req,res,next) => {
    // const patDetail=req.body;
    // const nameOfMed=req.body.nameOfMed;
    // const numberOfMed=req.body.numberOfMed;
    // const patHistory=req.body.patHistory;
    // console.log(patDetail);
    insertPatDetails(req,res);
});





module.exports = router;






























//sign up for patient

// router.post('/login', (req, res, next) => {
//     // console.log(req.body);
//     const name = req.body.nameps;
//     const username = req.body.usernameps;
//     const address = req.body.addressps;
//     const phone = req.body.phoneps;
//     const password = req.body.Passwordps;
//     const password2 = req.body.Password2ps;
//     const namepl = req.body.namepl;
//     const passwordpl = req.body.Passwordpl;
//     const namedl = req.body.Namedl;
//     const passowrddl = req.body.Passworddl;


//     let error = [];

//     var data = {
//         "name": name,
//         "username": username,
//         "address": address,
//         "phone": phone,
//         "password": password,
//         "password2": password2,
//         "namepl": namepl,
//         "passwordpl": passwordpl,
//         "namedl": namedl,
//         "passworddl": passowrddl

//     }
//     if (!username || !address || !phone || !password || !password2 || !namedl || !passowrddl) {

//         db.getDB().collection(collection.plogin).find({ username: data.namepl }).toArray().then((doc) => {
//             if (doc == []) {
//                 res.send('user not found');
//             } else {
//                 res.render('patient',{})
                
//             }
//         })

//     } else {
//         if (!namedl || !passowrddl) {

//             db.getDB().collection(collection.plogin).find({ username: data.username }).toArray((err, doc) => {
//                 db.getDB().collection(collection.plogin).insertOne(data, (err, result) => {
//                     if (err) {
//                         const error = new error("failed");
//                         next(error);
//                     } else {
//                         console.log("success");
//                         res.jsonp({ success: false });
//                         next();
//                     }
//                 });
//             });

//         } else {

//             db.getDB().collection(collection.login).find({ username: data.namedl }).toArray().then((doc) => {
//                 if (doc == []) {rud operations nodejs
//                     res.send('user not found');
//                 } else {
//                     res.json({ success: false1 });
//                 }
//             })

//         }
//     }
// });



// module.exports = router;
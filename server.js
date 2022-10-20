const express = require("express");
const app = express();
const admin = require("firebase-admin");
const { env } = require("process");
const credentials = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/create',async(req,res) =>{
    try{
        console.log(req.body);
        const id = req.body.email;
        const userJson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        const response = await db.collection("users").doc(id).set(userJSON);
        res.send(response);

    }catch(error){
        res.send(error);
    }
})
const db = admin.firestore();
app.get('/read/all',async(req,res) => {
    try{
        const usersRef = db.collection("users").doc(req.params.id);
        const response = await usersRef.get();
        console.log(req.body);
        let responseArr = [];
        response.forEach(doc=> {
            responseArr.push(doc.data());
        });
        res.send(responseArr);  
     } catch(error){
        res.send(error);
     }
    
});
app.post('/update',async(req,res) => {
try{
    const id = req.body.id;
    const newFirstName = "hello world";
    const usersRef = db.collection("users").doc(id);
    const response = await usersRef.get();
    //.update({
      //  firstName :newFirstName


   res.send(response);
} catch(error){
    res.send(error);
}
});
app.delete('/delete/:id',async(req,res) =>{
    try{
        const response = await db.collection("users").do(req.params.id).delete();
        res.send(response);
    } catch(error){

        res.send(error);
    }
})

const port = process.env.port || 4040;
app.listen(port, () => console.log(`Server has started on port: ${port}`));
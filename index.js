const express = require('express');
const app = express();
const nodeMon = require('nodemon');
const fs = require('fs');
const bodyParse = require('body-parser');
app.use(express.json());

// The API should have endpoints for `GET,` `POST,` `PUT,` and `DELETE`
//  requests to manage data in the mock database.

const port = 3000;




// get users from json file
app.get('/user',(req, res) => {
    fs.readFile('/Users/ricardofeliz/Desktop/Node Async/data.json','utf8',(err,data)=>{
        if(err) console.log(err);
        data = JSON.stringify(data);
        let renderdData = JSON.parse(data);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(renderdData);
   
    })

});




// //get json file


// create new user with post request
app.post('/users', (req, res) => {
    let jsonData =  fs.readFileSync('/Users/ricardofeliz/Desktop/Node Async/data.json');
   let data = JSON.parse(jsonData);
   let newUserData = {
       "id" :10,
       "name":'john',
       "lastNAME":'doe'
   }
   data.users.push(newUserData);
   
   res.send(200);
   
   
   
   let newDataJSON = JSON.stringify(data, null, 2)
   
   fs.writeFile('/Users/ricardofeliz/Desktop/Node Async/data.json',newDataJSON,err =>{
       if(err) throw err;
   
       console.log(`New data has been updated, Files added are: ${newDataJSON}`)
   
   
   })
   
   
   });




//put request to update user data

app.put('/users', (req, res) => {
    let updatedjsonData =  fs.readFileSync('/Users/ricardofeliz/Desktop/Node Async/data.json');
    let updatedata = JSON.parse(updatedjsonData);
    let updatedUserData = {
        "id" :10,
        "name":'john',
        "lastNAME":'doe',
        "Email": 'johndoe1234@gmail.com'
    }
    updatedata.users.push(updatedUserData);
    
    res.send(200);
    
    
    
    let updatedDataJSON = JSON.stringify(updatedata, null, 2)
    
    fs.writeFile('/Users/ricardofeliz/Desktop/Node Async/data.json',updatedDataJSON,err =>{
        if(err) throw err;
    
        console.log(`New data has been updated, Files added are: ${updatedDataJSON}`)
    
    
    })
    

});



//delete user data
app.delete('/users', (req, res) => {
    let deleteData = fs.readFileSync('/Users/ricardofeliz/Desktop/Node Async/data.json');
    let deletedJson 
    
    try{
        deletedJson = JSON.parse(deleteData)
    } catch{
       console.log('error parsing json file, try again')
    }

   
    if (deletedJson.hasOwnProperty('users') && Array.isArray(deletedJson.users)) {
    
        deletedJson.users.splice(4, 1);

        fs.writeFile('/Users/ricardofeliz/Desktop/Node Async/data.json', JSON.stringify(deletedJson, null, 2), err => {
            if (err) throw err;
            console.log(`User has been deleted. Updated data: ${JSON.stringify(deletedJson, null, 2)}`);
        });
    } else {
        console.log('Error: No users found in the JSON data.');
    }
});












app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
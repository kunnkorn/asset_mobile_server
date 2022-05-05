const express = require('express');
const { get } = require('express/lib/response');
const mysql = require('mysql');
const config = require('./dbconfig')
const con = mysql.createConnection(config);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.post('/getitem' , (req , res) => {
    const {inventorynumber} = req.body;

    const sql = 'SELECT item.Inventory_Number, item.Asset_Description, item.Location, item.Room, item.Status, item.Year, DATEDIFF(date_check.Date_end , CURRENT_DATE()) AS DATEDIFFS FROM item , date_check WHERE item.Inventory_Number = ? AND item.Year = YEAR(CURDATE()) AND date_check.Years = YEAR(CURDATE()) GROUP BY item.Year = YEAR(CURDATE());'
    con.query(sql , [inventorynumber] , function(err ,result){
        if(err){
            console.log(err)
            res.status(500).send('DB Error')
        }
        else{
            res.send(result)
        }
    });
});

app.post('/updateitem' , (req , res) => {
    const {location , room , inventorynum} = req.body;

    const sql = "UPDATE ITEM SET item.Email_Committee = 'aloha99@gmail.com', item.Location = ?, item.Room = ?, item.Status = 1, item.Date_scan = CURRENT_DATE WHERE item.Inventory_Number = ? AND item.Year = YEAR(CURDATE())"
    con.query(sql , [location, room, inventorynum] , function (err, result) {
        if(err){
            console.log(err);
            res.status(500).send('DB Error')
        }
        else{
            res.send('Update Success');
        }
      });
});

app.get('/status' , (req , res) => {
    const sql = 'SELECT COUNT(item.Inventory_Number) AS Item_Status FROM item WHERE item.Year = YEAR(CURDATE()) GROUP BY item.Status;'
    con.query(sql , function(err ,result) {
        if(err){
            console.log(err)
            res.status(500).send('DB Error')
        }
        else{
            res.send(result);
        }
    })
})



PORT = 3000;
app.listen(PORT, function () { 
    console.log('Server start at PORT' + PORT);
 })
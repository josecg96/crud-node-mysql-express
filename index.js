const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"15617840jose",
    database:"proyecto"

});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const anios = req.body.anios;
    const cargo = req.body.cargo;

    db.query('INSERT INTO empleados(nombre, edad, pais, años, cargo) VALUES(?,?,?,?,?)',[nombre,edad,pais,anios,cargo],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.get("/empleados",(req,res)=>{
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.put("/update",(req,res)=>{    
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const anios = req.body.anios;
    const cargo = req.body.cargo;
    

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,años=?,cargo=? WHERE id=?',[nombre,edad,pais,anios,cargo,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{    
    const id = req.params.id;
    
    db.query('DELETE FROM empleados WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})

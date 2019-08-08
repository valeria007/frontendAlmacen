const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


const datas = require('./url/export');

router.get('/home', (req,res) => {
    res.render('home');
});
/*
<<<<<<<<<<<<<<<<>>>>>>>>>>>><<<<<>><<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<>>>>>>>><<<<<<<<<<<<<<<<<<<<<<
                Grupo de asignacion
<<<<<<<<<<<>>>>>>>>>>>>>>><<<<>><<<>>><<<><<<>><<<
<<<<<<<<<>>><<>>>>>>>>>>>>>>>>>>>>>>>><>>>>>>>>>><
*/
router.get('/volver', (req,res) => {
    oneGrupoAsig = null
    res.redirect('grupoAsig'); 
})

///estos serv son para añadir a la tabla o al modelo grupo Asignacion
router.get('/grupoAsig',(req, res) => {
    fetch('http://localhost:3500/api/asignacion')   
        .then(resp => resp.json())
        .then(resp =>{
            res.render('grupoAsig',{resp,oneGrupoAsig});
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

router.post('/grupoAsig', (req, res) => {
    var data = req.body
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3500/api/asignacion',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        if(data.success == false){
            res.send(data.message)
        }else{
            console.log(data)
            res.redirect('grupoAsig'); 
        }
    })
});

var oneGrupoAsig;
router.get('/GrupoAsigONLY/:id', (req,res) => {
    var id = req.params
    fetch('http://localhost:3500/api/GrupoAsigONLY/'+id.id)   
        .then(resp => resp.json())
        .then(resp =>{
            oneGrupoAsig = resp;
            res.redirect('/grupoAsig'); 
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

router.post('/updateGPA/:id', (req,res) =>{
    var data = req.body
    var id = req.params
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3500/api/GrupoAsigUPDATE/'+id.id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {      
      res.redirect('/GrupoAsigONLY/'+id.id);
    })

});
/*
<<<<<<<<<<<<<<<<>>>>>>>>>>>><<<<<>><<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<>>>>>>>><<<<<<<<<<<<<<<<<<<<<<
                Grupo de asignacion
<<<<<<<<<<<>>>>>>>>>>>>>>><<<<>><<<>>><<<><<<>><<<
<<<<<<<<<>>><<>>>>>>>>>>>>>>>>>>>>>>>><>>>>>>>>>><
*/
var url = "http://localhost:3500/api";

var dataGRUPOa;
router.get('/dataGrupoA',(req,res) =>{
    fetch('http://localhost:3500/api/asignacion')   
        .then(resp => resp.json())
        .then(resp =>{
            if(resp == ""){
                res.send("no hay datos en grupo designacion, añadir grupo designacion")
            }else{
                dataGRUPOa = resp;
                res.redirect('/medicamentos');
            }
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

//serv para renderisar la vista medicamento con datos de la tabla grupo asignacion
router.get('/medicamentos',(req, res) => {
    fetch('http://localhost:3500/api/medicamento')   
        .then(resp => resp.json())
        .then(resp =>{
            console.log(resp);
            if(dataGRUPOa == null){
                res.render('medicamentos',{dataGRUPOa,resp})
            }else{
                res.render('medicamentos',{
                    dataGRUPOa,
                    resp
                })  
            }
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
  });

//servcio para añadir a la tabla medicamentos
router.post('/medicamentos', (req,res) =>{
    var data = req.body
    var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3500/api/medicamento',esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    res.redirect('/dataGrupoA');
  })
});

//serv para mostrar un solo medicamento
router.get('/OnlyMedicamento/:id',(req, res) =>{
    var id = req.params;
    fetch('http://localhost:3500/api/OnlyMedicamento/'+id.id)   
        .then(resp => resp.json())
        .then(resp =>{
            res.render('medicamentoUPDATE',{
                resp,
                dataGRUPOa
            });
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

router.post('/updateMedicamento/:id', (req,res) =>{
    var id = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url+'/updateMedicamento/'+id.id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.redirect('/dataGrupoA');
    })

});

module.exports = router;
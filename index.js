console.log("HOLA MUNDO 2");
const apiKey = 'AIzaSyDRrBhWrhu_-UtAnLryE0SbZloeaunjy5I';
const projectId = 'booksharing-613bf';
const collection = 'usuario';

firebase.initializeApp({
    apiKey,
    projectId
});

var db = firebase.firestore();

getUsers = () => {
    db.collection(collection).get().then((response) => {
        response.forEach((doc) => {
            console.log(doc.id);
            console.log(doc.data());
        });
    });
}

getUsers();

//////////////////////////////////////////

addUser = () => {
    let nameValue = document.getElementById('nameInput').value
    let lastnameValue = document.getElementById('lastnameInput').value
    let emailValue = document.getElementById('emailInput').value
    let centerValue = document.getElementById('centerInput').value
    let ageValue = document.getElementById('ageInput').value
    let sexoValue = document.getElementById('sexoInput').value

  
    db.collection("usuario").add({
      name: nameValue,
      lastname: lastnameValue,
      email: emailValue,
      center: centerValue,
      age: parseInt(ageValue),
      sexo: sexoValue,
    })
    .then(function(response) {
        console.log("Document written with ID: ", response.id);
        getUsers()
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
///////////////////////////////
updateUser = (userId, name, lastname, email, center, age, sexo) => {
    db.collection('usuario').doc(userId).set({
        name: name,
        lastname: lastname,
        email: email,
        center: center,
        age: age,
        sexo: sexo,
        date: firebase.firestore.Timestamp.fromDate(new Date()),

    }, { merge: true })
    
}

updateUser('VD1VA6z9wdWCaDV7TZom','Enrique','Sanchez', 'sanchez@gmail.com','cucei', 32, 'Masculino');

//////////////////////////////////////////
removeSexo = (userId) => {
    const usuario = db.collection(collection).doc(userId)
    usuario.update({
        sexo: firebase.firestore.FieldValue.delete()
    })
}
/*removeSexo('yi3HkL0gCNTOxY19k3Iv');*/
//////////////////////////////
removeUser = (userId) => {
    db.collection('usuario').doc(userId).delete()
}
/*removeUser('yi3HkL0gCNTOxY19k3Iv');*/
///////////////////////////////////////////
let clickRemove = (event) => {
    removeUser(event.toElement.id)
    showUsers()
}

let removeChilds = (container) => {
    let child = container.lastChild
    while (child) {
        container.removeChild(child)
        child = container.lastChild
    }
}

let showUsers = () => {
    const container = document.getElementById("container")
    removeChilds(container)

    let table = document.createElement("table")
    table.setAttribute("class", "table table-dark")

    let headers = ["Nombre", "Apellido", "Edad"]

    let tr = document.createElement("tr");
    for (let i = 0; i < headers.length; i++) {
        let th = document.createElement("th")
        th.innerText = headers[i]
        tr.appendChild(th)
    }
    table.appendChild(tr)

    db.collection(collection).get().then((response) => {
        response.forEach((doc) => {

            let user = doc.data();
        
            let tr = document.createElement("tr");
            let name = document.createElement("td")
            name.innerText = user.name
            let lastname = document.createElement("td")
            lastname.innerText = user.lastname
            let age = document.createElement("td")
            age.innerText = user.age

            let contenedorBoton = document.createElement("td")
            let boton = document.createElement("button")
            boton.setAttribute("class", "remover")
            boton.setAttribute("id", doc.id)
            boton.innerText = "Eliminar"
            boton.addEventListener('click', clickRemove)
            contenedorBoton.appendChild(boton)
            
            tr.appendChild(name)
            tr.appendChild(lastname)
            tr.appendChild(age)

            tr.appendChild(contenedorBoton)
            
            table.appendChild(tr)
        });
    });

    container.appendChild(table)
}

document.addEventListener("DOMContentLoaded", showUsers)

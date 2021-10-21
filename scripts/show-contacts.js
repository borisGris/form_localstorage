let saved_contacts = JSON.parse(localStorage.getItem("contacts"));
let table_body = document.querySelector("table tbody");

if(saved_contacts != null) {
    if(saved_contacts.length > 0) {
        saved_contacts.forEach(element => {
            createElements(element);
        });
        
    } else {
        showMessage();
    }
    
} else {
    showMessage();
}

// monta tabela para mostrar usuarios
function createElements(e) {
            
    let table_data =   `
        <tr>
            <td>${e.cpf}</td>   
            <td>${e.name}</td>   
            <td>${e.tel}</td>   
            <td>${e.street}</td>   
            <td>${e.number}</td>   
            <td>${e.district}</td>   
            <td>${e.city}</td>   
        </tr>
    `;

    table_body.innerHTML += table_data;
}

// exibe mensagem
function showMessage() {

    let table = document.querySelector(".contacts-info");
    table.style.display = "none";
    let users_alert = `
        <div class="alert-message">
            <p>Nada para mostrar ainda.<a href="./index.html">Clique aqui</a> para cadastrar um novo contato.</p>
        </div>
    `;

    document.querySelector(".main-container").innerHTML += users_alert;
}
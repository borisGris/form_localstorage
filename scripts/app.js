let saved_contacts;
let contact;

// verificar o valor digitado no campo cpf
input_cpf.addEventListener("keyup", (e) => {

    if(isNaN(e.key)) {
        input_cpf.value = "";
    }

    if(input_cpf.value.length == 0) {
        clearFields();
        disabledRemoveButton();
    }

    if(input_cpf.value.length == 3) {
        input_cpf.value += ".";
    }

    if(input_cpf.value.length == 7) {
        input_cpf.value += ".";
    }

    if(input_cpf.value.length == 11) {
        input_cpf.value += "-";
    }

    if(input_cpf.value.length == 14) {
        enableFields();

        // verifica se existe ou não dados no localstorage
        if(verifyLocalStorageData()){
            if(verifyContact()) {
                displayContact(contact);
                enbaleSaveButton();
                enableRemoveButton();
            } else {
                clearFields();
                disabledRemoveButton();
                enbaleSaveButton();
            }
        } else {
            enbaleSaveButton();
        }

        input_name.focus();
    }
});

// verifica os localstorage por contatos
function verifyLocalStorageData() {
    
    if(JSON.parse(localStorage.getItem("contacts")) != null) {
        saved_contacts = JSON.parse(localStorage.getItem("contacts"));
        return true;
    } else {
        saved_contacts = [];
        return false;
    }
}

// verifica se contato já existe no localstorage
function verifyContact() {

    for (let i = 0; i < saved_contacts.length; i++) {
        if(saved_contacts[i].cpf == input_cpf.value) {
            contact = saved_contacts[i];
            return true;
        }  
    }

    return false;
}

// mostra o contato
function displayContact(contact) {
    input_name.value = contact.name,
    input_tel.value = contact.tel,
    input_street.value = contact.street,
    input_number.value = contact.number,
    input_district.value = contact.district,
    input_city.value = contact.city
}

// cadastra um novo contato
save_btn.addEventListener("click", (event) => {

    event.preventDefault();

    if(input_cpf.value == "" || input_name.value == "" || input_tel.value == "") {
        alert("CPF, nome e telefone são campos obrigatórios!");
    } else {
        if(saved_contacts.length < 1) {
            newContact();
        } else if(saved_contacts.length >= 1) {
            if(verifyContact()) {
                updateContact();
            } else {
                newContact();
            }
        }
    } 
});

function newContact() {

    saved_contacts.push(
        {
            cpf: input_cpf.value,
            name: input_name.value,
            tel: input_tel.value,
            street: input_street.value,
            number: input_number.value,
            district: input_district.value,
            city: input_city.value
        }
    );

    localStorage.setItem("contacts", JSON.stringify(saved_contacts));
    messageAlerts("Contato cadastrado com sucesso!");
}

// remove usuario
remove_btn.addEventListener("click", (event) => {

    event.preventDefault();
    if(confirm("Deseja realmente remover este contato?")) {
        removeContact();
    }
});

function removeContact() {

    for (let i = 0; i < saved_contacts.length; i++) {
        if(input_cpf.value == saved_contacts[i].cpf) {
            saved_contacts.splice([i], 1);
            localStorage.setItem("contacts", JSON.stringify(saved_contacts));
            messageAlerts("Contato removido com sucesso!");
            document.location.reload();
        }
    }
}

// atualiza contato já existente
function updateContact() {
    for (let i = 0; i < saved_contacts.length; i++) {
        if(input_cpf.value == saved_contacts[i].cpf) {
            saved_contacts[i].cpf = input_cpf.value;
            saved_contacts[i].name = input_name.value;
            saved_contacts[i].tel = input_tel.value;
            saved_contacts[i].street = input_street.value;
            saved_contacts[i].number = input_number.value;
            saved_contacts[i].district = input_district.value;
            saved_contacts[i].city = input_city.value;

            localStorage.setItem("contacts", JSON.stringify(saved_contacts));
            messageAlerts("Contato atualizado com sucesso!");
        }        
    }
}

// limpa os campos
function clearFields() {
    input_name.value = "";
    input_tel.value = "";
    input_street.value = "";
    input_number.value = "";
    input_district.value = "";
    input_city.value = "";
}

// habilita os campos
function enableFields() {
    input_name.disabled = false;
    input_tel.disabled = false;
    input_street.disabled = false;
    input_number.disabled = false;
    input_district.disabled = false;
    input_city.disabled = false;
}

// habilita botão de salvar cadastro
function enbaleSaveButton() {
    save_btn.disabled = false;
    save_btn.classList.add("allowed");
}

// habilita botão de remover cadastro
function enableRemoveButton() {
    remove_btn.disabled = false;
    remove_btn.classList.add("allowed");
}

// desabilita o botão de remover cadastro
function disabledRemoveButton() {
    remove_btn.disabled = true;
    remove_btn.classList.remove("allowed");
}

// mensagens do sistema
function messageAlerts(msg) {
    alert(msg);
    document.location.reload();
}
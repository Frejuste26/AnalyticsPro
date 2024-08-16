const formRow = document.getElementById('formrow');
const btnRow = document.getElementById('btnrow');

function AddRow() {
    const row = document.createElement('div');
    row.classList.add('row');

    const col1 = document.createElement('div');
    col1.classList.add('col-md-4');
    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.placeholder = 'Entrez le code du produit';
    col1.appendChild(input1);
    row.appendChild(col1);

    const col2 = document.createElement('div');
    col2.classList.add('col-md-2');
    const input2 = document.createElement('input');
    input2.type = 'number';
    input2.placeholder = 'Objectif';
    col2.appendChild(input2);
    row.appendChild(col2);

    const col3 = document.createElement('div');
    col3.classList.add('col-md-2');
    const input3 = document.createElement('input');
    input3.type = 'number';
    input3.placeholder = 'Resultat';
    col3.appendChild(input3);
    row.appendChild(col3);

    const col4 = document.createElement('div');
    col4.classList.add('col-md-4');
    const select = document.createElement('select');
    const option1 = document.createElement('option');
    option1.value = 'panne';
    option1.textContent = 'Panne';
    const option2 = document.createElement('option');
    option2.value = 'moo';
    option2.textContent = 'Moo';
    const option3 = document.createElement('option');
    option3.value = 'rupture';
    option3.textContent = 'Rupture';
    const option4 = document.createElement('option');
    option4.value = 'ras';
    option4.textContent = 'RAS';
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);
    col4.appendChild(select);
    row.appendChild(col4);
    formRow.appendChild(row);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.addEventListener('click', () => {
        row.remove();
    });
    btnRow.appendChild(deleteBtn);
    
    resetInputs();
    btnRow.removeChild(btnRow.lastChild);
    btnRow.appendChild(document.createElement('button'));
    btnRow.lastChild.textContent = 'Ajouter une ligne';
    btnRow.lastChild.addEventListener('click', AddRow);
    
    function resetInputs() {
        input1.value = '';
        input2.value = '';
        input3.value = '';
        select.value = 'panne';
    }
    
    return row;
}
"use strict";
const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const contactList = {};
alphabet.forEach(letter => {
    contactList[letter] = [];
});
const namesFirstLetter = [];
const alphabetMap = alphabet.map((letter) => `<div id="${letter}" class="contact-item"><p class="contact-item-letter">${letter}</p></div>`).join('');
const contactListElement = document.querySelector('.contact-list');
contactListElement.innerHTML = alphabetMap;
class ContactClass {
    constructor(name, vacancy, phone) {
        this.name = name;
        this.vacancy = vacancy;
        this.phone = phone;
    }
}
const form = document.forms.namedItem('form');
form.onsubmit = function (e) {
    e.preventDefault();
    const nameInput = form.querySelector('input[name="name"]');
    const vacancyInput = form.querySelector('input[name="vacancy"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    if (!nameInput || !vacancyInput || !phoneInput) {
        console.error('Form inputs not found');
        return;
    }
    const name = nameInput.value.trim();
    const vacancy = vacancyInput.value.trim();
    const phone = phoneInput.value.trim();
    const errorMessage = document.querySelector('.error');
    errorMessage.innerHTML = ''; // Очистка предыдущих сообщений об ошибках
    if (name === '' || vacancy === '' || phone === '') {
        errorMessage.innerHTML = 'Вы не ввели имя, вакансию или номер телефона';
        return; // Прекращаем выполнение функции, если есть ошибки
    }
    const firstLetter = name[0].toUpperCase();
    const nameExist = contactList[firstLetter].some(contact => contact.name === name);
    const phoneExist = contactList[firstLetter].some(contact => contact.phone === phone);
    if (nameExist) {
        errorMessage.innerHTML = 'Имя уже занято';
        return;
    }
    if (phoneExist) {
        errorMessage.innerHTML = 'Контакт с этим номером уже записан';
        return;
    }
    let contact = new ContactClass(name, vacancy, phone);
    contactList[firstLetter].push(contact);
    namesFirstLetter.push(firstLetter);
    const counts = {};
    namesFirstLetter.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    // const lastLetter = namesFirstLetter[namesFirstLetter.length - 1];
    const counterText = `${counts[firstLetter]}`;
    // Проверяем, есть ли уже элемент с количеством, и если нет, то создаем его
    const letterDiv = document.querySelector(`#${firstLetter}`);
    let counterElement = letterDiv.querySelector('.contact-item-number');
    if (counterElement) {
        counterElement.textContent = counterText;
    }
    else {
        counterElement = document.createElement('p');
        counterElement.className = 'contact-item-number';
        counterElement.textContent = counterText;
        letterDiv.appendChild(counterElement);
    }
    console.log(namesFirstLetter);
};
const allLetters = document.querySelector('.contact-list');
const handleClick = (e) => {
    const target = e.target;
    const letterDiv = target.closest('.contact-item');
    if (letterDiv && letterDiv.id) {
        if (!letterDiv.querySelector('.contact-details')) {
            const contacts = contactList[letterDiv.id];
            let contactDetails = '<div class="contact-details">';
            contacts.forEach(contact => {
                contactDetails += `<p>Name: ${contact.name}</p>`;
                contactDetails += `<p>Vacancy: ${contact.vacancy}</p>`;
                contactDetails += `<p>Phone: ${contact.phone}</p>`;
                contactDetails += '<hr>';
                contactDetails += `<button class='edit-btn'><img src="./assets/edit.svg"/></button>`;
            });
            contactDetails += '</div>';
            // Вставляем новый элемент в конец letterDiv, если его еще нет
            letterDiv.insertAdjacentHTML('beforeend', contactDetails);
        }
    }
    if (target.closest('.edit-btn')) {
        editContact(e);
    }
};
const editContact = (e) => {
    console.log('click');
};
allLetters.addEventListener('click', handleClick);
function clearContactList() {
    alphabet.forEach(letter => {
        contactList[letter] = [];
    });
    document.querySelectorAll('.contact-item-number, .contact-details').forEach(element => element.remove());
    namesFirstLetter.length = 0;
    console.log('Contact list cleared:', contactList);
}
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearContactList);
// const editButton = document.querySelector('.edit-btn') as HTMLButtonElement
// const editContact = (e: MouseEvent): void => {
//     console.log('click')
// }
// editButton?.addEventListener('click', editContact)

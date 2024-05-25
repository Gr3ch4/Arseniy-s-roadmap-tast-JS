const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

const contactList = []

const namesFirstLetter = []

const alphabetMap = alphabet.map((letter) => `<div id="${letter}" class="contact-item"><p class="contact-item-letter">${letter}</p></div>`).join('')

document.querySelector('.contact-list').innerHTML = alphabetMap

function Contact(name, vacancy, phone) {
    this.name = name
    this.vacancy = vacancy
    this.phone = phone
}
    
document.forms.form.onsubmit = function(e) {
    e.preventDefault()
    let name = this.name.value.trim()
    let vacancy = this.vacancy.value.trim()
    let phone = this.phone.value.trim()

    const errorMessage = document.querySelector('.error')
    errorMessage.innerHTML = '' // Очистка предыдущих сообщений об ошибках

    if(name === '' || vacancy === '' || phone === '') {
        errorMessage.innerHTML = 'Вы не ввели имя, вакансию или номер телефона'
        return // Прекращаем выполнение функции, если есть ошибки
    } 

    const nameExist = contactList.some(contact => contact.name === name)
    const phoneExist = contactList.some(contact => contact.phone === phone)

    if(nameExist) {
        errorMessage.innerHTML = 'Имя уже занято'
        return
    }
    if(phoneExist) {
        errorMessage.innerHTML = 'Контакт с этим номером уже записан'
        return
    }

    let contact = new Contact(name, vacancy, phone)
    contactList.push(contact)

    namesFirstLetter.push(contact.name[0])
    
    const counts = {}

    namesFirstLetter.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; })

    const lastLetter = namesFirstLetter[namesFirstLetter.length - 1];
    const counterText = `${counts[lastLetter]}`
    
    // Проверяем, есть ли уже элемент с количеством, и если нет, то создаем его
    const letterDiv = document.querySelector(`#${lastLetter}`);
    let counterElement = letterDiv.querySelector('.contact-item-number');
    
    if (counterElement) {
        counterElement.textContent = counterText;
    } else {
        counterElement = document.createElement('p');
        counterElement.className = 'contact-item-number';
        counterElement.textContent = counterText;
        letterDiv.appendChild(counterElement);
    }

    console.log(namesFirstLetter)
}

const allLetters = document.querySelector('.contact-list')

const handleClick = (e) => {
    // Ищем ближайший родительский элемент, который имеет атрибут id
    const letterDiv = e.target.closest('.contact-item');
    
    const insideLetter = document.querySelector(`#${letterDiv.id}`)

    if (letterDiv && letterDiv.id) {
        // Проверяем, существует ли уже элемент с классом 'contact-details'
        if (!letterDiv.querySelector('.contact-details')) {
            // Вставляем новый элемент в конец letterDiv, если его еще нет
            letterDiv.insertAdjacentHTML('beforeend', `<div class="contact-details">Подробный контакт</div>`);
        }
    }
}

allLetters.addEventListener('click', handleClick)

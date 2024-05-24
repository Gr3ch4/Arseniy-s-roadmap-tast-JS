const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

const contactList = []



const alphabetMap = alphabet.map((letter) => `<div class="contact-item">${letter}</div>`).join('')

document.querySelector('.contact-list').innerHTML = alphabetMap

function Contact(name, vacancy, phone) {
    this.name = name
    this.vacancy = vacancy
    this.phone = phone
}
    
document.forms.form.onsubmit = function(e) {
    e.preventDefault()
    let name = this.name.value
    let vacancy = this.vacancy.value
    let phone = this.phone.value

    let contact = new Contact(name, vacancy, phone)

    console.log(contact)

    contactList.push(contact)

    setTimeout(()=>{
        console.log(contactList)
    }, 2000)
}
class Contact {
    constructor(firstName, lastName, address, city, state, zipCode, phoneNo, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.phoneNo = phoneNo;
        this.email = email;
    }
    toString() {
        return `${this.firstName} ${this.lastName} from ${this.address} ${this.city} ${this.state}`;
    }
}
class AddressBook {
    constructor(name) {
        this.contacts = [];
        this.name = name;
    }
    addContact(firstName, lastName, address, city, state, zipCode, phoneNo, email) {
        for (const c of this.contacts) {
            if (c.firstName === firstName && c.lastName === lastName) {
                console.log("This is a duplicate contact");
                return false;
            }
        }
        const contact = new Contact(firstName, lastName, address, city, state, zipCode, phoneNo, email);
        this.contacts.push(contact);
        console.log("Contact added:", contact.toString());
        return contact;
    }
    showContacts() {
        console.log(`AddressBook '${this.name}' - total contacts: ${this.contacts.length}`);
        for (const c of this.contacts) {
            console.log(" -", c.toString());
        }
    }
    editContactPhone(firstName, lastName, newPhone) {
        for (const c of this.contacts) {
            if (c.firstName === firstName && c.lastName === lastName) {
                c.phoneNo = newPhone;
                console.log("Contact number updated:", c.toString());
                return true;
            }
        }
        console.log("Contact not found");
        return false;
    }
    deleteContact(firstName, lastName) {
        const index = this.contacts.findIndex(c => c.firstName === firstName && c.lastName === lastName);
        if (index !== -1) {
            console.log("Removed contact:", this.contacts[index].toString());
            this.contacts.splice(index, 1);
            return true;
        }
        console.log("Contact missing");
        return false;
    }
}
class AddressBookMgr {
    constructor() {
        this.books = new Map();
    }
    createBook(name) {
        if (this.books.has(name)) {
            console.log("The book with this name already exists");
            return null;
        }
        const book = new AddressBook(name);
        this.books.set(name, book);
        console.log("Book created:", name);
        return book;
    }
    deleteBook(name) {
        if (this.books.has(name)) {
            this.books.delete(name);
            console.log("AddressBook deleted:", name);
            return true;
        }
        console.log("No such AddressBook.");
        return false;
    }
    listBooks() {
        console.log("Available AddressBooks:");
        if (this.books.size === 0) {
            console.log("  (none)");
            return;
        }
        for (const name of this.books.keys()) {
            console.log("  -", name);
        }
    }
    getBook(name) {
        return this.books.get(name);
    }
    searchByCity(city) {
        const result = [];
        const key = city.toLowerCase();
        for (const book of this.books.values()) {
            for (const c of book.contacts) {
                if (c.city.toLowerCase() === key) {
                    result.push(c);
                }
            }
        }
        if (result.length === 0) {
            console.log("No contacts found in city:", city);
        }
        else {
            console.log(`Contacts in city '${city}':`);
            result.forEach(c => console.log(" -", c.toString()));
        }
        return result;
    }
    searchByState(state) {
        const result = [];
        const key = state.toLowerCase();
        for (const book of this.books.values()) {
            for (const c of book.contacts) {
                if (c.state.toLowerCase() === key) {
                    result.push(c);
                }
            }
        }
        if (result.length === 0) {
            console.log("No contacts found in state:", state);
        }
        else {
            console.log(`Contacts in state '${state}':`);
            result.forEach(c => console.log(" -", c.toString()));
        }
        return result;
    }
    countByCity(city) {
        let count = 0;
        const key = city.toLowerCase();
        for (const book of this.books.values()) {
            for (const c of book.contacts) {
                if (c.city.toLowerCase() === key) {
                    count++;
                }
            }
        }
        console.log(`Total contacts in city '${city}':`, count);
        return count;
    }
    countByState(state) {
        let count = 0;
        const key = state.toLowerCase();
        for (const book of this.books.values()) {
            for (const c of book.contacts) {
                if (c.state.toLowerCase() === key) {
                    count++;
                }
            }
        }
        console.log(`Total contacts in state '${state}':`, count);
        return count;
    }
}
/* ---------- DEMO ---------- */
const mgr = new AddressBookMgr();
const friends = mgr.createBook("Friends");
const work = mgr.createBook("Work");
friends?.addContact("pinku", "singh", "c/99", "chennai", "tamil nadu", "603203", "8328832570", "pinku@gmail.com");
friends?.addContact("pinku", "singh", "c/99", "chennai", "tamil nadu", "603203", "8328832570", "pinku@gmail.com");
work?.addContact("raja", "singh", "x/10", "pune", "maharashtra", "411001", "9999999999", "raja@work.com");
friends?.showContacts();
work?.showContacts();
friends?.editContactPhone("pinku", "singh", "6666666666");
friends?.showContacts();
work?.deleteContact("raja", "singh");
work?.showContacts();
mgr.searchByCity("chennai");
mgr.searchByState("tamil nadu");
mgr.countByCity("chennai");
mgr.countByState("tamil nadu");

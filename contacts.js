const fs = require("fs/promises");
const {nanoid} = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json")

const listContacts = async () => {
 const contacts = await fs.readFile(contactsPath, "utf-8");

 return JSON.parse(contacts);
}

const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
        return contact;
    }
    return null;
}

const addContact = async({name, email, phone}) => {
    const contacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact)
   await fs.writeFile(contactsPath, JSON.stringify(contacts))
   return newContact;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const contact = await getContactById(contactId);
    newList = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newList));
    return contact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};
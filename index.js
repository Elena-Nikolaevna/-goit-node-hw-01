const contactsOperations = require("./contacts");

//const {program} = require('commander')

const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();



async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contactList = await contactsOperations.listContacts();
            console.table(contactList);
            break;
        case "get":
            const searchContact = await contactsOperations.getContactById(id);
            console.table(searchContact)
            break;
        case "add":
            const newContact = await contactsOperations.addContact({ name, email, phone });
            console.table(newContact)
            break;
        case "remove":
            const removeContact = await contactsOperations.removeContact(id);
            console.table(removeContact);
            break;


        default:
            console.log('Unknovvn action')
    }
}

/* (async () => {
    await invokeAction(argv);
})(); */
invokeAction(argv);


/* invokeAction({action: 'getContactById', id: "5" }) */
/* invokeAction({action: 'add', name: "helen", email: "csdcsd@fdsfds", phone: "123456789" })  */
/* invokeAction({action: 'remove', id: "wqS2HtdQuo3wZiTx1gDr2", name: "cat"})  */
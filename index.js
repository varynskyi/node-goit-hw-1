const contactsPath = require("./contacts");
const argv = require('yargs').argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "getAll":
            const contacts = await contactsPath.getAll();
            console.table(contacts);
            break;
              
        case "getById":
            const contact = await contactsPath.getById(id);
            if (!contact) {
                throw new Error(`Contact with id=${id} not found`);
            }
            console.table(contact);
            break;
        
        case "addContact":
            const newContact = await contactsPath.add({ name, email, phone });
            console.table(newContact);
            break;
              
        case "updateById":
            const updateContact = await contactsPath.updateById(id, { name, email, phone });
            if (!updateContact) {
                throw new Error(`Contact with id=${id} not found`);
            }
            console.table(updateContact);
            break;
              
        case "removeById":
            const removeContact = await contactsPath.removeById(id);
            console.table(removeContact);
            break;
        
        default:
            console.log("Unknown action");
    }
}
    
invokeAction(argv);

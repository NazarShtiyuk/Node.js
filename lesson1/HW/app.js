const fs = require('fs');
const path = require('path');
const onlineUsers = [{name: 'Andriy', age: 20, city: 'Lviv'}, {name: 'Petya', age: 20, city: 'Lviv'}, {name: 'Nazar', age: 20, city: 'Lviv'}, {name: 'Vasya', age: 20, city: 'Lviv'}];
const inPersonUsers = [{name: 'Kriss', age: 18, city: 'Kyiv'}, {name: 'Jim', age: 18, city: 'Kyiv'}, {name: 'Jonh', age: 18, city: 'Kyiv'}];

fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, (err) => {
    if (err) {
        console.log(err);
    }
})

fs.mkdir(path.join(__dirname, 'main', 'inPerson'), {recursive: true},  (err) => {
    if (err) {
        console.log(err);
    }
})

fs.writeFile(path.join(__dirname, 'main', 'online', 'someFile.txt'), '', (err) => {
    if (err) {
        console.log(err);
    }
})

fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'someFile1.txt'), '', (err) => {
    if (err) {
        console.log(err);
    }
})

for (const user of onlineUsers) {
    fs.appendFile(path.join(__dirname, 'main', 'online', 'someFile.txt'), `NAME: ${user.name}\nAGE: ${user.age}\nCITY: ${user.city}\n\n`, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

for (const user of inPersonUsers) {
    fs.appendFile(path.join(__dirname, 'main', 'inPerson', 'someFile1.txt'), `NAME: ${user.name}\nAGE: ${user.age}\nCITY: ${user.city}\n\n`, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

const changeUsers = () => {
    fs.readFile(path.join(__dirname, 'main', 'online', 'someFile.txt'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        fs.appendFile(path.join(__dirname, 'main', 'inPerson', 'someFile1.txt'), `${data}`, {flag: 'w'},(err) => {
                if (err) {
                    console.log(err)
                }
            })
    })

    fs.readFile(path.join(__dirname, 'main', 'inPerson', 'someFile1.txt'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        fs.appendFile(path.join(__dirname, 'main', 'online', 'someFile.txt'), `${data}`, {flag: 'w'},(err) => {
                if (err) {
                    console.log(err)
                }
            })
    })
}

changeUsers()
const path = require('path')
const fs = require('fs')

// Завдання №1

// const pathTask1 = path.join(__dirname, 'task1', 'someFile.txt')
// fs.mkdir(path.join(__dirname, 'task1'), (err) => {
//     if (err) {
//         console.log(err)
//     }
//     fs.writeFile(pathTask1, 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...', (err) => {
//         if (err) {
//             console.log(err)
//         }
//         fs.readFile(pathTask1, 'utf-8', (err, data) => {
//             if (err) {
//                 console.log(err);
//             }
//             fs.writeFile(pathTask1, `${data}`, (err) => {
//                 if (err) {
//                     console.log(err);
//                 }
//             })
//         })
//     })
// })

//
// Завдання №2
//

// fs.mkdir(path.join(__dirname, 'task2'), (err) => {
//     if (err) {
//         console.log(err);
//     }
//     fs.writeFile(path.join(__dirname, 'task2', 'someFile.txt'), 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',(err) => {
//         if (err) {
//             console.log(err);
//         }
//         fs.readFile(path.join(__dirname, 'task2', 'someFile.txt'), 'utf-8', (err, data) => {
//             if (err) {
//                 console.log(err);
//             }
//             fs.mkdir(path.join(__dirname, 'task2', 'someDir'), (err) => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 fs.writeFile(path.join(__dirname, 'task2', 'someDir', 'someFile1.txt'), '', (err) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                     fs.appendFile(path.join(__dirname, 'task2', 'someDir', 'someFile1.txt'), `${data}`, (err) => {
//                         if (err) {
//                             console.log(err);
//                         }
//                         fs.unlink(path.join(__dirname, 'task2', 'someFile.txt'), (err) => {
//                             if (err) {
//                                 console.log(err);
//                             }
//                         })
//                     })
//                 })
//             })
//         })
//     })
// })

//
// Завдання №3
//

fs.mkdir(path.join(__dirname, 'task3'), (err) => {
    if (err) {
        console.log(err);
    }
    fs.mkdir(path.join(__dirname, 'task3', 'someDir1', 'someDir4'), {recursive: true}, (err) => {
        if (err) {
            console.log(err);
        }
        fs.writeFile(path.join(__dirname, 'task3', 'someDir1', 'someFile1.txt'), 'Hello World!!!', (err) => {
            if (err) {
                console.log(err);
            }
        })
    })

    fs.mkdir(path.join(__dirname, 'task3', 'someDir2', 'someDir3'), {recursive: true}, (err) => {
        if (err) {
            console.log(err);
        }
    })
})

// const reNameFiles = (directory) => {
//     fs.readdir(path.join(__dirname, 'task3', `${directory}`), (err, data) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(data);
//         for (let file of data) {
//             fs.stat(path.join(__dirname, 'task3', `${directory}`, `${file}`), ((err1, stats) => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 if (stats.isFile()) {
//                     fs.truncate(path.join(__dirname, 'task3', `${directory}`, `${file}`), (err) => {
//                         if (err) {
//                             console.log(err);
//                         }
//                     })
//                 } else if (stats.isDirectory()) {
//                     fs.rename(path.join(__dirname, 'task3', `${directory}`, `${file}`),
//                         path.join(__dirname, 'task3', `${directory}`, `new_${file}`), (err) => {
//                             if (err) {
//                                 console.log(err);
//                             }
//                         })
//                 }
//             }))
//         }
//
//     })
// }
//
// reNameFiles('someDir1');






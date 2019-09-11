var cron = require('node-cron');
var execa = require('execa');
var axios = require('axios');

function addTask(name, project, labels, due) {
    axios.post('http://localhost:8000', {
        name,
        project,
        labels,
        due
    })
    .then(data => console.log('Added: ' + name))
    .catch(err => console.error(err));
}

// m h DoM M DoW
cron.schedule('0 0 20 * *', () => { // every 20th of the month
    // Finance
    addTask('Pay Globe - 09176294439', 'Inbox', ['ThisWeek', 'Finance'], "26th");
    addTask('Pay Globe At Home Wifi', 'Inbox', ['ThisWeek', 'Finance'], "26th");
    addTask('Pay Credit Card', 'Inbox', ['ThisWeek', 'Finance'], "26th");
    addTask('Transfer 13K to EastWest', 'Inbox', ['ThisWeek', 'Finance'], "26th");

    // Personal
    addTask('Schedule A Date', 'Inbox', ['ThisWeek', 'With_Cristina'], '25th');
});

cron.schedule('0 0 10 * *', () => { // every 10th of the month
    // Finance
    addTask('Text St. Peter Agent', 'Inbox', ['ThisWeek', 'To_Tacloban', 'Finance'], "15th");
    addTask('Pay St. Peter', 'Inbox', ['ThisMonth', 'At_Peerless', 'Finance'], "16th");
});

cron.schedule('0 0 */2 * *', () => { //every 2 days
    // Home
    addTask('Check Weather', 'Inbox', ['Morning'], 'today');
    addTask('Take Trash', 'Inbox', ['To_VSU', 'Chore', 'Evening'], 'today');
});


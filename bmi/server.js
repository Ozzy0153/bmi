const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk').default;
const inquirer = require('inquirer').default;
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.post('/bmi', (req, res) => {
    const formData = req.body;
    try {
        const calculatedBMI = calculateBMI(formData);

        console.log(chalk.green('BMI Calculation Result:'));
        console.log(chalk.cyan('BMI:'), calculatedBMI.toFixed(2));

        inquirer.prompt([
            {
                type: 'list',
                name: 'feedback',
                message: 'How do you feel about this BMI result?',
                choices: ['Great!', 'Okay', 'Not happy'],
            },
        ]).then((answers) => {
            console.log(chalk.yellow('Feedback:'), answers.feedback);
            res.send({ bmi: calculatedBMI, feedback: answers.feedback });
        });
    } catch (error) {
        console.error(chalk.red('Error calculating BMI:'), error.message);
        res.status(500).send({ error: 'Error calculating BMI' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


function calculateBMI(formData) {

    return 50;
}

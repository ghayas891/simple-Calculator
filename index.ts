import inquirer from 'inquirer';
import chalk from 'chalk';

const add = (number1: number, number2: number): number => {
    return number1 + number2;
};

const subtract = (number1: number, number2: number): number => {
    return number1 - number2;
};

const multiply = (number1: number, number2: number): number => {
    return number1 * number2;
};

const divide = (number1: number, number2: number): number | string => {
    if (number2 === 0) {
        return "Cannot divide by zero";
    } else {
        return number1 / number2;
    }
};

async function main(): Promise<void> {
    let continueCalculation = true;
    do {
        const answers = await inquirer.prompt([
            {
                type: "number",
                name: "number1",
                message: "Please enter the first number:"
            },
            {
                type: "list",
                name: "operator",
                message: "Please select an operator:",
                choices: ["+", "-", "x", "/"]
            },
            {
                type: "number",
                name: "number2",
                message: "Please enter the second number:"
            }
        ]);

        const { number1, number2, operator } = answers;
        let result: number | string;

        switch (operator) {
            case "+":
                result = chalk.red(add(number1, number2));
                break;
            case "-":
                result = chalk.green(subtract(number1, number2));
                break;
            case "x":
                result = chalk.blue(multiply(number1, number2));
                break;
            case "/":
                result = chalk.yellow(divide(number1, number2));
                break;
            default:
                result = "Invalid operation";
        }

        console.log("Result: ", result);

        const confirm = await inquirer.prompt([
            {
                type: "confirm",
                name: "continue",
                message: "Do you want to continue?"
            }
        ]);

        continueCalculation = confirm.continue;
    } while (continueCalculation);
}

main().catch(error => console.error(error));

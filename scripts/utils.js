const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

function writeFile(filepath, content) {
	const header = '/* Auto-generated code. Do not modify manually */\r';
	fs.writeFile(filepath, header + content, function(err) {
		err ? console.log(chalk.red(err)) : console.log(chalk.green('Component data saved.'));
	});
}

function getDirectories(filepath) {
	return fs.readdirSync(filepath).filter(function(file) {
		const dir = path.join(filepath, file);
		return fs.statSync(dir).isDirectory() && !file.startsWith('__');
	});
}

function getFiles(filepath) {
	return fs.readdirSync(filepath).filter(function(file) {
		return fs.statSync(path.join(filepath, file)).isFile();
	});
}

function readFile(filePath) {
	return fs.readFileSync(filePath, 'utf-8');
}

module.exports = {
	writeFile,
	getDirectories,
	getFiles,
	readFile
};

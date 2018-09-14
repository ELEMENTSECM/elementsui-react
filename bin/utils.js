const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

function writeFile(filepath, content) {
	fs.writeFile(filepath, content, function(err) {
		if (err) {
			console.log(chalk.red(err));
		}
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

function join(...paths) {
	return path.join(...paths).replace(/\\/g, '/');
}

function capitalize(str) {
	return `${str[0].toUpperCase()}${str.slice(1)}`;
}

function camelCase(str) {
	return `${str[0].toLowerCase()}${str.slice(1)}`;
}

module.exports = {
	writeFile,
	getDirectories,
	getFiles,
	readFile,
	capitalize,
	camelCase,
	join
};

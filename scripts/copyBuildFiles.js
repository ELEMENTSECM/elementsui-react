var path = require("path");
var fse = require("fs-extra");

const files = ["README.md", "LICENSE"];

Promise.all(files.map(file => copyFile(file))).then(() => createPackageFile());

function copyFile(file) {
	const libPath = resolveBuildPath(file);
	return new Promise(resolve => {
		fse.copy(file, libPath, err => {
			if (err) throw err;
			resolve();
		});
	}).then(() => console.log(`Copied ${file} to ${libPath}`));
}

function resolveBuildPath(file) {
	return path.resolve(__dirname, "../dist/", path.basename(file));
}

function createPackageFile() {
	return new Promise(resolve => {
		fse.readFile(path.resolve(__dirname, "../package.json"), "utf8", (err, data) => {
			if (err) {
				throw err;
			}

			resolve(data);
		});
	})
		.then(data => JSON.parse(data))
		.then(packageData => {
			const {
				author,
				version,
				description,
				keywords,
				repository,
				license,
				bugs,
				homepage,
				peerDependencies,
				dependencies,
				typings,
				main
			} = packageData;

			const minimalPackage = {
				name             : "elementsui-react",
				author,
				version,
				description,
				main,
				keywords,
				repository,
				license,
				bugs,
				homepage,
				peerDependencies,
				dependencies,
				typings
			};

			return new Promise(resolve => {
				const libPath = path.resolve(__dirname, "../dist/package.json");
				const data = JSON.stringify(minimalPackage, null, 2);
				fse.writeFile(libPath, data, err => {
					if (err) throw err;
					console.log(`Created package.json in ${libPath}`);
					resolve();
				});
			});
		});
}

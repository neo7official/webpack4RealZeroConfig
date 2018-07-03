const path = require("path");

let getPath = () => {
	const root_path = path.resolve("./");
	const src_path = path.resolve('src/');
	const dist_path = path.resolve('dist/');
	const Paths = {path, root_path, src_path, dist_path};
	return Paths;
};
module.exports = getPath();
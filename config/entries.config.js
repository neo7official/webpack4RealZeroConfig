const {path, root_path, src_path, dist_path} = require("./path.config");
const Public = require("./public.options");

const entries = Object.create(null);

if(Public.options.entries.length > 0 && Public.options.entries[0].length > 0){
	Public.options.entries.forEach(file =>{
   		entries[file.match(/\w+/)[0].replace("_", "-")] = ["babel-polyfill", "whatwg-fetch", path.resolve(src_path, `js/${file}`)];
   	});
}else{
	const fs = require("fs");
	fs.readdirSync(path.resolve(src_path, "js/")).forEach(file =>{
  		if(file.split(".").length > 1){ //ignoring folder names
   			entries[file.split(".")[0].replace("_", "-")] = ["babel-polyfill", "whatwg-fetch", path.resolve(src_path, `js/${file}`)];
   		};
   	});
};


module.exports = entries;


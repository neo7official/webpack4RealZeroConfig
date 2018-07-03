const {path, root_path, src_path, dist_path} = require("./path.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Public = require("./public.options");


let Rules = [];

var mode = process.env.NODE_ENV.match(/\w+/g)[0];

var raw_attributes = `${["img:src", "image:href", ":data-src", "data-img", "data-image", "audio:src", "video:src", "source:src", "video:poster", ].join()}, ${Public.options.customAttributes.join()}`;


Rules.push(
			{
				test:/\.(css|sass|scss)$/,
				use:[function(){
						if(mode === "production")
							{
								return {
									loader:MiniCssExtractPlugin.loader,
									options:{
										publicPath:"../"
									}
								}
							}else{
								return "style-loader";
							}
					}(),
					"css-loader", "fast-sass-loader", "postcss-loader"],
			},
			{
				test:/\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
			    use: 'babel-loader'
			},
			{
				test:/\.(jpe?g|png|gif)$/,
				use:`url-loader?limit=${Public.options.base64Threshold && Public.options.base64Threshold.toString().match(/\d+/).length?Public.options.base64Threshold:1000}&name=${Public.options.imageFolder.match(/\w+/g)?Public.options.imageFolder:'images'}/[name].[ext]`,
			},
			{
				test:/\.(svg)$/,
				exclude:[path.resolve(src_path,`${Public.options.fontFolder.match(/\w+/g)?Public.options.fontFolder:'fonts'}`)],
				use:`file-loader?name=${Public.options.imageFolder.match(/\w+/g)?Public.options.imageFolder:'images'}/[name].[ext]`,
			},
			{
				test:/\.(ttf|otf|eot|woff|woff2|svg)$/,
				exclude:[path.resolve(src_path,`${Public.options.imageFolder.match(/\w+/g)?Public.options.imageFolder:'images'}`)],
				use:`file-loader?&name=${Public.options.fontFolder.match(/\w+/g)?Public.options.fontFolder:'fonts'}/[name].[ext]`
			},
			{
				test:/\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/,
				use:`file-loader?&name=${Public.options.docFolder.match(/\w+/g)?Public.options.docFolder:'docs'}/[name].[ext]`
			},
			{
				test:/\.(mp3|ogg|wav)$/,
				use:`file-loader?&name=${Public.options.audioFolder.match(/\w+/g)?Public.options.audioFolder:'audios'}/[name].[ext]`
			},
			{
				test:/\.(mp4|ogv|webm)$/,
				use:`file-loader?&name=${Public.options.videoFolder.match(/\w+/g)?Public.options.videoFolder:'videos'}/[name].[ext]`
			},
			{
				test:/\.html?$/,
			    use:[
			     {
				    loader:"html-loader",
				    options:{
					    interpolate: true,
					    attrs:raw_attributes.split(","),
					    collapseWhitespace:Public.options.htmlMinify.collapseWhitespace,
					   	preserveLineBreaks:Public.options.htmlMinify.preserveLineBreaks,
					   	removeAttributeQuotes:Public.options.htmlMinify.removeAttributeQuotes,
					   	removeComments:Public.options.htmlMinify.removeComments,
					   	removeEmptyAttributes:Public.options.htmlMinify.removeEmptyAttributes,
					   	removeEmptyElements:Public.options.htmlMinify.removeEmptyElements,

			     	}
			     }
			    ]
			}
	);

module.exports = Rules;
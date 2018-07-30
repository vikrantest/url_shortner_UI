var HttpStatus = require('http-status-codes');
	redis = require('redis'),
	client = redis.createClient(),
	async = require('async'),
	path = require('path'),
	request = require('request'),
	fs = require('fs');


var config_obj = JSON.parse(fs.readFileSync(__dirname+'/../config/urls.json', 'utf8')).Shurl_lib;



var validate_request = (req_data)=>{
	if(req_data.shurl_url && req_data.shurl_url != undefined && req_data.new_shurl != undefined  ){
		const reg = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
		if(reg.test(query_data.shurl_url)){
			return true
		}
	}
	return false
};

var generate_req_obj = (req_data)=>{
	// req_data.sdadsf='aasdfasdfa';
	let req_obj = {body: JSON.stringify(req_data)};
	if(req_data.new_shurl === 'true' || req_data.new_shurl === true){
		req_obj.new_shurl = new_shurl;
	}
	req_obj.url = config_obj.generate_shurl;
	req_obj.headers = {'content-type':'application/json'};
	req_obj.method = 'POST';
	return req_obj;
};


var generate_api_call = (req_obj)=>{
	return new Promise(function(resolve,reject){
		request(req_obj,function(err,res,body){
			if(err){
				reject(err);
			}
			else{
				if(res.statusCode === 200 || res.statusCode === 201){
					resolve(JSON.parse(body));
				}
				else{
					reject(JSON.parse(body));
				}
			}
		})
	})
}

var format_shurl_url = (res)=>{
	return config_obj.base_url+res.shurl_slug;
}

exports.indexShurl = function(req,res){
	res.sendFile(path.resolve(__dirname+'/../static/templates/index.html'));
};

exports.generateshurl = function(req,res){
	query_data = req.body;
	if(validate_request(query_data)){
		let post_data = generate_req_obj(query_data);
		generate_api_call(post_data).then(
			function(result){
				try{
					const shurl_url = format_shurl_url(result);
					res.send({'shurl_url':shurl_url}).status(200);
				}
				catch(err){
					res.send({'error':'Invalid Request'}).status(400)
				}
				
			},
			function(error){
				res.send({'error':'Invalid Request'}).status(400)
			});
	}
};
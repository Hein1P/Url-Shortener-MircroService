let urlService = require('./urlservice')
const dns = require('dns');
let Url = require('./model/url')
const url = require('url');
const {add} = require("nodemon/lib/rules");
const shortid = require('shortid');
const newUrl = async (req,res,next)=>{
    console.log("REQ BODY",req.body.url)
    let parseUrl = req.body.url
    console.log("parseurl", parseUrl)
        const parsedLookupUrl = url.parse(parseUrl);
        await dns.lookup(parsedLookupUrl.hostname,(error,address,family)=>{
            if(!address){
                res.json({ error: 'Invalid URL' });
            }
            else {
                console.log("REQ BODY",req.body.url)
                let code = shortid.generate()
                const newUrl = new Url({
                    original_url:req.body.url,
                    short_url:code
                });
                newUrl.save();
                res.json(newUrl);
            }
        });


}

const getUrl = async (req,res,next)=>{
    console.log("req.params.shorturl",req.params.shorturl)
    try {
        const geturl = await urlService.getUrl(req.params.shorturl)
        if(!geturl) throw Error ("No Url")
        console.log("geturl",geturl)
        await res.redirect(geturl)
    }
    catch (err){
        await res.status(400).json(err);
    }
}
module.exports ={
    newUrl,
    getUrl
}
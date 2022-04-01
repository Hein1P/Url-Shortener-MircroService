let Url = require('./model/url')

let {URL} = require('url')

const newUrl = async (url)=>{
    console.log("URl",url)
        let code = shortid.generate()
        const newUrl = new Url({
            original_url:url,
            short_url:code
        });
        console.log("NEw url", newUrl)
        return newUrl.save();



}
const getUrl = async (url)=>{
    const getUrl = await Url.findOne({
        short_url: url
    })
    if(getUrl){
        return getUrl.original_url
    }

}
module.exports ={
    newUrl,
    getUrl
}
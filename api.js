// #Modified: 2020/11/28 09:09:50

//const beerapiurl = "http://192.168.1.98:1234/";
//const beerapiurl = "http://home.avz.dk/bfapi/";
const beerapiurl = "https://wotapi.azurewebsites.net/api"

function apiGetBatchlist(status,callbackfunction,offset=0,limit=50){
    console.log("API");
    included="_share,recipe._id,recipe.style.name,measuredAbv,measurements"
    $.getJSON(beerapiurl+"batches?status="+status+"&offset="+offset+"&limit="+limit+"&include="+included,callbackfunction);

}  

function apiGetRecipelist(callbackfunction){
    included="_timestamp_ms,estimatedColor,estimatedIbu,_share,estimatedFg,style.name,estimatedAbv,img"
    $.getJSON(beerapiurl+"recipes?limit=50&include="+included,callbackfunction);

}  

function apiGetBatchlistDetails(status,callbackfunction,offset=0,limit=50){
    console.log("API-Details");
    included="estimatedColor,estimatedIbu,_share,estimatedFg,recipe._id,recipe.style.name,measuredAbv,estimatedBuGuRatio,measurements,batchHops"
    $.getJSON(beerapiurl+"batches?status="+status+"&offset="+offset+"&limit="+limit+"&include="+included,callbackfunction);

}  
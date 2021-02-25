

function findValueInlist(list,key){
  var i;
  for (i = 0; i < list.length; i++) {
    if(list[i].text == key && list[i].value != undefined){return list[i].value}
  }
  return "-"
}

function imageurl(path){
  
  if (path==undefined){
    r="./images/missinglabel.png";
  }
  else{
    file=path;
    //file=path.substr(81,30);
    r="https://firebasestorage.googleapis.com/v0/b/brewfather-app.appspot.com/o/users%2FYmhLTCsTMHTzohcCJtX3lCI1TG22%2Fimages%2Frecipes%2F"+file+"%2Fimg%40192-"+file+".jpeg?alt=media";
    console.log("IMG: "+r);
  }

  return r
}

function showBeerlist(result){
  
  console.log(result);
  result.forEach(ShowBeer);
}

function ShowBeer(result){
    

    //imgurl=imageurl(result.recipe.img);
    imgurl=imageurl(result.recipe._id);
    brewdate=new Date(result.brewDate);
    keg=findValueInlist(result.measurements,"Keg");
    tap=findValueInlist(result.measurements,"Tap");
    if (tap!="-"){
      if (result._share==undefined) {link="";}else{link="<a href='https://web.brewfather.app/share/"+result._share+"'><i class='fas fa-file-invoice'></i></a>"}
      console.log(tap);
      $("#image"+tap).attr("src",imgurl);
      $("#name"+tap).text(result.recipe.name);
      $("#style"+tap).text(result.measuredAbv +" % "+result.recipe.style.name);
      table=$("#beerdata"+tap);      
      table.append("<tr><td>FG:</br>BU:GU</br>IBU:</br>EBC</td><td>"+result.estimatedFg+"</br>"+result.estimatedBuGuRatio+"</br>"+result.estimatedIbu+"</br>"+result.estimatedColor+"</td></tr>");
      //table.append("<tr><td>BU:GU: </td><td>"+result.estimatedBuGuRatio+"</td></tr>");      
      //table.append("<tr><td>IBU: </td><td>"+result.estimatedIbu+"</td></tr>");
      //table.append("<tr><td>EBC: </td><td>"+result.estimatedColor+"</td></tr>");
      //table.append("<tr><td>"+link+"</td><td></td></tr>");
      console.log(result.batchHops);
      table.append("<tr><td id='hoplist"+tap+"'></td></tr>");
      result.batchHops.forEach(function displayHop(hop){$('#hoplist'+tap).append(hop.name+"</br>");console.log(hop.name);})



    }
}


$(document).ready( function () {
  console.log("READY");
  apiGetBatchlistDetails("Completed",showBeerlist);
  console.log("READY2");
  }  
 );

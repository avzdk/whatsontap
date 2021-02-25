
var RECORDS_PR_PAGE = 50;
var PAGE=0;
var beerlist=[];
var beerlistArchive=[];

function findValueInlist(list,key){
  var i;
  for (i = 0; i < list.length; i++) {
    if(list[i].text == key && list[i].value != undefined){return list[i].value}
  }
  return ""
}

function imageurl(path){
  
  if (path==undefined){
    r="./images/missinglabel.png";
  }
  else{
    file=path;
    //file=path.substr(81,30);
    r="https://firebasestorage.googleapis.com/v0/b/brewfather-app.appspot.com/o/users%2FYmhLTCsTMHTzohcCJtX3lCI1TG22%2Fimages%2Frecipes%2F"+file+"%2Fimg%40192-"+file+".jpeg?alt=media";
  }
  return r
}

function showBatchlist(result){
  //console.log(result);
  beerlist.push(...result);
  Sort(beerlist); 
  $("#loadprogress").hide();
}


function showArchive(result){
  //console.log(result);
  beerlistArchive.push(...result);

  console.log("HHH "+result.length+" page:"+PAGE);
  if (result.length==RECORDS_PR_PAGE){
    PAGE=PAGE+1;   // Ret fejl. Taeller deles på tværs af status.
    $("#loadprogress").attr('style',"width: "+(100-(100/(PAGE*2)))+"%");
    apiGetBatchlist("Archived",showArchive,PAGE*RECORDS_PR_PAGE,RECORDS_PR_PAGE);
  } else{
    Sort(beerlistArchive); 
    $("#loadprogress").attr('style',"width: 50%");
    $("#loadprogress").hide();
  }
}




function showBatch(batchdata){

  try{stylename=batchdata.recipe.style.name} catch{stylename="-"}
  if (batchdata.recipe.thumb==undefined){imgsrc=imageurl(batchdata.recipe._id);}else{imgsrc=batchdata.recipe.thumb }
  brewdate=new Date(batchdata.brewDate);
  keg=findValueInlist(batchdata.measurements,"Keg");
  tap=findValueInlist(batchdata.measurements,"Tap");
  table=$("#table_main");
  if (batchdata._share==undefined){statusicon='broken-link-svgrepo-com.svg'}
  else if (batchdata.status=="Fermenting"){statusicon='bubbles-air-svgrepo-com.svg'}
  else if (tap!=""){statusicon='beer-tap-svgrepo-com.svg'}
  else {statusicon='barrel-svgrepo-com.svg'}
  markup="<tr>"+
  "<td>"+brewdate.getFullYear()+"-"+(brewdate.getMonth()+1)+"-"+(brewdate.getDate())+"</td>"+
    "<td><a href='https://web.brewfather.app/share/"+batchdata._share+"'><img width=50 src='"+imgsrc+"'>"+"</a></td>"+
    "<td>"+batchdata.recipe.name+"</td>"+
    "<td>"+stylename+"</td>"+
    "<td>"+batchdata.measuredAbv+"</td>"+
    "<td><a href='https://web.brewfather.app/tabs/batches/batch/"+batchdata._id+"'><img width=25 src='./images/"+statusicon+"'></a>"+tap+"</td>"+
    "<td>"+keg+"</td>"+
    "</tr>";
  table.append(markup);
}


$(document).ready( function () {
  console.log("READY");
  onclickStock()
  }  
 );

function onclickStock(){
  $("#pagetitle").text('Lager');
  $("#table_main").empty();
  $("#menu_archive").attr('class','nav-link');
  $("#menu_stock").attr('class','nav-link active');
  if (beerlist.length == 0){
    $("#loadprogress").attr('style',"width: 10%");
    apiGetBatchlist("Completed",showBatchlist,0,RECORDS_PR_PAGE);  
    apiGetBatchlist("Fermenting",showBatchlist,0,RECORDS_PR_PAGE);  
    apiGetBatchlist("Planning",showBatchlist,0,RECORDS_PR_PAGE);
  } else {beerlist.forEach(showBatch);}
}

function onclickArchive(){
  
  
  $("#pagetitle").text('Arkiv');
  $("#menu_archive").attr('class','nav-link active');
  $("#menu_stock").attr('class','nav-link');
  $("#table_main").empty();
  if (beerlistArchive.length == 0){
    PAGE=0;
    $("#loadprogress").attr('style',"width: 10%");
    apiGetBatchlist("Archived",showArchive,0,RECORDS_PR_PAGE);
  } else {beerlistArchive.forEach(showBatch);}
}

function Sort(l){
  l.sort(function(a,b){
    var keyA = new Date(a.brewDate);
    var keyB = new Date(b.brewDate);
    if (keyA<keyB) return 1;
    if (keyB<keyA) return -1;
    return 0;
  });
  console.log(l);
  $("#table_main").empty();
  l.forEach(showBatch);
 

}


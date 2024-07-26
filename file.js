
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let disc=document.getElementById('disc');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let deletall=document.getElementById('deleteall');
let deletallitem=document.getElementById('deletallitem');
let searchbytitle=document.getElementById('searchbytitle');
let searchbygategory=document.getElementById('searchbycategory');

let updateid;
let mood='create';
let searchmood="";
let search=[];
function gettotal(){
    if(price.value !=" "){
        total.innerHTML = +price.value+ +taxes.value + +ads.value - +disc.value
        total.style.background='#040';
    } else
      total.value=null;
       total.style.background='#a000d02';

}
let proarray;
if(localStorage.product!=null ){ 

     proarray= JSON.parse(localStorage.product);


}else 
 proarray=[];





      searchbytitle.onclick=function (){
        searchmood='title';
 
        for(let i=0;i<proarray.length;i++){
                   if(proarray[i].title == title.value){
                     search.push(proarray[i]);


                   }

        }
       show();


    }
    searchbygategory.onclick=function (){
        searchmood='gategory';
 
        for(let i=0;i<proarray.length;i++){
                   if(proarray[i].category == category.value){
                     search.push(proarray[i]);


                   }

        }
        show();

    }


submit.onclick=function  (){
     
        let newpro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        disc:disc.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
        }
   if(mood=='create'){
    for(let i=0;i< +count.value;i++){
        proarray.push(newpro);
    }
   }else{
    proarray[updateid]=newpro;
    mood='create';
    submit.innerHTML='create';

   }

           
   

    localStorage.setItem('product', JSON.stringify(proarray))

   
    clear(); 
    show();
   

    }

    
    function clear(){
        title.value=" ";
        price.value=" ";
       taxes.value=" ";
        ads.value=" ";
        disc.value="" ;
        total.innerHTML=" ";
        count.value=" ";
       category.value=" ";

    }

    function deleteproducts(id){
        proarray.splice(id,1);
        localStorage.clear();

        show();

    }



     function update(id){
        let elemnt= proarray[id];
        title.value=elemnt.title;
        price.value=elemnt.price;
       taxes.value=elemnt.taxes;
        ads.value=elemnt.ads;
        disc.value=elemnt.disc ;
       category.value=elemnt.category;
       
       gettotal();
       count.style.display='none';
       submit.innerHTML='update'
       mood='update';
       updateid=id;
      

    }
  
    function show() {
        let table='';
if (searchmood==''){

        for(let i=0;i<proarray.length;i++){

            table += `
        <tr>
        <td> ${proarray[i].title}</td>
        <td> ${proarray[i].price}</td>
        <td> ${proarray[i].taxes}</td>
        <td> ${proarray[i].ads}</td>
        <td> ${proarray[i].disc}</td>
        <td> ${proarray[i].total}</td>
        <td> ${proarray[i].count}</td>
        <td> ${proarray[i].category}</td
        <td><button onclick="update(${i})">update</button></td>
        <td><button   onclick="deleteproducts(${i})"    id ="deleteproduct">delete</button></td>
        </tr>
            `; 
       
    }

    document.getElementById('tbody').innerHTML=table  ;
    if(proarray.length > 0) {
        deletallshow();
    }
} else if(searchmood=='title'|| searchmood=='gategory'){
    for(let i=0;i<search.length;i++){

        table += `
    <tr>
    <td> ${search[i].title}</td>
    <td> ${search[i].price}</td>
    <td> ${search[i].taxes}</td>
    <td> ${search[i].ads}</td>
    <td> ${search[i].disc}</td>
    <td> ${search[i].total}</td>
    <td> ${search[i].count}</td>
    <td> ${search[i].category}</td
    <td><button onclick="update(${i})">update</button></td>
    <td><button   onclick="deleteproducts(${i})"    id ="deleteproduct">delete</button></td>
    </tr>
        `; 
   
}

document.getElementById('tbody').innerHTML=table  ;
if(proarray.length > 0) {
    deletallshow();
}
}

}
show();

function deletallshow(){

    deletall.innerHTML=`  <td><button  onclick="deleteall()" id=deletallitem > ${proarray.length}delete all</button></td>
`
show();

}
function deleteall(){
    proarray=[];
    localStorage.setItem('product', JSON.stringify(proarray));


}
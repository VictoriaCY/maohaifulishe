;(function($){ 
 var leftx=0,disx=0,k=0,size=0,datajson;
       wid=$(document).width()/5;
       
   $.ajax({
   	url:"data.json",
   	type:"get",
   	dataType:"json",
   	success:function(e){
   	    datajson=e;
   	   getData(e);
             },
   	error:function(){
   		alert("数据库链接失败");
   	}
   })

   function getData(data){
        var newStr="",newLi="";
        $.each(data,function(i,val){
           if(i!="content"){
        		newStr+="<section><h2><span>"+i+"</span><small>(正在进行...)</small></h2><dl><dd>"+val.title+"</dd><dt><img src='"+val.img+"'></dt></dl></section>";
        	          if(i=="第一期"){
        	          	   newLi="<li><span>名称：</span>"+val.name+"</li><li><span>规格：</span>"+val.style+"</li><li><span>价格：</span>￥"+val.price+"</li><li><span>数量：</span>"+val.size+"份</li>";
        	          }
        	}
        })
        $(".show").html(newStr);
        size=$(".show>section").size();
        $(".show").width(320*size+"px");
        $(".content").find("p").html(data.content);
        $(".content").find("ul").html(newLi);
  }
   $(".main").on("touchstart",function(e){
           leftx=e.touches[0].pageX;
       }).on("touchmove",function(e){
          disx=leftx-e.touches[0].pageX;
      }).on("touchend",function(){
          if(disx>wid){
                k++;
                if(k>=size-1) k=size-1;
               $(".show").css({"-webkit-transform":"translate3d("+(-320*k)+"px,0,0)","-webkit-transition":"transform 1s"});
                showText(k);
           }else if(disx<-wid){
                k--;
                if(k<=0) k=0;
               $(".show").css({"-webkit-transform":"translate3d("+(-320*k)+"px,0,0)","-webkit-transition":"transform 1s"});
               showText(k);
           }
   })
      function showText(k){
      	 var txt=$(".show section").eq(k).find("h2").find("span").text(),
      	        newLi="";
      	  $.each(datajson,function(i,val){
      	       if(i==txt){
      	       	 if(val.size==0){
      	       	 	newLi="<li><span>名称：</span>"+val.name+"</li><li><span>规格：</span>"+val.style+"</li><li class='price'><span>价格：</span><a>￥"+val.price+"</a><m>0元</m></li><li><span>数量：</span>"+val.size+"份</li>"; 
      	       	 	$(".btn1").val("已抢完").prop("disabled",true);
      	       	 	$("small").eq(k).text("(已抢完)");
      	       	 }else{
                      newLi="<li><span>名称：</span>"+val.name+"</li><li><span>规格：</span>"+val.style+"</li><li class='price'><span>价格：</span>￥"+val.price+"</li><li><span>数量：</span>"+val.size+"份</li>";
      	           $(".btn1").val("正在抢购").prop("disabled",false);
      	           $("small").eq(k).text("(正在进行...)");
      	           
      	       }
      	      }
      	   })
             $(".content").find("ul").html(newLi);
      }
 

     
})(Zepto)
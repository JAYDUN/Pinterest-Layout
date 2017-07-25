
/**
 * Created by jianshuaz on 2017-07-19.
 */
$(document).ready(function () {
    $(window).on("load",function () {
        imgLocation();
        var dataImg={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.png"},{"src":"4.jpg"},{"src":"5.jpg"},
            {"src":"6.jpg"},{"src":"7.png"},{"src":"8.png"},{"src":"9.jpg"},{"src":"10.jpg"}]}
        // loading more picture
        window.onscroll=function () {
            console.log(scrollside())
            if(scrollside()){
                $.each(dataImg.data,function (index,value) {
                    var box=$("<div>").addClass("box").appendTo($(".wraper"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    $("<img>").attr("src","./img/"+$(value).attr("src")).appendTo(content);
                    $("<div>").addClass("img-shadow").appendTo(content);
                    // $("<p>").text("").appendTo(shadow);

                });
                imgLocation();
            }

        }
        window.onresize = function () {
            imgLocation();
        }
    }());
    // img hover
    $(".box").mouseenter(
        function(){
            $(this).find(".img-shadow").css("opacity","0.6")
        }
    );
    $(".box").mouseleave(
        function(){
            $(this).find(".img-shadow").css("opacity","0")
        }
    )
    // back to top
    $(".to-top").mouseenter(
        function(){
            $("#top-icon").hide();
            $(".icon-mask").show();        }
    )

    $(".to-top").mouseleave(
        function(){
            $(".icon-mask").hide();
            $("#top-icon").show();
        }
    )

    $(window).scroll(function () {
        if($(window).scrollTop()>10){
            $(".top-feed").css("visibility","visible");

        }
        if($(window).scrollTop()==0){
            $(".top-feed").css("visibility","hidden");

        }
    });

    $(".to-top").click(function () {
        var speed=200;//
        $('body,html').animate({ scrollTop: 0 }, speed);
        // $(".top-feed").css("visibility","hidden");
        return false;
    });
});

// check mouse scroll
function scrollside(){
 var box = $(".box");
 var lastboxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
 var documentHeight = $(window).height();
 var scrollHeight = $(window).scrollTop();
 return (lastboxHeight<scrollHeight+documentHeight);
}

// Pinterest Columnar Layout
function imgLocation() {
    var box= $(".box");
    var boxWidth=box.eq(0).width();
    var num=Math.floor($(window).width()/boxWidth);
    var boxArr=[];
    var wrapperWidth= num*205;
    $(".wraper").css({
        "width": wrapperWidth
    })
    box.each(function (index,value) {
        value.style.cssText='';
        var boxHeight = box.eq(index).height();
        if(index<num){
            boxArr[index]= boxHeight;
            // console.log(boxHeight);
        }else{
            var minboxHeight = Math.min.apply(null,boxArr);
            // console.log(minboxHeight);
            var minboxIndex=$.inArray(minboxHeight,boxArr);
            // console.log(minboxIndex);
            // console.log(value);
            $(value).css({
                "position":"absolute",
                "top":minboxHeight,
                "left":box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex]+=box.eq(index).height();
        }
    })
}
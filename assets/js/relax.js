var video = Array("ktUIK6r0OTY",
    "PEulyxBCA6c",
    "p2_TTKk7Us0",
    "Z5UFR8V2FEw",
    "H5XY84oflec",
    "9tKTpwBtl0E",
    "73rmKPTCfI0",
    "YzRiTWoX9W0",
    "xhpUX7D4Sp4",
    "Yr_9_d5KPJU",
    "XpT4UqeBdf8",
    "P48J8bJ8vjc",
    "KmWse883H04",
    "KWe1ly4sB38",
    "p-FLrtmiUV8"
);

var selectedv = "";
var selectedt = "";
function homeClick() {
    $('body').animate({
        opacity:0
    },600,function(){
        $(this).load('index.html',$(this).animate({opacity:1}))
    })
}

$(document).ready(function() {
    $(".now-playing").hide();
    $("#welcome_fade").fadeIn(2000);
    $("#videolist").fadeIn(2000);

    $.each(video, function() {
        $.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+this+'&key=AIzaSyBBNSwBhusbDhT_kGBvcjuoRy7NYTtecUc&part=snippet',function(data,status,xhr){
            $("#videolist > span").append('<div id="'+data.items[0].id+'" class="span8" style="padding:10px;"><a href="#">'+data.items[0].snippet.title+'</a></div>');

            $('#' + data.items[0].id + " > a").click(function() {
                selectVideo(data.items[0].id, data.items[0].snippet.title);
            });
        });
    });

    var selectVideo = function(id,title) {
        selectedv = id;
        selectedt = title;
        $("#videolist").fadeOut(300, function() {
            $("#welcome_fade").fadeOut(200, function() {
                $("#welcome_fade").text("Okay, now we will load the music from YouTube.").delay(20);
                $("#welcome_fade").fadeIn(2000, function() {
                    $("body").append('<iframe style="position:absolute; left: -1000px" width="800" height="600" src="http://www.youtube.com/embed/'+selectedv+'?autoplay=1&loop=1&rel=0" frameborder="0"></iframe>');
                    $("#welcome_fade").fadeOut(200, function() {
                        $("#welcome_fade").text("Enjoy the music!").delay(20).fadeIn(2000);
                        //$(".now-playing").text(selectedt).animate({height: '1.5em'},1500);
                        $("#welcome_fade").append("<span id='welcome_fade2' style='display:none'><br />You are listening to "+selectedt+"</span>");
                        $('#welcome_fade2').delay(2020).fadeIn(2000);
                        $("#welcome_fade").append("<span id='welcome_fade3' style='display:none'><br />Click <a href='#' onClick='homeClick()'>HERE</a> to return to the list of music.");
                        $('#welcome_fade3').delay(4020).fadeIn(2000);
                    });
                });
            });
        });
    };
});
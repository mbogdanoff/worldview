$(document).ready(function() {
    "use strict";

    var clickedSeason;

    function processNearest(response){
        var i=0;
        var top=0,left=0;
        $.each(response,function(){
            addPhotoToList(response[i],top,left);
            left = left+300;
            if(left>1300){
                top = top+300;
            }
            i++;
        });
    }






    $("#near").click(function(){
        $(".date-posts").empty();
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/nearest",{
            method:"GET"
        }).then(processNearest)
    });

    function addPhotoToList(response,top,left){
        var postOuter = $("<div></div>");
        postOuter.attr("class","post-outer");
        var postHentry = $("<div></div>");
        postHentry.attr("class","post hentry");
        var postright = $("<div></div>");
        postright.attr("class","postright masonry-brick");
        postright.attr("style","position: absolute; top: "+top+"px ; left: "+left+"px;");
        var cover = $("<div></div>");
        cover.attr("class","cover");
        var header = $("<a>"+ JSON.stringify(response.location)+"</a>");
        header.attr("href","");
        var headerH = $("<h2></h2>");
        headerH.append(header);
        var imgID = $("<div></div>");
        imgID.attr("id",JSON.stringify(response.id));
        var crop = $("<div></div>");
        crop.attr("class","crop");
        var imgSource = $("<img>");
        imgSource.attr("src",response.imgurl);
        var jomore = $("<div></div>");
        jomore.attr("class","jomore");
        var author1 = $("<span> Author :"+JSON.stringify(response.author)+"</span>");
        author1.attr("class","author1");
        var description = $("<span> Description : "+JSON.stringify(response.description)+"</span>");
        description.attr("class","description");
        var season = $("<span> Season : "+JSON.stringify(response.season)+"</span>");
        season.attr("class","season");

        jomore.append(author1);
        jomore.append(description);
        jomore.append(season);

        crop.append(imgSource);
        crop.append(jomore);

        imgID.append(crop);
        cover.append(headerH);
        cover.append(imgID);

        postright.append(cover);
        postHentry.append(postright);
        postOuter.append(postHentry);

        ($(".date-posts")).append(postOuter);
    }

    $("#searchinput").geocomplete();



});
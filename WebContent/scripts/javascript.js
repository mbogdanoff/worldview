$(document).ready(function() {
    "use strict";

    var clickedSeason;
    var displayedPhotos =[];

    function processNearest(response){
        var i=0;
        var top=0,left=0;
        $.each(response,function(){
            addPhotoToList(response[i],top,left);
            displayedPhotos.push(response[i]);
            left = left+300;
            if(left>1300){
                top = top+300;
            }
            i++;
        });
        console.log(displayedPhotos);
        console.log(response)
    }


    function processSeasons(){
        var i=0;
        var top,left=0;
        $.each(displayedPhotos,function(){
            if(clickedSeason==displayedPhotos[i].season){
                console.log(displayedPhotos[i]);
                addPhotoToList(displayedPhotos[i],top,left);
                left = left+300;
                if(left>1300){
                    top = top+300;
                }
            }
            i++;
        });
    }

    $("#summer, #winter, #autumn, #spring").click(function(){
        $(".date-posts").empty();
        clickedSeason=this.id;
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/search",{
            method:"GET"
        }).then(processSeasons);
    });



    $("#searchBtn").click(function(){
        displayedPhotos.length=0;
        $(".date-posts").empty();
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/search",{
           method:"GET"
        }).then(searchFunc)
    });


    $("#near").click(function(){
        displayedPhotos.length=0;
        $(".date-posts").empty();
        $.ajax("http://private-6ba54-worldview.apiary-mock.com/nearest",{
            method:"GET"
        }).then(processNearest)
    });

    function searchFunc(response){
        console.log(response);
        var i=0;
        var top,left=0;
        $.each(response,function(){
            if(response[i].location == $("#searchinput").val()){
                addPhotoToList(response[i],top,left);
                displayedPhotos.push(response[i]);
                left = left+300;
                if(left>1300){
                    top = top+300;
                }
            }
            i++;
        });
    }

    $("#upload").click(function(){
        displayedPhotos.length=0;
        $(".date-posts").empty();
        createForm();

    });

    function createForm(){
        $(".date-posts").empty();

        $("<input>").attr("id","locationInput").attr("placeholder","Location").appendTo($(".date-posts"));
        $("<br>").appendTo($(".date-posts"));
        $("<input>").attr("id","seasonInput").attr("placeholder","Season").appendTo($(".date-posts"));
        $("<br>").appendTo($(".date-posts"));
        $("<input>").attr("id","imgurlInput").attr("placeholder","Img URL").appendTo($(".date-posts"));
        $("<br>").appendTo($(".date-posts"));
        $("<input>").attr("id","descriptionInput").attr("placeholder","Description").appendTo($(".date-posts"));
        $("<br>").appendTo($(".date-posts"));
        $("<button> Submit </button>").attr("id","submitBtn").appendTo($(".date-posts"));

        var photoID = Math.floor((Math.random() * 100) + 1);

        $("#submitBtn").click(function(){
            $.ajax("http://private-6ba54-worldview.apiary-mock.com/photos/"+photoID,{
                method:"POST",
                data:{
                    //id : photoID,
                    //location: $("#locationInput").val(),
                   // season: $("#seasonInput").val(),
                  //  imgurl: $("#imgurlInput").val(),
                 //   description: $("#descriptionInput").val(),
                    "author" : "John Doe"
                }
            }).then(proccessPostResponse)
        });

        function proccessPostResponse(response4){
            alert("POSTED with ID "+photoID);
            console.log(response4);

        }
    }




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
        header.click(function(){
            alert(response.location);
        });
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
        var delBtn = $("<button>X</button>");
        delBtn.attr("class","delete");
        delBtn.attr("id",JSON.stringify(response.id));

        jomore.append(author1);
        jomore.append(description);
        jomore.append(season);

        crop.append(imgSource);
        crop.append(jomore);

        imgID.append(crop);
        cover.append(headerH);
        cover.append(imgID);

        postright.append(cover);
        postright.append(delBtn);
        postHentry.append(postright);
        postOuter.append(postHentry);

        $(".date-posts").append(postOuter);

        delBtn.click(function(){
            console.log("clicked");
            $.ajax("http://private-6ba54-worldview.apiary-mock.com/photos/"+this.id,{
                method:"DELETE"
            }).then(successfullyDeleted)
        });

        function successfullyDeleted(){
            delBtn.closest('.post-outer').remove();
        }
    }

    $("#searchinput").geocomplete();



});
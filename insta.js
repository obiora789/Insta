$(function(){
    //config
    var width = 640;
    var animationSpeed = 1000;
    var pause = 3000;
    var reset = 0;
    
    //DOM cache
    var $slider=$("#slider");
    var $slideContainer = $slider.find(".picsHere");
    var currentSlide = 1; 
    var interval;
                
    //API access            
    var token = "290568575.2b50837.3bf0bf6ae3fd4c88b1019c4407a307af",
    userid = 290568575,
    photos = 11;
            
            $.ajax({
                url: "https://api.instagram.com/v1/users/"+ userid +"/media/recent",
                dataType: "jsonp",
                type: "GET",
                data: {access_token: token, count: photos},
                success: function(data){
                    console.log(data);
                    for (var x in data.data){
                        if (x >= 0, x <= 11) {
                        $(".picsHere").append("<li class='slide'><img src='"+data.data[x].images.standard_resolution.url+"'></li>");                       
                        }
                        else {
                            alert("Number Exceeded");
                        }
                    }
                },
                error: function(data){
                    console.log(data);
                }
            });
            
    // Start Sliding Function
    function startSlider(){
        
        interval = setInterval(function(){
        $slideContainer.animate({"margin-left": "-="+width}, animationSpeed, function() { 
            currentSlide++;
            if(currentSlide === photos) {
                currentSlide = 1; 
                $slideContainer.animate({"margin-left": reset}, animationSpeed);
                }
            });
        }, pause);
    }
    //to stop the sliding function
    function stopSlider(){
        clearInterval(interval);
    }
        //listen for mouseenter and pause
        //listen for mouseleave and resume
    $slider.on("mouseenter", stopSlider).on("mouseleave", startSlider);
        
        
        //button tabs 
        $(".right-tab").click(function(){
            $slideContainer.animate({"margin-left": "-="+width}, animationSpeed);
            stopSlider();
            startSlider();
            });
        
        $(".left-tab").click(function(){
            $slideContainer.animate({"margin-left": "+="+width}, animationSpeed);
            stopSlider();
            startSlider();
            });
});
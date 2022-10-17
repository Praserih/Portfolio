    var wlength = 0;
    var themecount = 0
    var colour = [
    ["#0c0c0c", "white"],
    ["#12e2a3", "#27253d"],
    ["#27253d", "#fff5db"],
    ["#ceecf0", "#427996"],
    ["#eaafaf", "#7a4579"],
    ["#7a4579", "#ffff8f"],
    ["#f0f3f3", "#f78f1e"]
]
    var off = -180;

    $(document).ready(function () {

        $.MultiLanguage("lang.json")
        randomValue();


        $(".port_bg").each(bgoffset)

        $(".portfolio").mouseenter(function () {
            $(this).find(".port_bg").children().css("bottom", "0")
        })
        $(".portfolio").mouseleave(function () {
    var off = -180;

            $(this).find(".port_bg").children().each(function(){
            off = off - 60
            $(this).css("bottom", off + "%")
            })
        })

        let anime = $('.window>div');
        var step = 0;

        $('.window .fa-xmark').click(function () {
            $(".hidean").css({
                "visibility": "hidden",
                "transform": "translateY(10em)",
                "opacity": "0"
            })
            step=0
            anime.css("transform","translateY(0)")
            anime.each(function () {
                if (!$(this).hasClass("hide")) {
                    $(this).toggleClass("hide")
                }
            })
        })

        $('.window .fa-chevron-right').click(function () {
            if (step == wlength) {
                anime.css("transform", 'translateX(0vw)');
                step = 0
            } else {
                step = step - 100
                anime.css("transform", "translateX(" + step + "vw)")
            }

        })


        $('.window .fa-chevron-left').click(function () {

            if (step == 0) {
                anime.css("transform", 'translateX(' + wlength + 'vw)');
                step = wlength
            } else {
                step = step + 100
                anime.css("transform", "translateX(" + step + "vw)")
            }

        })

    })


    var bvalues = [
    "bold"
    , "complex"
    , "flexible"
    , "likeable"
    , "simple"
    , "weird"
]

    function bgoffset() {
        $(this).children().each(function () {
            off = off - 50
            $(this).css("bottom", off + "%")
        })


    }

    function setvar(number, colour) {
        document.documentElement.style.setProperty('--' + number + '_color', colour)
    }

    function randomValue() {
        var bvalue = bvalues[Math.floor(Math.random() * bvalues.length)];
        var lang = localStorage.MultiLanguage
        $(".header i").attr("class", "icon-" + bvalue)
        $(".headertext").prop("id", bvalue)
        $.getJSON("lang.json", function (json) {
            $(".header span").text(json["language"][lang]["#" + bvalue]);
        });
        setTimeout(randomValue, 5000);
    }


    function toggleHide(e) {
        $(e).next().toggleClass("hide")
    }

    function theme() {
        var random = Math.floor(Math.random() * (colour.length - 1) + 1)
        themecount++
        var alt = Math.round(Math.random())
        var alt2 = 1 - alt

        if (themecount > 25) {
            themecount = 0
        } else if (themecount > 10) {
            setvar("primary", colour[random][alt])
            setvar("secondary", colour[random][alt2])
        } else if (themecount % 2 == 0) {
            setvar("primary", colour[0][0])
            setvar("secondary", colour[0][1])
        } else {
            setvar("primary", colour[0][1])
            setvar("secondary", colour[0][0])
        }


    }

    function projectwindow(e) {
        var id = "#" + $(e).parent().attr("id") + "_pr";
        wlength = ($(id).children(".page").length - 1) * -100
        $(".hidean").css({
            "visibility": "initial",
            "transform": "translateY(0)",
            "opacity": "1"
        })
        $(id).toggleClass("hide")

    }

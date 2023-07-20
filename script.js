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



    function getValue() {
        var value = $.ajax({
            url: 'lang.json',
            async: false,
            dataType: "json"

        }).responseJSON.language;
        return value;
    }
    var langs = getValue()


    var anim_steps = [
    "acds",
    "bold",
    "complex",
    "flexible",
    "likeable",
    "simple",
    "weird"
]



    function randomArray() {

        var a = [anim_steps[0]]

        while (a.length < 7) {

            var r = anim_steps[Math.floor(Math.random() * 6 + 1)]

            a.indexOf(r) === -1 ? a.push(r) : null
        }

        return a
    }

    function typed_string(i, s, l) {
        return i == 0 ? "Alejandro De Sisto" : langs[l]["#" + s]
    }


    function setAnim() {

        var anim = bodymovin.loadAnimation({
            container: $("#lottiecontainer").get(0),
            renderer: 'svg',
            loop: true,
            path: 'JSON/all.json',
            autoplay: 'false'
        })

        var r = randomArray()
        var i = 0




        "config_ready loopComplete".split(" ").forEach(function (e) {
            anim.addEventListener(e, unique_loop, false);
        });

        $("#header_animation").append("<h2 id='value_container'></h2>")


        function unique_loop() {
            var currentLanguage = localStorage.MultiLanguage
            anim.goToAndPlay(r[i])
            var t_s = typed_string(i, r[i], currentLanguage)


            var typed = new Typed('#value_container', {
                strings: [t_s],
                typeSpeed: 80,
                showCursor: false,
                fadeOut: true,
                fadeOutClass: 'typed-fade-out',
                fadeOutDelay: 600,

            });

            i < 6 ? i++ : (i = 0, r = randomArray())

        }

        return anim
    }


    function bgoffset() {
        $(this).children().each(function () {
            off = off - 50
            $(this).css("bottom", off + "%")
        })


    }

    function setvar(number, colour) {
        document.documentElement.style.setProperty('--' + number + '_color', colour)
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
    $(document).ready(function () {

        $.MultiLanguage("lang.json")

        setAnim()

        $(".port_bg").each(bgoffset)

        $(".portfolio").mouseenter(function () {
            $(this).find(".port_bg").children().css("bottom", "0")
        })
        $(".portfolio").mouseleave(function () {
            var off = -180;

            $(this).find(".port_bg").children().each(function () {
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
            step = 0
            anime.css("transform", "translateY(0)")
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

    function namehide(e) {
        e.type == "touchmove"? $("footer").css("top", "-3em") : $("footer").css("top", "8px")
            }

function responsive(maxWidth) {
  if (maxWidth.matches) {

       $('body').on('touchmove touchend', function (e) {
            namehide(e)
        });
    
  } }
 var maxWidth = window.matchMedia("(max-width: 1024px)");
 
 responsive(maxWidth);
 maxWidth.addListener(responsive);

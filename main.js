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
    var a = ["acds"]

    while (a.length < 7) {
        var r = anim_steps[Math.floor(Math.random() * 6 + 1)]
        if (a.indexOf(r) === -1) {
            a.push(r);
        }
    }
    return a
}

function setAnim() {

    const animation = $("#lottiecontainer").get(0);

    var animData = {
        container: animation,
        renderer: 'svg',
        loop: true,
        path: 'JSON/all.json',
        autoplay: 'false'
    };

    var anim = bodymovin.loadAnimation(animData)

    var r = randomArray()

    var i = 0

    anim.addEventListener("config_ready", () => anim.goToAndPlay(r[0]))
    anim.addEventListener("loopComplete", unique_loop)

    function unique_loop() {
        if (i < 6) {
            i++

        } else {
            i = 0
            r = randomArray()

        }
        anim.goToAndPlay(r[i])
    }


}


$(document).ready(function () {

    setAnim()



})
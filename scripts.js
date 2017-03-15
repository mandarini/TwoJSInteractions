var params = {
    fullscreen: true,
    autostart: true
};
var two = new Two(params).appendTo(document.body);

var delta = new Two.Vector();
var mouse = new Two.Vector();
var radius = 25;

var ball = two.makeCircle(two.width / 2, two.height / 2, radius);
console.log(ball);
ball.noStroke();

var r = 150;
var g = 150;
var b = 150;
ball.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';

var $window = $(window)
    .bind('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    })
    .bind('touchstart', function() {
        e.preventDefault();
        return false;
    })
    .click(function(e) {
        console.log('works', e.clientX);
        ball.scale = ball.scale + ball.scale*0.1;
    })
    .keypress(function(e) {
        console.log('works', e, e.key);
        if (e.charCode == 45) {
            ball.scale = ball.scale - ball.scale*0.1;
        } else if (e.charCode == 61) {
            ball.scale = ball.scale + ball.scale*0.1;
        } else if (e.charCode == 114) {
            if (r <= 245) {
                r = r + 10;
            };
            ball.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        } else if (e.charCode == 103) {
            if (g <= 245) {
                g = g + 10;
            };
            ball.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        } else if (e.charCode == 98) {
            if (b <= 245) {
                b = b + 10;
            };
            ball.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        } else if (e.charCode == 82) {
            if (r >= 10) {
                r = r - 10;
            };
            ball.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        } else if (e.charCode == 71) {
            if (g >= 10) {
                g = g - 10;
            };
            ball.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        } else if (e.charCode == 66) {
            if (b >= 10) {
                b = b - 10;
            };
            ball.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        };
    })
    .bind('touchmove', function(e) {
        e.preventDefault();
        var touch = e.originalEvent.changedTouches[0];
        mouse.x = touch.pageX;
        mouse.y = touch.pageY;
        // console.log("touch",mouse);
        return false;
    });

two.bind('update', function() {
    delta.copy(mouse).subSelf(ball.translation);
    ball.translation.addSelf(delta);
}); //.play() //we would need play() if it was not autostart

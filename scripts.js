//Create a Two object
var params = {
    fullscreen: true,
    autostart: true
};
var two = new Two(params).appendTo(document.body);

//Create the variables that will hold the position of the mouse
//To pass it as position of the circle
var delta = new Two.Vector();
var mouse = new Two.Vector();

//The circle
var radius = 25;
var ball = two.makeCircle(two.width / 2, two.height / 2, radius);

ball.noStroke();

//The fill color of the circle, in RGB (red, green, blue) values
var r = 150;
var g = 150;
var b = 150;
ball.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';

/*
  Here we are binding some events to our window.
  Here, all interactions are caught.
*/
var $window = $(window)

    //Here, we are keeping the position of the mouse as it moves
    //We will use it later
    .bind('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    })
    .bind('touchstart', function() {
        e.preventDefault();
        return false;
    })

    //Here we are using the click event in order to make the circle larger
    .click(function(e) {
        ball.scale = ball.scale + ball.scale*0.1;
    })

    //Here we are listening for keypress events
    .keypress(function(e) {

        //For example, if a user presses the '-' key, then the circle is made smaller
        if (e.charCode == 45) {
            ball.scale = ball.scale - ball.scale*0.1;
        } else if (e.charCode == 61) {
            ball.scale = ball.scale + ball.scale*0.1;
        } else if (e.charCode == 114) {                 //If the user presses the 'r' key, then the value of red is augmented by 10 points.
            if (r <= 245) {                             //We are making sure that the value of r will never get larger than 255,
                r = r + 10;                             //which is the largest value a color can take in rgb().
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
        } else if (e.charCode == 82) {                  //If the user presses Shift+'r' key, then the value of red is diminished by 10 points.
            if (r >= 10) {                              //We are making sure that the value of r will never get smaller than 0,
                r = r - 10;                             //which is the largest value a color can take in rgb().
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
        return false;
    });

two.bind('update', function() {
    delta.copy(mouse).subSelf(ball.translation);        //Here is the difference between the vectors of current and previous positions.
    ball.translation.addSelf(delta);                    //Here we are adding the new vector to the last position, to move the circle.
}); //we would need .play() if it was not autostart

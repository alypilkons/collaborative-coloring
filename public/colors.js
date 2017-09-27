const socket = io.connect('http://localhost:3000')

const numOfSpaces = 323;
const colorChoices = 6;

// create grid
let spacesHTML = '';
for (var i = 0; i < numOfSpaces; i++) {
  spacesHTML += '<div class="space"></div>';
}
$(spacesHTML).appendTo('#color-container');

// create color choice squares
let choicesHTML = '';
for (var i = 0; i < colorChoices; i++) {
  let index = i + 1;
  choicesHTML += `<div id="color${index}" class="color-option"></div>`;
}
$(choicesHTML).appendTo('#color-options');

// Default color selected when user loads the page
$('#color1').css('border', '3px solid black');
let chosenColor = '#ff0099';

// user chooses a color
$('.color-option').on('click', function () {
  $('.color-option').css('border', 'none');
  $(this).css('border', '3px solid black');
  chosenColor = $(this).css('background-color');
  console.log(chosenColor);
})


// user chooses a space
$('.space').on('click', function(data) {
  let index = $('div').index(this);
  console.log('hi');
  $(this).css('background-color', chosenColor);

  socket.emit('color-change', {
    color: chosenColor,
    index: Number(index) - 1
  });
});

socket.on('color-change', function(data) {
  $('.space').eq(data.index).css('background-color', data.color)
});

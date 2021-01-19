//update charLength
document.getElementById('getText').addEventListener('keyup', () => {
 //def length
 let length = 250 - document.getElementById('getText').value.length;
 let charLength =
  document.getElementById('charLength');
 charLength.innerHTML = `${length} characters more`;

 (length <= 200) ?
 Object.assign(charLength.style, { color: '#ee0000' }):

  (length <= 150) ?
  Object.assign(charLength.style, { color: '#e69500' }) :

  (length <= 50) ?
  Object.assign(charLength.style, { color: '#ffc14d' }) :
  Object.assign(charLength.style, { color: '#f5f5f5' });
});
//ref variables 
let link = document.getElementById('output');
//define variables
let trigger = document.querySelectorAll('.container .output-controls button')[1];
//add event listener 
trigger.addEventListener('click', function() {
 let message = document.getElementById('getText').value;
 let number = document.getElementById('getNumber').value;
 //proceed to.copy but ==>
 //ERROR HANDLING 
 if (!number && !message) {
  swal({
   title: "Oops\!",
   text: `Empty feeds; there's nothing to copy.`,
   icon: "error",
   dangerMode: true
  }).then(() => {
   link.innerHTML = '';
   //notify error
   Object.assign(document.getElementById('getNumber').style, { borderColor: 'rgba(255, 26, 26, .4)' });
   Object.assign(document.getElementById('getText').style, { borderColor: 'rgba(255, 26, 26, .4)' });
   document.querySelectorAll('.container .output-controls button')[1].innerHTML = 'Copy link';
  });
 }
 else if (!number) {
  swal({
   title: "Oops\!",
   text: "Empty number feed, please provide a valid number",
   icon: "error",
   dangerMode: true
  }).then(() => {
   link.innerHTML = '';
   Object.assign(document.getElementById('getNumber').style, { borderColor: 'rgba(255, 26, 26, .4)' });

   document.querySelectorAll('.container .output-controls button')[1].innerHTML = 'Copy link';
  });
 }

 else if (!message) {
  swal({
   title: "Oops\!",
   text: "Empty message feed",
   icon: "error",
   dangerMode: true
  }).then(() => {
   document.getElementById('output').innerHTML = '';
   Object.assign(document.getElementById('getText').style, { borderColor: 'rgba(255, 26, 26, .4)' });

   document.querySelectorAll('.container .output-controls button')[1].innerHTML = 'Copy link';
  });
 }
 else if (number.length < 11) {
  swal({
   title: 'Input error',
   text: `The number "${number}" has fewer characters than expected.
   
   Add up to 11 digits.`,
   icon: 'error',
   dangerMode: true
  }).then(() => {
   Object.assign(document.getElementById('getNumber').style, { borderColor: 'rgba(255, 26, 26, .4)' });
  });
 }
 else if (number.length > 11) {
  swal({
    title: 'Input error',
    text: `The number "${number}" has more characters than expected`,
    dangerMode: true,
    buttons: ['exit modal', 'reset feed'],
   }).then((resetFeed) => {
    if (resetFeed) {
     document.getElementById('getNumber').value = '';
    }
    swal({
     title: 'Feed cleared.',
     icon: 'success'
    });
   })
   .then(() => {
    swal({
     text: 'Provide a valid number.',
     icon: 'info',
     button: 'Proceed'
    });
   });
  Object.assign(document.getElementById('getNumber').style, { borderColor: 'rgba(255, 26, 26, .4)' });
 }

 else {
  //reject Invalid characters then
  //generate link

  // else {
  number = number.replace(number[0], '234');
  //append selection to variable link
  link.innerHTML = encodeURI('https:\/\/wa.me/' + number + '\?text=' + message);
  //}

  const selection = window.getSelection();

  //save current selection
  const currentRange = selection.rangeCount === 0 ? null : selection.getRangeAt(0);

  //select the link content
  const range = document.createRange();
  range.selectNodeContents(link);
  selection.removeAllRanges();
  selection.addRange(range);

  //copy to clipboard
  try {
   document.execCommand('copy');
   trigger.innerHTML = 'Copied to clipboard';
   swal({
     title: 'Link copied to clipboard',
     icon: 'success',
     buttons: ['exit modal', 'reset feed'],
     dangerMode: true
    })
    .then((resetFeed) => {
     if (resetFeed) {
      document.getElementById('getText').value = '';
      document.getElementById('getNumber').value = '';
      link.innerHTML = '';
      document.querySelectorAll('.container .output-controls button')[1].innerHTML = 'Copy link';
     }
    });

  }
  //unable to copy 
  catch (err) {
   trigger.innerHTML = 'copy';
  }
  //restore all previous all selection
  selection.removeAllRanges();
  currentRange && selection.addRange(currentRange);
 }

});
document.querySelectorAll('.container .output-controls button')[0].addEventListener('click', () => {
 //reset f8eilds
 document.getElementById('getText').value = '';
 document.getElementById('getNumber').value = '';
 link.innerHTML = '';
 document.querySelectorAll('.container .output-controls button')[2].innerHTML = 'Copy link';
});
//error handling
//if error resulting from void feeds has occur and user is set to input values clear errors

//case !number && !message
(!document.getElementById('getText').value && !document.getElementById('getNumber').value) ? (function() {
 //restore message
 document.getElementById('getText').addEventListener('keyup', () => {
  Object.assign(document.getElementById('getText').style, { borderColor: 'rgba(0,153,0,.4)' })
 });
 //restore number
 document.getElementById('getNumber').addEventListener('keyup', () => {
  Object.assign(document.getElementById('getNumber').style, { borderColor: 'rgba(0,153,0,.4)' })
 });
})() :
//case ! number
(!document.getElementById('number').value) ?
document.getElementById('getNumber').addEventListener('keyup', () => { //log error if the user input is out of range
  if (document.getElementById('getNumber').length > 11) {
   Object.assign(document.getElementById('getNumber').style, { borderColor: 'rgba(255,26,26,.4)' })
  }
  //else do otherwise
  else {
   Object.assign(document.getElementById('getNumber').style, { borderColor: 'rgba(0,153,0,.4)' });
  }
 }):
 //case! message
 (!document.getElementById('getNumber').value) ?
 document.getElementById('getText').addEventListener('keyup', () => {
  Object.assign(document.getElementById('getText').style, { borderColor: 'rgba(0,153,0,.4)' })
 }) : (function() {
  //restore default : case message
  Object.assign(document.getElementById('getText').style, { borderColor: 'rgba(255,255,255,.12)' });
  //restore default : case message
  Object.assign(document.getElementById('getNumber').style, { borderColor: 'rgba(255,255,255,.12)' });
 })();
 

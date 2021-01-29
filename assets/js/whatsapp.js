//ref variables 
let link = tree.getVariable('layer[name*="whatsapp"] .output-controls span');
//define variables
//let trigger = tree.getVariable('layer[name*="whatsapp"] .output-controls img')[3];
let trigger = tree.getVariable('layer[name*="whatsapp"] .output-controls img[src*="arrow"]')
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
      /* document.querySelectorAll('.container .output-controls button')[1].innerHTML = 'Copy link';*/
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
      /*
            document.querySelectorAll('.container .output-controls button')[1].innerHTML = 'Copy link';*/
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

      /*      document.querySelectorAll('.container .output-controls button')[1].innerHTML = 'Copy link';*/
    });
  }

  else {
    //delete plus sign before number
    number = number[0] == '+' ? number.slice(1) : number;
    //append selection to variable link
    link.innerHTML = encodeURI('https:\/\/wa.me/' + number + '\?text=' + message);
    // update output control from proceed to copy
    tree.getVariable('layer[name*="whatsapp"] .output-controls span').innerHTML ? trigger.setAttribute('src', 'assets/img/copy.svg') : trigger.setAttribute('src', 'assets/img/arrow-right.svg');
  }
  //test if the link has been made
  if (/https:\/\/wa\.me\/\d?\w./.test(tree.getVariable('layer[name*="whatsapp"] .output-controls span').innerHTML)) {
    //execute copy comman
    trigger.onclick = tree.copyToClipBoard();
    trigger.removeEventListener('click', tree.copyToClipBoard);
  }
 

});
// Here are the different messages we'll use for creating the 500 displayable message
const messages = [
  ['Whoops.', 'Oops.', 'Shit.', 'Oh Dear.', 'Well fuck.', 'Hm...', 'This is awkward.'],
  ['It appears', 'Looks like', 'Sadly,'],
  ['there was an error.', 'you are an idiot.', 'a bad thing happend.', 'you fucked up', 'i got kidnapped.', 'you tried something.', 'your a creep.'],
  ['Sorry.', 'Apologies.', 'Our bad.']
];

// These are the different elements we'll be populating. They are in the same order as the messages array
const messageElements = [
  document.querySelector('#js-whoops'),
  document.querySelector('#js-appears'),
  document.querySelector('#js-error'),
  document.querySelector('#js-apology')
];

// we'll use this element for width calculations
const widthElement = document.querySelector('#js-hidden');
// keeping track of the message we just displayed last
let lastMessageType = -1;
// How often the page should swap messages
let messageTimer = 1000;

// on document load, setup the initial messages AND set a timer for setting messages
document.addEventListener('DOMContentLoaded', (event) => {
  setupMessages();
  setInterval(() => {
    swapMessage();
  }, messageTimer);
});

// Get initial messages for each message element
function setupMessages() {
  messageElements.forEach((element, index) => {
    let newMessage = getNewMessage(index);
    element.innerText = newMessage;
  });
}

// set the width of a given element to match its text's width
function calculateWidth(element, message) {
  // use our dummy hidden element to get the text's width. Then use that to set the real element's width
  widthElement.innerText = message;
  let newWidth = widthElement.getBoundingClientRect().width;
  element.style.width = `${newWidth}px`;
}

// swap a message for one of the message types
function swapMessage() {
  let toSwapIndex = getNewSwapIndex();
  let newMessage  = getNewMessage(toSwapIndex);
  // Animate the disappearing, setting width, and reappearing
  messageElements[toSwapIndex].style.lineHeight = '0';
  // once line height is done transitioning, set element width & message
  setTimeout(() => {
    // make sure the element has a width set for transitions
    checkWidthSet(toSwapIndex, messageElements[toSwapIndex].innerText);
    // set the new text
    messageElements[toSwapIndex].innerText = newMessage; 
    // set the new width
    calculateWidth(messageElements[toSwapIndex], newMessage);
  }, 200);
  // once width is done, transition the lineheight back to 1 so we can view the message
  setTimeout(() => {
    messageElements[toSwapIndex].style.lineHeight = '1.2';
  }, 400);
}

// We need to make sure that the element at the passed index has a width set so we can use transitions
function checkWidthSet(index, message) {
  if (false == messageElements[index].style.width) {
    messageElements[index].style.width = `${messageElements[index].clientWidth}px`;
  }
}

// Return a new index to swap message in. Should not be the same as the last message type swapped
function getNewSwapIndex() {
  let newMessageIndex = Math.floor(Math.random() * messages.length);
  while (lastMessageType == newMessageIndex) {
    newMessageIndex = Math.floor(Math.random() * messages.length);
  }
  return newMessageIndex;
}

// Get a new message for the message element.
function getNewMessage(toSwapIndex) {
  const messagesArray   = messages[toSwapIndex];
  const previousMessage = messageElements[toSwapIndex].innerText;
  // Get a new random index and the message at that index
  let newMessageIndex = Math.floor(Math.random() * messagesArray.length);
  let newMessage      = messagesArray[newMessageIndex];
  // let's make sure they aren't the same as the message already there
  while (newMessage == previousMessage) {
    newMessageIndex = Math.floor(Math.random() * messagesArray.length);
    newMessage      = messagesArray[newMessageIndex];
  }
  return newMessage;
}
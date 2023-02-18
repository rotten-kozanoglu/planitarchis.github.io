const cursor = document.querySelector('.cursor');
const themeButton = document.querySelector('#theme-button')
const cssFile = document.querySelector('#css-file')

document.addEventListener('mousemove', e => {
  cursor.style.top = e.pageY + 'px';
  cursor.style.left = e.pageX + 'px';
});

const buttons = document.querySelectorAll('a');
buttons.forEach(button => {
  button.addEventListener('mouseover', () => {
    cursor.classList.add('cursor-hover');
  });
  button.addEventListener('mouseout', () => {
    cursor.classList.remove('cursor-hover');
  });
});


const popupCircle= document.querySelector('.popup-circle');
const popupPanel = document.querySelector('.popup-panel');
const chatBox = document.querySelector('.chatbox');
const chat = document.querySelector('.chat');
const chatButton = document.querySelector('#chat-button');

popupCircle.addEventListener('click', () => {
  popupPanel.classList.toggle('active');
});

chatButton.addEventListener('click', () => {
  chatBox.classList.toggle('active');
});

themeButton.addEventListener("click", () => {
  if (themeButton.classList.contains("light")) {
    themeButton.innerHTML = "light_mode";
    themeButton.classList.remove("light");
    cssFile.href = "style.css";
  } else {
    themeButton.innerHTML = "dark_mode";
    themeButton.classList.add("light");
    cssFile.href = "light-mode.css";
  }
});

if (chat.childElementCount == 0){
  chat.innerHTML = "NO MESSAGE"
  chat.classList = "no-message"
};


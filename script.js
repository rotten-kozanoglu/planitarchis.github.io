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

const popupButton = document.querySelector('.popup-button');
const popupPanel = document.querySelector('.popup-panel');

popupButton.addEventListener('click', () => {
  popupPanel.classList.toggle('active');
});

themeButton.addEventListener("click", () => {
  if (themeButton.className == "fa-solid fa-sun"){
    themeButton.className = "fa-solid fa-moon"
    cssFile.href = 'dark-mode.css'
  } else{
    themeButton.className = "fa-solid fa-sun"
    cssFile.href = 'style.css'
  }
})

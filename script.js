const cursor = document.querySelector('.cursor');

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

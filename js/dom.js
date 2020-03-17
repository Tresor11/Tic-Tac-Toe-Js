/* eslint-disable func-names */
// eslint-disable-next-line func-names
// eslint-disable-next-line no-unused-vars
const dom = (function () {
  function getElement(id) {
    return document.getElementById(String(id));
  }

  function getName(num) {
    return getElement(num).value;
  }

  function getId(id) {
    const intId = getElement(id).id;
    // eslint-disable-next-line radix
    return parseInt(intId);
  }

  function render(id, cont) {
    getElement(id).innerText = cont;
  }

  function hide(id) {
    getElement(id).style.display = 'none';
  }

  function show(id) {
    getElement(id).style.display = 'block';
  }

  return {
    getElement,
    getId,
    render,
    getName,
    hide,
    show,
  };
}());
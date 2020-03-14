const dom = (function () {
  // eslint-disable-next-line no-unused-vars
  function getName(current) {
    return alert(`${current} enter your name`).value;
  }

  function getElement(id) {
    return document.getElementById(String(id));
  }

  function getId(id) {
    const intId = getElement(id).id;
    return parseInt(intId);
  }

  function render(id, cont) {
    getElement(id).innerText = cont;
  }
  return{
    getElement,
    getId,
    getName,
    render,
  }
}());

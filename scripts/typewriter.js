/**
 * 
 * @param {*} config 
 */

function write(config) {
    const typingSpeed = 60;
    const parent = document.querySelector(config.section)
    const target = document.querySelector(`${config.section} > div`)
    const nextSection = document.getElementById(config.next_section)
    const txt = target.innerHTML.trim()
    let to_print = '', left = 1, top = 5, gap = 15;
    let dontprint = false, speed = typingSpeed;

    parent.classList.remove('invisible')
    target.innerHTML = '' // clear the text first

    function typewriter(elem, i = 0) {
      if(i === 0) { elem.innerHTML = ''; to_print = ''; }

      // print individual characters
      to_print += txt[i];
      
      // if any of the tags are identified in the text, flag a `dontprint`
      if(txt[i] == '<' || txt[i] == '>') {
        dontprint = !dontprint
        speed = 0
      }
      
      // if `dontprint` is false, then...
      if(!dontprint) {
        speed = typingSpeed
        elem.innerHTML = to_print
      }
      
      // as soon as the last text is rendered, show the 'read more...' text & stop
      if(i == txt.length - 1) {
        nextSection.classList.remove('invisible')
        return;
      }

      setTimeout(() => typewriter(elem, i + 1), speed)
    }
  
    typewriter(target);
  }

export { write }
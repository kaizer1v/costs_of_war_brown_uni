/* -----
 * Scroll based events
 * -----
 */

document.addEventListener('DOMContentLoaded', () => {

  const sections = document.querySelectorAll('section');
  let to_print = '';
  const typingSpeed = 10;
  let loaded_s0 = false,
      loaded_s1 = false,
      loaded_s2 = false,
      loaded_s3 = false;

  // utility function to scroll down
  function scrollDown(by=100) {
    window.scrollBy({
        top: by,
        left: 0,
        behavior: 'smooth' // Smooth scrolling
    });
  }

  // on loading the page, show section 0 (first section)
  doSomethingForSection0();

  // subsequent sections are loaded when clicking on 'read more...'
  document.addEventListener('click', (event) => {
    if(event.target.tagName == 'A') {
      const anchor = event.target;
      const sectionID = (anchor.getAttribute('id')) ? anchor.getAttribute('id') : false;

      if(sectionID == 'for-1') {
        doSomethingForSection1()
        anchor.remove()
      }
      if(sectionID == 'for-2') {
        doSomethingForSection2()
        anchor.remove()
      }
      if(sectionID == 'for-3') {
        doSomethingForSection3()
        anchor.remove()
      }

      // check if the link clicked is for dialog stories
      if(anchor.classList.contains('link-for-section')) {
        console.log(anchor.dataset.dialogs)
        // get associated dialog IDs to highlight
        const dialogIDs = anchor.dataset.dialogs.split(' ')
        // make all the dialogs associated to the link zoomed-in
        dialogIDs.forEach(id => {
          const d = document.getElementById(`dialog-story${id}`)
          d.classList.remove('zoomout')
        })
      }
    }
  });

  // loading section 0
  function doSomethingForSection0() {
    if(loaded_s0) return;
    let left = 1, top = 5, gap = 3;
    const parent = document.querySelector('#story0')
    const target = document.querySelector('#story0 > div')
    parent.classList.remove('invisible');
    const nextSection = document.getElementById('for-1')
    let dontprint = false, speed = typingSpeed;

    function typewriter(elem, txt, i = 0) {
      if(i === 0)  { elem.innerHTML = ''; to_print = ''; }
      if(i == 286) { show_dialog('dialog-story0', left+=gap, top+=gap) }
      if(i == 375) { show_dialog('dialog-story1', left+=gap, top+=gap) }
  
      to_print += txt[i];
      
      // if any of the tags are identified in the text, speeden typing`
      if(txt[i] == '<' || txt[i] == '>') {
        dontprint = !dontprint
        speed = 0
      }
      
      // normally for everything that needs to be rendered on screen     
      if(!dontprint) {
        speed = typingSpeed
        elem.innerHTML = to_print
      }
      
      // as soon as the last text is rendered, show the 'read more...' text & stop
      if(i == txt.length - 1) {
        nextSection.classList.remove('invisible')
        loaded_s0 = true
        return;
      }

      setTimeout(() => typewriter(elem, txt, i + 1), speed)
    }
  
    typewriter(target, '\
      <h1>In 2006, Laura Bush said that America was going to Afghanistan to fight "the brutal oppression of women".\
        <span class="text-secondary">While we were busy fighting sexual oppression (among other things) in Afghanistan, we also\
          <a data-dialogs="0" class="p link-for-section">tried</a> to reduce sexual assaults in our own military, even if it\
          <a data-dialogs="1" class="n link-for-section">didn\'t</a> succeed at the start.\
        </span>\
      </h1>\
    ');
  }

  // loading section 1
  function doSomethingForSection1() {
    if(loaded_s1) return;
    let left = -10, top = 5, gap = 3;
    const parent = document.querySelector('#story1')
    const target = document.querySelector('#story1 > div')
    parent.classList.remove('invisible')
    const nextSection = document.getElementById('for-2')
    let dontprint = false, speed = typingSpeed;

    function typewriter(elem, txt, i = 0) {
      if(i === 0) { elem.innerHTML = ''; to_print = ''; }
      if(i == 95)  { show_dialog('dialog-story2', left+=gap, top+=gap) }
      if(i == 361) { show_dialog('dialog-story3', left+=gap, top+=gap) }
      if(i == 420) { show_dialog('dialog-story4', left+=gap, top+=gap) }
      if(i == 426) { show_dialog('dialog-story5', left+=gap, top+=gap) }
      if(i == 508) { show_dialog('dialog-story6', left+=gap, top+=gap) }
      if(i == 512) { show_dialog('dialog-story7', left+=gap, top+=gap) }
      
      to_print += txt[i];
      // if any of the tags are identified in the text, speeden typing`
      if(txt[i] == '<' || txt[i] == '>') {
        dontprint = !dontprint
        speed = 0
      }

      // normally for everything that needs to be rendered on screen
      if(!dontprint) {
        speed = typingSpeed
        elem.innerHTML = to_print
      }
      
      // as soon as the last text is rendered, show the 'read more...' text & stop
      if(i == txt.length - 1) {
        nextSection.classList.remove('invisible')
        loaded_s1 = true
        return
      }
      
      setTimeout(() => typewriter(elem, txt, i + 1), speed)
    }
  
    typewriter(target, '\
      <h1>We defeated the Taliban, established democracy, and helped\
        <a data-dialogs="2 3" class="e link-for-section">Afghanistan\'s</a> women feel safer. Women were playing a greater role within our armed forces, and we tried again to reduce sexual assaults in our own military. But it still didn\'t seem to work.\
      </h1>\
      <h1 class="text-secondary">Women were playing a\
        <a data-dialogs="4 5" class="p link-for-section">greater role</a> within our armed forces, and we\
        <a data-dialogs="6" class="p link-for-section">tried again</a> to reduce sexual assaults in our own military. But it\
        <a data-dialogs="7" class="n link-for-section">still didn\'t</a> seem to work.\
      </h1>\
    ');
  }

  // loading section 2
  function doSomethingForSection2() {
    if(loaded_s2) return;
    let left = 95, top = -10, gap = 3;
    const parent = document.querySelector('#story2')
    const target = document.querySelector('#story2 > div')
    parent.classList.remove('invisible')
    const nextSection = document.getElementById('for-3')
    let dontprint = false, speed = typingSpeed;

    function typewriter(elem, txt, i = 0) {
      if(i === 0)  { elem.innerHTML = ''; to_print = ''; }
      if(i == 95)  { show_dialog('dialog-story9',  left+=gap, top+=gap) }
      if(i == 161) { show_dialog('dialog-story10', left+=gap, top+=gap) }
      if(i == 120) { show_dialog('dialog-story11', left+=gap, top+=gap) }
      if(i == 130) { show_dialog('dialog-story12', left+=gap, top+=gap) }
      if(i == 132) { show_dialog('dialog-story13', left+=gap, top+=gap) }
      if(i == 283) { show_dialog('dialog-story14', left+=gap, top+=gap) }
      if(i == 285) { show_dialog('dialog-story15', left+=gap, top+=gap) }
      if(i == 287) { show_dialog('dialog-story16', left+=gap, top+=gap) }
      if(i == 290) { show_dialog('dialog-story17', left+=gap, top+=gap) }
  
      to_print += txt[i];
      // if any of the tags are identified in the text, speeden typing
      if(txt[i] == '<' || txt[i] == '>') {
        dontprint = !dontprint
        speed = 0
      }
      
      // normally for everything that needs to be rendered on screen
      if(!dontprint) {
        speed = typingSpeed
        elem.innerHTML = to_print
      }

      // as soon as the last text is rendered, show the 'read more...' text & stop
      if(i == txt.length - 1) {
        nextSection.classList.remove('invisible')
        loaded_s2 = true
        return;
      }
      setTimeout(() => typewriter(elem, txt, i + 1), speed)
    }
  
    typewriter(target, '\
      <h1>Ultimately, though, the war severely\
        <a data-dialogs="9 10 11 12 13 14" class="n link-for-section">worsened</a> Afghan women\'s lives.\
      </h1>\
      <h1 class="text-secondary">While we were busy\
        <a data-dialogs="15" class="p link-for-section">pretending</a> to help Afghanistan, we kept pretending to reduce sexual assaults in our own military. It\
        <a data-dialogs="16 17" class="n link-for-section">didn\'t work</a> at all.\
      </h1>\
    ');

    return false;
  }

  // loading section 3
  function doSomethingForSection3() {
    if(loaded_s3) return;
    const parent = document.querySelector('#story3')
    const target = document.querySelector('#story3 > div')
    parent.classList.remove('invisible');
    loaded_s3 = true;
    return false;
  }



  /**
   * Drag events
   */
  const draggables = document.querySelectorAll(".dialog-wrapper");
  let isDragging = false;
  let startX, startY, initialX, initialY, currentDraggable;
  const body = document.querySelector('body');
  const preventDefault = (e) => e.preventDefault();

  const findDraggable = (element) => {
    while (element && !element.classList.contains('dialog-wrapper')) {
      element = element.parentElement;
    }
    return element;
  };

  const onMouseDown = (e) => {
    currentDraggable = findDraggable(e.target);
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = currentDraggable.offsetLeft;
    initialY = currentDraggable.offsetTop;
    currentDraggable.style.cursor = 'grabbing';

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('scroll', preventDefault, { passive: false });
  }

  const onMouseMove = (e) => {
    if(!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    currentDraggable.style.left = `${initialX + dx}px`;
    currentDraggable.style.top = `${initialY + dy}px`;
  };

  const onMouseUp = () => {
    isDragging = false;
    currentDraggable.style.cursor = 'grab';

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('scroll', preventDefault);
  }

  // for touch devices
  const onTouchStart = (e) => {
    currentDraggable = findDraggable(e.target);
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    initialX = currentDraggable.offsetLeft;
    initialY = currentDraggable.offsetTop;

    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('scroll', preventDefault, { passive: false });
  };

  const onTouchMove = (e) => {
    if(!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    currentDraggable.style.left = `${initialX + dx}px`;
    currentDraggable.style.top = `${initialY + dy}px`;
    e.preventDefault(); // Prevent scrolling while dragging
  };

  const onTouchEnd = () => {
    isDragging = false;
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    document.removeEventListener('scroll', preventDefault);
  };

  // add the events
  draggables.forEach((draggable) => {
    draggable.addEventListener('mousedown', onMouseDown);
    draggable.addEventListener('touchstart', onTouchStart, { passive: false });
  })


  /**
   * Utility
   * Given a dialog id, unhide the dialog with that id
   * This is a one time function
   */
  function show_dialog(id, x, y) {
    const dialog = document.getElementById(id)
    
    if(dialog.classList.contains('invisible')) {
      dialog.classList.replace('invisible', 'visible')
      dialog.classList.add('reveal')
      dialog.classList.add('zoomout')
      dialog.style.top = `${y}%`;
      dialog.style.left = `${x}%`;
    }
  }

});
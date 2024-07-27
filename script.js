/* -----
 * Scroll based events
 * -----
 */

document.addEventListener('DOMContentLoaded', () => {

  const sections = document.querySelectorAll('section');
  const dialogs = document.querySelectorAll('.dialog-wrapper');
  let dialog_count = 0

  // utility function to scroll down
  function scrollDown(by=100) {
    window.scrollBy({
      top: by,
      left: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  }

  // on loading the page, show section 0 (first section)
  doSomethingForSection0()

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
        // get associated dialog IDs to highlight
        const dialogIDs = anchor.dataset.dialogs.split(' ')
        // make all the dialogs associated to the link zoomed-in
        dialogIDs.forEach(id => {
          const d = document.getElementById(`dialog-story${id}`)
          d.classList.replace('zoomout', 'zoomin')
          d.style.zIndex = 999;
        })
      }

      if(anchor.classList.contains('expand-collapse')) {
        anchor.parentElement.parentElement.classList.replace('zoomin', 'zoomout')
      }
    }
  })


  dialogs.forEach(dialog => {
    dialog.addEventListener('click', (event) => {
      const target = event.target;

      // Check if the click is on the dialog or its children
      if(dialog.contains(target)) {
        if(target === dialog) {
          // console.log(`dialog ${dialog.id} clicked`);
        } else {
          // console.log(`Child clicked in dialog ${dialog.id}:`, target.textContent);
          // zoom-in on the clicked dialog
          dialog.classList.replace('zoomout', 'zoomin')
          // ... and allow to drag
        }
      }
    });
  });

  function write(config) {
    const typingSpeed = 10;
    const parent = document.querySelector(config.section)
    const target = document.querySelector(`${config.section} > div`)
    const nextSection = document.getElementById(config.next_section)
    const typethis = target.innerHTML
    let to_print = '', left = 1, top = 5, gap = 3;
    let dontprint = false, speed = typingSpeed;

    parent.classList.remove('invisible')
    target.innerHTML = '' // clear the text first

    function typewriter(elem, txt, i = 0) {
      if(i === 0) { elem.innerHTML = ''; to_print = ''; }
      if(i in config.char_positions) {
        // const dialog_pos = document.querySelectorAll('.link-for-section')[dialog_count].getBoundingClientRect()
        // dialog_count++;
        // console.log(dialog_pos.x, dialog_pos.y)
        show_dialog(config.char_positions[i], left+=gap, top+=gap)
      }
  
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
  
    typewriter(target, typethis);
  }

  // loading section 0
  function doSomethingForSection0() {
    write({
      section: '#story0',
      next_section: 'for-1',
      char_positions: {
        310: 'dialog-story0',
        375: 'dialog-story1',
      } 
    })
  }

  // loading section 1
  function doSomethingForSection1() {
    write({
      section: '#story1',
      next_section: 'for-2',
      char_positions: {
         95: 'dialog-story2',
        361: 'dialog-story3',
        420: 'dialog-story4',
        426: 'dialog-story5',
        508: 'dialog-story6',
        512: 'dialog-story7'
      } 
    })
  }

  // loading section 2
  function doSomethingForSection2() {
    write({
      section: '#story2',
      next_section: 'for-3',
      char_positions: {
         95: 'dialog-story9',
        161: 'dialog-story10',
        120: 'dialog-story11',
        130: 'dialog-story12',
        132: 'dialog-story13',
        283: 'dialog-story14',
        285: 'dialog-story15',
        287: 'dialog-story16',
        290: 'dialog-story17'
      }
    })
  }

  // loading section 3
  function doSomethingForSection3() {
    const parent = document.querySelector('#story3')
    const target = document.querySelector('#story3 > div')
    parent.classList.remove('invisible');
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
    // allow dialog to be draggable only when in `zoomin` state
    while(element && !element.classList.contains('dialog-wrapper')) {
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
    currentDraggable.style.cursor = 'move';

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
  function show_dialog(id, left, top) {
    const dialog = document.getElementById(id)
    
    if(dialog.classList.contains('invisible')) {
      dialog.classList.remove('invisible')
      dialog.classList.add('reveal')
      dialog.classList.add('zoomout')
      dialog.style.top = `${top}%`;
      dialog.style.left = `${left}%`;
    }
  }

});
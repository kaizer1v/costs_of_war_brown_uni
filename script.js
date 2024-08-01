/* -----
 * Scroll based events
 * -----
 */

document.addEventListener('DOMContentLoaded', () => {

  const dialogs = document.querySelectorAll('.dialog-wrapper');

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
    const txt = target.innerHTML.trim()
    let to_print = '', left = 1, top = 5, gap = 15;
    let dontprint = false, speed = typingSpeed;

    parent.classList.remove('invisible')
    target.innerHTML = '' // clear the text first

    function typewriter(elem, i = 0) {
      if(i === 0) { elem.innerHTML = ''; to_print = ''; }

      // if index is a char position to be watched, then...
      if(i in config.char_positions) {
        const d = config.char_positions[i];

        // ...at specific char index, show specific dialogs
        show_dialog(
          d['name'],
          (d['left'] != 0) ? d['left'] : left+=gap,
          (d['top'] != 0) ? d['top'] : left+=gap,
        )
      }
  
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

  // loading section 0
  function doSomethingForSection0() {
    write({
      section: '#story0',
      next_section: 'for-1',
      char_positions: {
        310: { name: 'dialog-story0', top: 0, left: 0 },
        375: { name: 'dialog-story1', top: 234, left: 365 }
      } 
    })
  }

  // loading section 1
  function doSomethingForSection1() {
    write({
      section: '#story1',
      next_section: 'for-2',
      char_positions: {
         95: { name: 'dialog-story2', top: 0, left: 0 },
        361: { name: 'dialog-story3', top: 0, left: 0 },
        420: { name: 'dialog-story4', top: 0, left: 0 },
        426: { name: 'dialog-story5', top: 0, left: 0 },
        508: { name: 'dialog-story6', top: 0, left: 0 },
        512: { name: 'dialog-story7', top: 0, left: 0 }
      } 
    })
  }

  // loading section 2
  function doSomethingForSection2() {
    write({
      section: '#story2',
      next_section: 'for-3',
      char_positions: {
         95: { name: 'dialog-story9', top: 0, left: 0 },
        161: { name: 'dialog-story10', top: 0, left: 0 },
        120: { name: 'dialog-story11', top: 0, left: 0 },
        130: { name: 'dialog-story12', top: 0, left: 0 },
        132: { name: 'dialog-story13', top: 0, left: 0 },
        283: { name: 'dialog-story14', top: 0, left: 0 },
        285: { name: 'dialog-story15', top: 0, left: 0 },
        287: { name: 'dialog-story16', top: 0, left: 0 },
        290: { name: 'dialog-story17', top: 0, left: 0 }
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
      dialog.style.top = `${top}px`;
      dialog.style.left = `${left}px`;
    }
  }


  /**
   * Utility
   * scroll the page down by `y` pixels vertically
   */
  function scrollDown(by=100) {
    window.scrollBy({
      top: by,
      left: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  }

});
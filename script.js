/* -----
 * Scroll based events
 * -----
 */

document.addEventListener('DOMContentLoaded', () => {
  // ensure the page starts from the top
  // window.scrollTo(0, 0);

  const sections = document.querySelectorAll('section');
  let to_print = '';
  const typingSpeed = 10;
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.4 // Trigger callback when 50% of the section is visible
  };

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('scroll', preventScroll, { passive: false });
  };

  const enableScroll = () => {
    document.body.style.overflow = 'auto';
    window.removeEventListener('scroll', preventScroll, { passive: false });
  };

  const preventScroll = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  disableScroll();

  const observer = new IntersectionObserver(async (entries, observer) => {
    for(const entry of entries) {
      if(entry.isIntersecting) {
        console.log(`In viewport: ${entry.target.id}`);

        // Perform any other actions you want when the section is in the viewport
        switch(entry.target.id) {
          case 'story0':
            doSomethingForSection0();
            break;
          case 'story1':
            doSomethingForSection1();
            break;
          case 'story2':
            doSomethingForSection2();
            break;
        }
        // Unobserve the section so the callback runs only once
        observer.unobserve(entry.target);
      }
    }
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });


  function doSomethingForSection0() {
    const target = document.querySelector('#story0 > div')
    function typewriter(elem, txt, i = 0) {
      if(i === 0) { elem.innerHTML = ''; to_print = ''; }
      if(i == 286) { show_dialog('dialog-story0', 0, 10) }
      if(i == 375) { show_dialog('dialog-story1', 10, 30) }
  
      to_print += txt[i];
      elem.innerHTML = to_print
      if(i === txt.length - 1) return;
      setTimeout(() => typewriter(elem, txt, i + 1), typingSpeed)
    }
  
    typewriter(target, '\
      <h1>In 2006, Laura Bush said that America was going to Afghanistan to fight</h1>\
      <h1>"the brutal oppression of women"</h1>\
      <h1 class="text-secondary">While we were busy fighting sexual oppression (among other things) in Afghanistan, we also<a class="p">tried</a> to reduce sexual assaults in our own military, even if it <a class="n">didn\'t</a> succeed at the start.</h1>\
      <p><a class="m" href="#story1">read more...</a></p>\
    ');
  }
  
  function doSomethingForSection1() {
    const target = document.querySelector('#story1 > div')
    function typewriter(elem, txt, i = 0) {
      if(i === 0) { elem.innerHTML = ''; to_print = ''; }
      if(i == 95)  { show_dialog('dialog-story2', -10, 10) }
      if(i == 361) { show_dialog('dialog-story3', -5, 15) }
      if(i == 420) { show_dialog('dialog-story4', 0, 20) }
      if(i == 426) { show_dialog('dialog-story5', 5, 25) }
      if(i == 508) { show_dialog('dialog-story6', 10, 30) }
      if(i == 512) { show_dialog('dialog-story7', 15, 35) }
  
      to_print += txt[i];
      elem.innerHTML = to_print
      if(i === txt.length - 1) return;
      setTimeout(() => typewriter(elem, txt, i + 1), typingSpeed)
    }
  
    typewriter(target, '\
      <h1>We defeated the Taliban, established democracy, and helped <a class="e">Afghanistan\'s</a> women feel safer. Women were playing a greater role within our armed forces, and we tried again to reduce sexual assaults in our own military. But it still didn\'t seem to work.</h1>\
      <h1 class="text-secondary">Women were playing a <a class="p">greater role</a> within our armed forces, and we <a class="p">tried again</a> to reduce sexual assaults in our own military. But it <a class="n">still didn\'t</a> seem to work.</h1>\
      <p><a class="m" href="#story2">continue reading...</a></p>\
    ');
  }
  
  function doSomethingForSection2() {
    const target = document.querySelector('#story2 > div')
    function typewriter(elem, txt, i = 0) {
      if(i === 0)  { elem.innerHTML = ''; to_print = ''; }
      if(i == 95)  { show_dialog('dialog-story9',  -20, -5) }
      if(i == 161) { show_dialog('dialog-story10', -15, 0) }
      if(i == 120) { show_dialog('dialog-story11', -10, 5) }
      if(i == 130) { show_dialog('dialog-story12', -5, 10) }
      if(i == 132) { show_dialog('dialog-story13', 0, 15) }
      if(i == 283) { show_dialog('dialog-story14', 5, 20) }
      if(i == 285) { show_dialog('dialog-story15', 40, 25) }
      if(i == 287) { show_dialog('dialog-story16', 15, 30) }
      if(i == 290) { show_dialog('dialog-story17', 20, 35) }
      if(i == txt.length - 5) { enableScroll(); }
  
      to_print += txt[i];
      elem.innerHTML = to_print
      if(i === txt.length - 1) return;
      setTimeout(() => typewriter(elem, txt, i + 1), typingSpeed)
    }
  
    typewriter(target, '\
      <h1>Ultimately, though, the war severely <a class="n">worsened</a> Afghan women\'s lives. </h1>\
      <h1 class="text-secondary">While we were busy <a class="p">pretending</a> to help Afghanistan, we kept pretending to reduce sexual assaults in our own military. It <a class="n">didn\'t work</a> at all.</h1>\
      <p><a class="m" href="#story3">continue...</a></p>\
    ');
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
      dialog.style.top = `${y}%`;
      dialog.style.left = `${x}%`;
    }
  }

});
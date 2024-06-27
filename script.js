/**
 * On loading the page, auto play the audio
 * https://developer.chrome.com/blog/autoplay/ - browsers don't allow autoplay but see hacks
 * */

let to_print = '';
const dialogs = document.querySelectorAll(".dialog-wrapper");
const dialogs_arr = [...dialogs]
const body = document.querySelector('body');

dialogs.forEach((wrapper) => {
  wrapper.addEventListener("mousedown", () => {
    wrapper.classList.add("active");
    wrapper.addEventListener("mousemove", onDrag);
  });
      // for touch
      wrapper.addEventListener("touchstart", () => {
        body.classList.add('disable-touch')
        wrapper.classList.add("active");
        wrapper.addEventListener("touchmove", onTouchDrag);
      });
  
  document.addEventListener("mouseup", () => {
    wrapper.classList.remove("active");
    wrapper.removeEventListener("mousemove", onDrag);
  });
      // for touch
      document.addEventListener("touchend", () => {
        wrapper.classList.remove("active");
        wrapper.removeEventListener("touchmove", onTouchDrag);
        body.classList.remove('disable-touch');
      });

  function onDrag({movementX, movementY}) {
    let getStyle = window.getComputedStyle(wrapper);
    let leftVal = parseInt(getStyle.left);
    let topVal = parseInt(getStyle.top);
    wrapper.style.left = `${leftVal + movementX}px`;
    wrapper.style.top = `${topVal + movementY}px`;
  }
  
  var previousTouch;
  function onTouchDrag(e) {
    const touch = e.touches[0];
  
    if (previousTouch) {
      movementX = touch.pageX - previousTouch.pageX;
      movementY = touch.pageY - previousTouch.pageY;
  
      let getStyle = window.getComputedStyle(wrapper);
      let leftVal = parseInt(getStyle.left);
      let topVal = parseInt(getStyle.top);
  
      wrapper.style.left = `${leftVal + movementX}px`;
      wrapper.style.top = `${topVal + movementY}px`;
    }
    previousTouch = touch;
  }
})



/** get all section.top positions */
let prev_section = 0, curr_section = 0;
const fns = [story_zero, story_one, story_two, story_three, story_four]
const sections = document.querySelectorAll('section');
const milestones = []
sections.forEach((elem, i) => {
  const props = elem.getBoundingClientRect()
  milestones.push(props['top'] + props['height'] / 2);  // until you scroll to atleast half of the next section
})

function get_section_index(pos, milestones) {
  return milestones.findIndex((m) => pos < m)
}

/** on scrolling, get the scroll position on the page & get which section you are viewing */
document.addEventListener("scroll", evt => {
	const pos = document.documentElement.scrollTop || document.body.scrollTop;
  curr_section = get_section_index(pos, milestones);
  if(prev_section != curr_section) {
    fns[curr_section]();
  }
})

/**
 * Given a dialog id, unhide the dialog with that id
 * This is a one time function
 */
function show_dialog(id) {
  const dialog = document.getElementById(id)
  if(dialog.classList.includes('invisible')) {
    dialog.classList.replace('invisible', 'visible')
    dialog.classList.add('reveal')
  }
}


/**
 * 
 */
function reveal_content(id) {
  const story_content = document.querySelector(`#story${id} > div`)
  if([...story_content.classList].includes('invisible')) {
    story_content.classList.replace('invisible', 'visible')
    story_content.classList.add('reveal')
  }
}


let story_zero_loaded = false;
function story_zero() {
  console.log('you are in section 0');
  if(story_zero_loaded == true) return;
  const target = document.querySelector('#story0 > div')
  function typewriter(elem, txt, i = 0) {
    if(i === 0) { elem.innerHTML = ''; to_print = ''; }
    console.log(txt[i], i);
    if(i == 309) {
      show_dialog('dialog-story0')
    }
    if(i == 419) {
      show_dialog('dialog-story1')
    }

    to_print += txt[i];
    elem.innerHTML = to_print
    if(i === txt.length - 1) return;
    setTimeout(() => typewriter(elem, txt, i + 1), 80)
  }

  typewriter(target, '\
    <h1>In 2006, Laura Bush said that America was going to Afghanistan to fight</h1>\
    <h2><em>"the brutal oppression of women"</em></h2>\
    <h3 class="text-secondary lh-lg">While we were busy fighting sexual oppression (among other things) in Afghanistan, we also<a class="p">tried</a> to reduce sexual assaults in our own military, even if it <a class="n">didn\'t</a> succeed at the start.</h3>\
  ');
  prev_section = curr_section;
  story_zero_loaded = true;
}

let story_one_loaded = false;
function story_one() {
  console.log('you are in section 1');
  if(story_one_loaded == true) return;
  const target = document.querySelector('#story1 > div')
  function typewriter(elem, txt, i = 0) {
    if(i === 0) { elem.innerHTML = ''; to_print = ''; }
    console.log(txt[i], i);
    if(i == 90) {
      // load news article
      show_dialog('dialog-story2')
    }
    if(i == 31) {
      // load second dialog (red)
      show_dialog('dialog-story3')
    }

    to_print += txt[i];
    elem.innerHTML = to_print
    if(i === txt.length - 1) return;
    setTimeout(() => typewriter(elem, txt, i + 1), 80)
  }

  typewriter(target, '\
    <h1>We defeated the Taliban, established democracy, and helped <a class="e">Afghanistan\'s</a> women feel safer. Women were playing a greater role within our armed forces, and we tried again to reduce sexual assaults in our own military. But it still didn\'t seem to work.</h1>\
    <h3 class="text-secondary lh-lg">Women were playing a <a class="p">greater role</a> within our armed forces, and we <a class="p">tried again</a> to reduce sexual assaults in our own military. But it <a class="p">still didn\'t</a> seem to work.</h3>\
  ');
  prev_section = curr_section;
  story_one_loaded = true;
}

function story_two() {
  // when in section 2, do the following
  console.log('you are in section 2');
  if(story_one_loaded == true) return;
  const target = document.querySelector('#story2 > div')
  function typewriter(elem, txt, i = 0) {
    if(i === 0) { elem.innerHTML = ''; to_print = ''; }
    console.log(txt[i], i);
    if(i == 90) {
      // load news article
      // show_dialog('dialog-story2')
    }
    if(i == 31) {
      // load second dialog (red)
      // show_dialog('dialog-story3')
    }

    to_print += txt[i];
    elem.innerHTML = to_print
    if(i === txt.length - 1) return;
    setTimeout(() => typewriter(elem, txt, i + 1), 80)
  }

  typewriter(target, '\
    <h1>Ultimately, though, the war severely <a class="e">worsened</a> Afghan women\'s lives.</h1>\
    <h3 class="text-secondary lh-lg">While we were busy pretending to help Afghanistan, we kept <a class="p">pretending</a> to reduce sexual assaults in our own military. It <a class="n>didn\'t</a> work at all.</h3>\
  ');
  prev_section = curr_section;
  story_one_loaded = true;
}

function story_three() {
  // when in section 3, do the following
  show_dialog(3)
  reveal_content(3)
  console.log('you are in section 3');
  prev_section = curr_section;
}

function story_four() {
  // when in section 3, do the following
  show_dialog(4)
  reveal_content(4)
  console.log('you are in section 4');
  prev_section = curr_section;
}

story_zero()


/**
 * Typewriter
 */
// const target = document.querySelector('#story0 > div')

// function typewriter(elem, txt, i = 0) {
//   if(i === 0) { elem.innerHTML = ''; to_print = ''; }
//   console.log(txt[i], i);
//   if(i == 309) {
//     // load first dialog (green)
//     show_dialog(0)
//   }
//   if(i == 419) {
//     // load second dialog (red)
//     show_dialog(1)
//   }

//   to_print += txt[i];
//   elem.innerHTML = to_print
//   if(i === txt.length - 1) return;
//   setTimeout(() => typewriter(elem, txt, i + 1), 80)
// }

// typewriter(target, '\
//   <h1>In 2006, Laura Bush said that America was going to Afghanistan to fight</h1>\
//   <h2><em>"the brutal oppression of women"</em></h2>\
//   <h3 class="text-secondary lh-lg">While we were busy fighting sexual oppression (among other things) in Afghanistan, we also<a class="text-white text-bg-success p-1">tried</a> to reduce sexual assaults in our own military, even if it <a class="text-white text-bg-danger p-1">didn\'t</a> succeed at the start.</h3>\
// ');
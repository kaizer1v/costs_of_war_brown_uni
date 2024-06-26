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
 * `id` is an index <int> (for now)
 */
function show_dialog(id) {
  if([...dialogs[id].classList].includes('invisible')) {
    dialogs[id].classList.replace('invisible', 'visible')
    dialogs[id].classList.add('reveal')
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



function story_zero() {
  // when in section 0, do the following
  // TODO: releval line by line
  console.log('you are in section 0');
  // const target = document.querySelector('.typewriter')
  // typewriter(target, 'In 2006, Laura Bush said that America was going to Afghanistan to fight')
  reveal_content(0)
  show_dialog(0)
  // window.setTimeout(() => {
  //   show_dialog(0)
  // }, 2000)
  prev_section = curr_section;
}

function story_one() {
  // when in section 1, do the following
  show_dialog(1)
  reveal_content(1)
  console.log('you are in section 1');
  prev_section = curr_section;
}

function story_two() {
  // when in section 2, do the following
  show_dialog(2)
  reveal_content(2)
  console.log('you are in section 2');
  prev_section = curr_section;
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

// story_zero()


/**
 * Typewriter
 */
const target = document.querySelector('.typewriter')

function typewriter(elem, txt, i = 0) {
  if(i === 0) { elem.innerHTML = ''; to_print = ''; }
  to_print += txt[i];
  elem.innerHTML = `<h2>${to_print}</h2>`
  if(i === txt.length - 1) return;
  setTimeout(() => typewriter(elem, txt, i + 1), 80)
}
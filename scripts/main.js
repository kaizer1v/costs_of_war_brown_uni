import { write } from './typewriter.js';
import { Drawer } from './drawer.js';

/**
 * Fetch the JSON data from the file and render the stories
 * @returns {Promise<void>}
 */
fetch('./data/stories.json')
  .then(response => {
    if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  })
  .then(data => {
    // console.log('Fetched JSON:', data)
    render_stories(data)
  })
  .catch(error => { console.error('Error fetching JSON:', error) })


/**
 * given a story data object, render the stories in the drawer
 * @param {json} story_data 
 */
function render_stories(story_data) {

  // initialise the drawer to show stories
  const drawer = new Drawer()

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
        // close existing drawer
        drawer.close()
        const dialogIDs = anchor.dataset.dialogs.split(' ')

        // get story objs from data
        const sel_story_objs = dialogIDs.map(index => story_data[index])
        drawer.open(sel_story_objs)
      }

      if(anchor.classList.contains('expand-collapse')) {
        anchor.parentElement.parentElement.classList.replace('zoomin', 'zoomout')
      }
    }
  })

  // loading section 0
  function doSomethingForSection0() {
    write({
      section: '#story0',
      next_section: 'for-1'
    })
  }

  // loading section 1
  function doSomethingForSection1() {
    write({
      section: '#story1',
      next_section: 'for-2'
    })
  }

  // loading section 2
  function doSomethingForSection2() {
    write({
      section: '#story2',
      next_section: 'for-3'
    })
  }

  // loading section 3
  function doSomethingForSection3() {
    const parent = document.querySelector('#story3')
    const target = document.querySelector('#story3 > div')
    parent.classList.remove('invisible');
  }
  


  /***
   * given a speed for scrolling, always scroll to the bottom
   * of the page as the height grows
   * 
   * @param {number} speed - the speed at which to scroll (not sure if the speed actually works)
   */
  function alwaysBottom(speed = 10) {
    function scrollStep() {
      let newPosition = window.scrollY + speed

      // Stop scrolling when reaching the bottom
      if(newPosition >= document.body.scrollHeight - window.innerHeight) {
        window.scrollTo(0, document.body.scrollHeight)
        return
      }
      window.scrollTo(0, newPosition)
      requestAnimationFrame(scrollStep)
    }

    requestAnimationFrame(scrollStep)
  }

  // observe changes in document's scrollHeight
  const observer = new MutationObserver(() => { alwaysBottom(20) })
  observer.observe(document.body, { childList: true, subtree: true, attributes: true })
}
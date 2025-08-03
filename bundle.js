/**
 * given a configuration object, write the text in a typewriter effect
 * @param {Object} config - Configuration object for the typewriter effect
 * @param {string} config.section - CSS selector for the section to display
 * @param {string} config.next_section - ID of the next section to reveal
 */

function write(config) {
    const typingSpeed = 60;
    const parent = document.querySelector(config.section);
    const target = document.querySelector(`${config.section} > div`);
    const nextSection = document.getElementById(config.next_section);
    const txt = target.innerHTML.trim();
    let to_print = '';
    let dontprint = false, speed = typingSpeed;

    parent.classList.remove('invisible');
    target.innerHTML = ''; // clear the text first

    function typewriter(elem, i = 0) {
      if(i === 0) { elem.innerHTML = ''; to_print = ''; }

      // print individual characters
      to_print += txt[i];
      
      // if any of the tags are identified in the text, flag a `dontprint`
      if(txt[i] == '<' || txt[i] == '>') {
        dontprint = !dontprint;
        speed = 0;
      }
      
      // if `dontprint` is false, then...
      if(!dontprint) {
        speed = typingSpeed;
        elem.innerHTML = to_print;
      }
      
      // as soon as the last text is rendered, show the 'read more...' text & stop
      if(i == txt.length - 1) {
        nextSection.classList.remove('invisible');
        return;
      }

      setTimeout(() => typewriter(elem, i + 1), speed);
    }
  
    typewriter(target);
  }

class Drawer {
  constructor(drawerSelector = '#drawer', closeBtnSelector = '#close_drawer') {
    this.drawer = document.querySelector(drawerSelector);
    this.drawerContent = this.drawer.querySelector('.drawer-content');
    this.btnClose = document.querySelector(closeBtnSelector);
    this.slideUp = new Audio('./assets/sound-slide-up.mp3');
    this.slideDown = new Audio('./assets/sound-slide-down.mp3');

    if (this.btnClose) {
      this.btnClose.addEventListener('click', () => this.close());
    }
  }

  /**
   * Opens the drawer with story data
   * @param {Array} stories - array of story objects
   */
  open(stories) {
    const storyType = stories[0]['type'];

    // Add classes
    this.drawer.classList.add('open', storyType);
    document.body.style.overflow = 'hidden';
    this.slideUp.play();

    // Clear content
    this.drawerContent.innerHTML = '';

    // Append stories
    stories.forEach((story, index) => {
      const item = document.createElement('div');
      item.classList.add('carousel-item', 'active');
      item.innerHTML = `
        <span>${story.year}</span>
        <p>${story.content}</p>
      `;
      this.drawerContent.appendChild(item);
    });
  }

  /**
   * Closes the drawer
   */
  close() {
    this.slideDown.play();
    this.drawer.classList.remove('open', 'positive', 'negative', 'neutral');
    document.body.style.overflow = 'auto';
  }

  /**
   * Replace currently shown story in the carousel (optional feature)
   * @param {number} index - index of the story to show
   */
  showStory(index) {
    const stories = this.drawerContent.querySelectorAll('.carousel-item');
    const current = this.drawerContent.querySelector('.carousel-item.active');
    if (current) current.classList.remove('active');
    if (stories[index]) stories[index].classList.add('active');
  }
}

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
    render_stories(data);
  })
  .catch(error => { console.error('Error fetching JSON:', error); });


/**
 * given a story data object, render the stories in the drawer
 * @param {json} story_data 
 */
function render_stories(story_data) {

  // initialise the drawer to show stories
  const drawer = new Drawer();

  // on loading the page, show section 0 (first section)
  doSomethingForSection0();

  // subsequent sections are loaded when clicking on 'read more...'
  document.addEventListener('click', (event) => {

    if(event.target.tagName == 'A') {
      const anchor = event.target;
      const sectionID = (anchor.getAttribute('id')) ? anchor.getAttribute('id') : false;

      if(sectionID == 'for-1') {
        doSomethingForSection1();
        anchor.remove();
      }
      if(sectionID == 'for-2') {
        doSomethingForSection2();
        anchor.remove();
      }
      if(sectionID == 'for-3') {
        doSomethingForSection3();
        anchor.remove();
      }

      // check if the link clicked is for dialog stories
      if(anchor.classList.contains('link-for-section')) {
        // close existing drawer
        drawer.close();
        const dialogIDs = anchor.dataset.dialogs.split(' ');

        // get story objs from data
        const sel_story_objs = dialogIDs.map(index => story_data[index]);
        drawer.open(sel_story_objs);
      }

      if(anchor.classList.contains('expand-collapse')) {
        anchor.parentElement.parentElement.classList.replace('zoomin', 'zoomout');
      }
    }
  });

  // loading section 0
  function doSomethingForSection0() {
    write({
      section: '#story0',
      next_section: 'for-1'
    });
  }

  // loading section 1
  function doSomethingForSection1() {
    write({
      section: '#story1',
      next_section: 'for-2'
    });
  }

  // loading section 2
  function doSomethingForSection2() {
    write({
      section: '#story2',
      next_section: 'for-3'
    });
  }

  // loading section 3
  function doSomethingForSection3() {
    const parent = document.querySelector('#story3');
    document.querySelector('#story3 > div');
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
      let newPosition = window.scrollY + speed;

      // Stop scrolling when reaching the bottom
      if(newPosition >= document.body.scrollHeight - window.innerHeight) {
        window.scrollTo(0, document.body.scrollHeight);
        return
      }
      window.scrollTo(0, newPosition);
      requestAnimationFrame(scrollStep);
    }

    requestAnimationFrame(scrollStep);
  }

  // observe changes in document's scrollHeight
  const observer = new MutationObserver(() => { alwaysBottom(20); });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true });
}

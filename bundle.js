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

  const btn_drawer_close = document.getElementById('close_drawer');
  const drawer = document.getElementById('drawer');
  btn_drawer_close.addEventListener('click', close_drawer);
  const slide_up = new Audio('./assets/sound-slide-up.mp3');
  const slide_down = new Audio('./assets/sound-slide-down.mp3');

  function close_drawer() {
    slide_down.play();
    drawer.classList.remove('open', 'positive', 'negative', 'neutral');

    // enable scroll on the body
    document.body.style.overflow = 'auto';
  }

  /**
   * Given an array of story objects, load the stories into the drawer
   * @param {arr} stories
   * 
   */
  function load_drawer(stories) {
    const story_type = stories[0]['type'];

    // open the drawer
    drawer.classList.add('open', story_type);

    // disable scroll on the body
    document.body.style.overflow = 'hidden';

    // play open sound
    slide_up.play();
        
    // load story into the dialog
    const drawer_content = document.querySelector('.drawer .drawer-content');
    drawer_content.innerHTML = '';
    document.createElement('div');

    stories.forEach((story, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      // if(index == 0) carouselItem.classList.add('active')
      carouselItem.classList.add('active');
      carouselItem.innerHTML = `
        <span>${story.year}</span>
        <p>${story.content}</p>
      `;
      drawer_content.appendChild(carouselItem);
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
        close_drawer();
        const dialogIDs = anchor.dataset.dialogs.split(' ');

        // get story objs from data
        const sel_story_objs = dialogIDs.map(index => story_data[index]);
        load_drawer(sel_story_objs);
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

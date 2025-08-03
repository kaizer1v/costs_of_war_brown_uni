import { write } from './typewriter.js';

// maintaining a story map, associating the keyword to the set of stories to open
const story_data = {
  0: {'index': '0', 'type': 'neutral', 'year': '2008', 'trigger': 'said', 'content': 'The invasion of Afghanistan was justified in the name of women\'s rights - Laura Bush in her statement, "the brutal oppression of women," calling this oppression "a central goal of the terrorists" with whom the United States was now at war.'},
  1: {'index': '1', 'type': 'positive', 'year': '2008', 'trigger': 'tried', 'content': 'The 2004 inquiry led to the establishment of the Department of Defense Sexual Assault Prevention and Response Office (SAPRO). In addition to serving as a central point for training, resources, and implementation of policy within each branch of the armed services, SAPRO tracks reports of sexual assault in each year and releases results from a biannual survey that includes a measure to estimate how many service members experienced sexual assault in a given year.'},
  2: {'index': '2', 'type': 'negative', 'year': '2008', 'trigger': 'didnt', 'content': '<iframe width="100%" src="https://www.youtube.com/embed/fUmP281en24?si=Z9DHz3ivvEc8dfYF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>'},
  3: {'index': '3', 'type': 'positive', 'year': '2008', 'trigger': 'Afghanisthan', 'content': 'Beth was a logistics officer volunteerly deployed in Afghanisthan on a female engagement team (FET). Her position as a woman within the Green Barrett team was "an invaluable tool" when it came to collecting information from Afghan women about sympathetic residents.'},
  4: {'index': '4', 'type': 'positive', 'year': '2008', 'trigger': 'Afghanisthan', 'content': 'Edith, a young Hispanic woman from a poor background, was deployed as a supply clerk. She saw the army as a more meritocratic workplace than the civilian jobs in the US South where she always felt looked down upon. '},
  5: {'index': '5', 'type': 'positive', 'year': 'some year', 'trigger': 'greater role', 'content': 'lorem ipsum doler sit amet'},
  6: {'index': '6', 'type': 'positive', 'year': '2010', 'trigger': 'greater role', 'content': 'The 2010 reforms opened access for veterans (like Edith) who were otherwise denied healthcare, now to be able to make a connection by allowing deployment to a combat zone in any capacity not just combat roles to serve in place of what was before a requirement to prove a specific "event" caused one\'s PTSD.'},
  7: {'index': '7', 'type': 'negative', 'year': '2010', 'trigger': 'tried again', 'content': '<p>However, the reforms did not extend to PTSD claims in which the cause of PTSD is sexual assault.</p><p>When Edith finally did seek mental health services at the VA, the clinician did not believe that she had been in the sort of combat she described. </p>'},
  8: {'index': '8', 'type': 'negative', 'year': '2010', 'trigger': 'still didnt', 'content': 'Veteran advocacy groups continue to note in documentation as recent as 2022 the persistent myth among medical service providers that "women do not serve in combat." This translates into higher denial rates of post-traumatic stress disorder (PTSD) diagnosis for women and is thus a barrier to accessing treatment and services.'},
  9: {'index': '9', 'type': 'negative', 'year': '2010', 'trigger': 'worsened', 'content': 'A full 100 percent of households headed by women in Afghanistan went hungry in 2022, including an estimated 2 million widows.'},
  10: {'index': '10', 'type': 'negative', 'year': '2010', 'trigger': 'worsened', 'content': 'The RAND study also found that 10 percent of active-duty service members experienced some form of discrimination that violates the military\'s own equal opportunity program, including sexual harassment, hostile work environment, sexual quid pro quo, or gender-based derogatory comments or mistreatment (26 percent of women and 7.4 percent of men, only 0.01 percent of which were reported.)'},
  11: {'index': '11', 'type': 'negative', 'year': '2010', 'trigger': 'worsened', 'content': 'Human Rights Watch published a report in which it found many victims of sexual assault faced fear of retaliation given that "military service members who reported retaliation were 12 times more likely to suffer retaliation for doing so than to see their offender, if a service member, convicted for a sex offense." The report warned that any gains in reporting would be lost if victims who report their assaults continued to experience retaliation. Sadly, this seems to be the exact pattern that played out over the following 5-6 years, with reporting rates falling gradually after 2016 to 30% in 2018 and more drastically to 20% in 2021'},
  12: {'index': '12', 'type': 'negative', 'year': '2018', 'trigger': 'worsened', 'content': '<p>In 2018, sexual assault prevalence increased by 44 percent among women. More than 2,000 Service members were the victims of sexual assault that year (13,000 women and 7,500 men).</p><p>Fewer than 8,000 per year reported that assault, according to the Department\'s own annual surveys. The sexual harassment numbers are bleaker, with about one in every four active duty women reporting experiences of sexual harassment. Yet DoD received only 1,781 reports of sexual harassment in FY20.</p>'},
  13: {'index': '13', 'type': 'negative', 'year': '2010', 'trigger': 'worsened', 'content': 'The body of Sgt. Elder Fernandes, age 23, was found hanging from a tree outside of the same Fort Hood installation. Fernandes killed himself after he was sexually assaulted by his sergeant, reported the offense, and was retaliated against instead of believed or assisted.'},
  14: {'index': '14', 'type': 'negative', 'year': '2010', 'trigger': 'worsened', 'content': 'The 2022 report (which gives a snapshot of numbers from 2021) was especially concerning in that it showed that "not only is unwanted sexual contact rising, but fewer people are opting to report it, and fewer perpetrators are being legally punished."'},
  15: {'index': '15', 'type': 'positive', 'year': '2010', 'trigger': 'pretending', 'content': 'The "I am Vanessa Guillen Act" (Military Justice Improvement Prevention Act) represents a meaningful shift to remove military commanders from prosecuting military sexual assault, instead using a special council.'},
  16: {'index': '16', 'type': 'negative', 'year': '2010', 'trigger': 'didnt work', 'content': 'Pvt. Ana Fernanda Basaldua Ruiz was found dead, also at Fort Hood, in March 2023. Basaldua had also told her family she was being sexually harassed by a superior before her death.'},
  17: {'index': '17', 'type': 'negative', 'year': '2010', 'trigger': 'didnt work', 'content': 'NDAA removed important elements of the Act that had passed in the Senate, which would have taken military commanders out of the chain of command and judicial procedures if their subordinate is accused of sexual harassment or assault...'},
  18: {'index': '18', 'type': 'positive', 'year': '2010', 'trigger': '', 'content': '... this meant that while including important reforms such as making sexual harassment a crime under the UCMJ, the 2022 protections still allowed commanders to choose juries and witnesses, grant or deny witness immunity, and offer their subordinates the option of separating from the military instead of facing justice.'},
}

document.addEventListener('DOMContentLoaded', () => {

  const btn_drawer_close = document.getElementById('close_drawer');
  const drawer = document.getElementById('drawer');
  btn_drawer_close.addEventListener('click', close_drawer);
  const slide_up = new Audio('./sound-slide-up.mp3');
  const slide_down = new Audio('./sound-slide-down.mp3');

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
    const story_type = stories[0]['type']

    // open the drawer
    drawer.classList.add('open', story_type);

    // disable scroll on the body
    document.body.style.overflow = 'hidden';

    // play open sound
    slide_up.play();
        
    // load story into the dialog
    const drawer_content = document.querySelector('.drawer .drawer-content');
    drawer_content.innerHTML = '';
    const story_content = document.createElement('div');

    stories.forEach((story, index) => {
      const carouselItem = document.createElement('div')
      carouselItem.classList.add('carousel-item')
      // if(index == 0) carouselItem.classList.add('active')
      carouselItem.classList.add('active')
      carouselItem.innerHTML = `
        <span>${story.year}</span>
        <p>${story.content}</p>
      `;
      drawer_content.appendChild(carouselItem)
    });

    // show the selected story in the carousel
    function show_story(story_index) {
      const stories_div = document.querySelectorAll('.carousel-item')
      const curr_story_div = document.querySelector('.carousel-item.active')
      curr_story_div.classList.remove('active')
      stories_div[story_index].classList.add('active')
    }
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
        // close existing drawer
        close_drawer()
        const dialogIDs = anchor.dataset.dialogs.split(' ');

        // get story objs from data
        const sel_story_objs = dialogIDs.map(index => story_data[index]);
        load_drawer(sel_story_objs);
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
})
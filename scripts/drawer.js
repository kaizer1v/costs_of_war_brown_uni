export class Drawer {
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

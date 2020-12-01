export default class HorizontalScrollBarHandler {
  constructor(navElement) {
    this.navElement = navElement;
  }

  perform() {
    this.partitionNavItems();
    this.bindHandleEvents();
    this.toggleArrows();
  }

  partitionNavItems() {
    this.activeAnchorIndex = 0;
    this.anchorElementIndex = [0];
    let wrapElementWidth = this.wrapElement().outerWidth();
    let partitionWidth = 0;
    let self = this;

    this.navItems().each(function (index) {
      partitionWidth += $(this).outerWidth();
      if (partitionWidth >= wrapElementWidth) {
        partitionWidth = $(this).outerWidth();
        self.anchorElementIndex.push(index);
      }
    });
  }

  bindHandleEvents() {
    let self = this;

    this.rightArrowElement().off('click').on('click', function () {
      self.scroll(-self.offsetOfAnchorElement(self.getNextAnchorIndex(true)))
    });

    this.leftArrowElement().off('click').on('click', function () {
      self.scroll(-self.offsetOfAnchorElement(self.getNextAnchorIndex(false)))
    });

    $(window).off('resize').on('resize', function (e) {
      self.partitionNavItems();
      self.scroll(0);
    });
  }

  scroll(offset) {
    let self = this;
    self.navElement.stop().animate({ left: offset + "px" }, 250, function () {
      self.toggleArrows();
    });
  }

  offsetOfAnchorElement(anchorIndex) {
    let partitionWidth = 0;
    let offset = 0;

    this.navItems().each(function (index) {
      if (index == anchorIndex) {
        offset = partitionWidth;
      } else {
        partitionWidth += $(this).outerWidth();
      }
    });

    return offset;
  }

  getNextAnchorIndex(next = true) {
    if (next) {
      this.activeAnchorIndex++;
    } else {
      this.activeAnchorIndex--;
    }

    if (this.activeAnchorIndex < 0) this.activeAnchorIndex = 0;
    if (this.activeAnchorIndex > this.anchorElementIndex.length - 1) this.activeAnchorIndex = this.anchorElementIndex.length - 1;

    return this.anchorElementIndex[this.activeAnchorIndex];
  }

  wrapElement() {
    return this.navElement.closest('.scrollbar-nav');
  }

  navItems() {
    return this.navElement.find('.nav-item');
  }

  toggleArrows() {
    if (this.anchorElementIndex.length == 1) {
      this.leftArrowElement().css('display', 'none');
      this.rightArrowElement().css('display', 'none');
    } else {
      this.leftArrowElement().css('display', this.activeAnchorIndex == 0 ? 'none' : 'flex')
      this.rightArrowElement().css('display', this.activeAnchorIndex == this.anchorElementIndex.length - 1 ? 'none' : 'flex')
    }
  }

  leftArrowElement() {
    return this.wrapElement().find('.scroller-left');
  }

  rightArrowElement() {
    return this.wrapElement().find('.scroller-right');
  }
}

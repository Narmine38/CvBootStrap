class StickyNavigation {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    let self = this;
    $(".et-hero-tab").click(function () {
      self.onTabClick(event, $(this));
    });
    $(window).scroll(() => {
      this.onScroll();
    });
    $(window).resize(() => {
      this.onResize();
    });
  }

  onTabClick(event, element) {
    event.preventDefault();
    let scrollTop =
      $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
    $("html, body").animate(
      {
        scrollTop: scrollTop,
      },
      600
    );
  }

  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkTabContainerPosition() {
    let offset =
      $(".et-hero-tabs").offset().top +
      $(".et-hero-tabs").height() -
      this.tabContainerHeight;
    if ($(window).scrollTop() > offset) {
      $(".et-hero-tabs-container").addClass("et-hero-tabs-container--top");
    } else {
      $(".et-hero-tabs-container").removeClass("et-hero-tabs-container--top");
    }
  }

  findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $(".et-hero-tab").each(function () {
      let id = $(this).attr("href");
      let offsetTop = $(id).offset().top - self.tabContainerHeight;
      let offsetBottom =
        $(id).offset().top + $(id).height() - self.tabContainerHeight;
      if (
        $(window).scrollTop() > offsetTop &&
        $(window).scrollTop() < offsetBottom
      ) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if (this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.css("width");
      left = this.currentTab.offset().left;
    }
    $(".et-hero-tab-slider").css("width", width);
    $(".et-hero-tab-slider").css("left", left);
  }
}

new StickyNavigation();

// background

// animation lettre

Letters = function () {
  this.lettersDOM = null;
  this.active = null;
  this.letters = [];
  this.alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "i",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "~",
    "&",
    "|",
    "^",
    "ç",
    "@",
    "]",
    "[",
    "{",
    "}",
    "ù",
    "*",
    "µ",
    "¤",
    "$",
    "£",
    "€",
    "°",
    ")",
    "(",
    "+",
    "-",
    "/",
    "<",
    ">",
    "²",
    "`",
    "é",
    "è",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];

  return this;
};

Letters.prototype.init = function (word) {
  this.lettersDOM = document.querySelectorAll(".letter");
  this.active = true;
  var i;
  var nextChar;
  var lettersMax = this.lettersDOM.length;

  for (i = 0; i < this.lettersDOM.length; i++) {
    if (word.charAt(i) != "") nextChar = word.charAt(i);
    else nextChar = false;

    this.letters.push(new Letter(this.lettersDOM[i], nextChar));
  }

  if (word.length > lettersMax) {
    var wordContainer = document.getElementById("word");

    for (i = lettersMax; i < word.length; i++) {
      var letterSpan = document.createElement("span");
      letterSpan.innerHTML = "";
      letterSpan.classList.add("letter");
      wordContainer.appendChild(letterSpan);
      this.letters.push(new Letter(letterSpan, word.charAt(i)));
    }
  }

  this.animate();

  return this;
};

Letters.prototype.animate = function () {
  var i;
  var random;
  var char;

  if (this.active) {
    window.requestAnimationFrame(this.animate.bind(this));

    var indexes = [];

    for (i = 0; i < this.letters.length; i++) {
      var current = this.letters[i];

      if (!current.isDead) {
        random = Math.floor(Math.random() * (this.alphabet.length - 0));
        char = this.alphabet[random];
        current.render(char);
      } else {
        indexes.push(i);
      }
    }

    for (i = 0; i < indexes.length; i++) {
      this.letters.splice(indexes[i], 1);
    }

    if (this.letters.length == 0) {
      this.stop();
    }
  }
};

Letters.prototype.start = function (word) {
  this.init(word);
};

Letters.prototype.stop = function () {
  this.active = false;
};

Letter = function (DOMElement, nextChar) {
  var scope = this;

  this.DOMEl = DOMElement;
  this.char = DOMElement.innerHTML;
  this.next = nextChar;
  this.speed = Math.floor(Math.random() * (300 - 50));
  this.total = 0;
  this.duration = 700;
  this.animating = true;
  this.isDead = false;

  this.timer = setInterval(function () {
    if (scope.animating === true) {
      scope.total += scope.speed;
    }
    scope.animating = !scope.animating;
  }, this.speed);

  this.animate();

  return this;
};

Letter.prototype.animate = function () {
  var i;
  var random;

  if (!this.isDead) {
    window.requestAnimationFrame(this.animate.bind(this));
  }

  if (this.total < this.duration) {
    if (this.animating) {
      this.DOMEl.innerHTML = this.char;
    }
  } else {
    this.isDead = true;

    if (!this.next) {
      var parent = document.getElementById("word");
      parent.removeChild(this.DOMEl);
      return;
    }

    this.DOMEl.innerHTML = this.next;
  }
};

Letter.prototype.render = function (char) {
  if (!this.animating) {
    this.char = char;
  }
};

var word = [
  "CURIEUX",
  "RIGOUREUX",
  "AUTONOME",
  "RESPECTUEUX",
  "CRÉATIF",
  "CURIEUX",
];
var nextWord = 1;

var letters = new Letters();

setTimeout(function () {
  letters.start(word[nextWord]);

  setInterval(function () {
    nextWord++;
    if (nextWord >= word.length) nextWord = 0;

    letters.start(word[nextWord]);
  }, 5000);
}, 2000);

// formation/stage

VanillaTilt.init(document.querySelectorAll(".box"), {
  max: 25,
  speed: 400,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  perspective: 500,
  transition: true,
});

// Poke me

$(function () {
  $(".material-card > .mc-btn-action").click(function () {
    var card = $(this).parent(".material-card");
    var icon = $(this).children("i");
    icon.addClass("fa-spin-fast");

    if (card.hasClass("mc-active")) {
      card.removeClass("mc-active");

      window.setTimeout(function () {
        icon
          .removeClass("fa-arrow-left")
          .removeClass("fa-spin-fast")
          .addClass("fa-bars");
      }, 800);
    } else {
      card.addClass("mc-active");

      window.setTimeout(function () {
        icon
          .removeClass("fa-bars")
          .removeClass("fa-spin-fast")
          .addClass("fa-arrow-left");
      }, 800);
    }
  });
});

//

// la promo

$("#circleDrop").click(function () {
  $(".card-middle").slideToggle();
  $(".close").toggleClass("closeRotate");
});

// 



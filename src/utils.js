import Config from './config.json';
import $ from 'jquery'; // needed this to make info.test.js work as it imports hideLoadingPH below??

const hideLoadingPH = () => $('#loadingPH').hide(); // hide content placeholder (loading)

const uniqueId = num => {
  // unique id 1 in 10^15 chance of collision
  if (typeof num === 'number') {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push(
        Math.random()
          .toString(36)
          .substring(2) + new Date().getTime().toString(36)
      );
    }
    return arr;
  }
};

const pageTitle = pathName => {
  // document page title
  var pgeTitle = Config.siteTitle;
  switch (pathName) {
    case '/':
      break;
    case 'showlist':
      pgeTitle += ' - Show List';
      break;
    case 'actors':
      pgeTitle += ' - Actors';
      break;
    default:
      pgeTitle += ' - ' + pathName;
      break;
  }
  return pgeTitle;
};

const showListURL = searchTerm => {
  // construct ShowList URL
  if (typeof searchTerm === 'string') {
    return Config.searchURL + encodeURI(searchTerm) + Config.apiKeyParam;
  }
};

const dateDMY = val => {
  // change date format
  if (typeof val === 'string') {
    return val
      .split('-')
      .reverse()
      .join('/');
  }
};

const getNamesStr = arr => {
  // get name values from arrays
  if (Array.isArray(arr)) {
    return arr.map(x => x.name).join(', ');
  }
};

const strConcat = (str, len) => {
  // shorten long movie plots
  if (typeof str === 'string' && str.length > len) {
    str = str.substring(0, len);
    var lastSpace = str.lastIndexOf(' ');
    str = str.substring(0, lastSpace) + '...';
  }
  return str;
};

const showCatURL = cat => {
  // return category URL for homepage
  switch (cat) {
    case 'Now Playing':
      return Config.nowPlayingURL;
    case 'Top Rated':
      return Config.topRatedURL;
    case 'Popular':
      return Config.popularURL;
    case 'Upcoming':
      return Config.upcomingURL;
  }
};

const toggleList = e => {
  // show/hide cast/similar on show page
  var text = e.target.innerText;
  var target = '.' + e.target.id + '.hide';
  $(target).toggleClass('reveal');
  e.target.innerText =
    text.indexOf('more') === -1
      ? text.replace('less', 'more')
      : text.replace('more', 'less');
};

const error = error => {
  console.log(new Error(error));
};

function fetchSingle(url) {
  if (url && typeof url === 'string') {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(this);
        this.setState({ data: data });
        hideLoadingPH();
      })
      .catch(err => error(err));
  }
}

function fetchMultiple(urls, page) {
  if (Array.isArray(urls)) {
    var apiRequests = [];
    for (var i = 0; i < urls.length; i++) {
      apiRequests[i] = fetch(urls[i])
        .then(response => response.json())
        .catch(err => console.log(new Error(err)));
    }

    Promise.all(apiRequests)

      .then(data => {
        if (page === 'home') {
          let combinedData = [];
          data.map((arr, ind) => {
            if (arr && arr.results) {
              const arr3Items = arr.results
                .sort(() => 0.5 - Math.random())
                .slice(0, Config.homePageResultsLimit); // just return top 3 results
              for (let i = 0; i < arr3Items.length; i++) {
                // add category css class for different styling
                let el = arr3Items[i];
                el['css_class'] = this.categorys[ind];
              }
              //create 4 arrays, one with title and 3 with data
              combinedData = combinedData
                .concat(this.categorys[ind])
                .concat(arr.results.slice(0, 3));
            }
          });
          this.setState({ data: combinedData });
        } else {
          this.setState({ data: data });
        }
        hideLoadingPH();
      })

      .then(() => {
        // bootstrap carousel on actor page
        if (page === 'actor') {
          $('#carouselActor').on('slide.bs.carousel', function(e) {
            const $e = $(e.relatedTarget);
            const idx = $e.index();
            const itemsPerSlide = 4;
            const totalItems = $('.carousel-item').length;

            if (idx >= totalItems - (itemsPerSlide - 1)) {
              const it = itemsPerSlide - (totalItems - idx);
              const carItem = $('.carousel-item');
              for (var i = 0; i < it; i++) {
                if (e.direction === 'left') {
                  carItem.eq(i).appendTo('.carousel-inner');
                } else {
                  carItem.eq(0).appendTo('.carousel-inner');
                }
              }
            }
          });
        }
      })
      .catch(err => {
        console.log(new Error(err));
      });
  }
}

export {
  dateDMY,
  getNamesStr,
  fetchSingle,
  fetchMultiple,
  hideLoadingPH,
  pageTitle,
  showListURL,
  strConcat,
  showCatURL,
  toggleList,
  uniqueId
};

import $ from 'jquery'; // needed this to make info.test.js work as it imports hideLoadingPH below??
import Config from './config.json';

const hideLoadingPH = () => $('#loadingPH').hide(); // hide content placeholder (loading)

const uniqueId = num => {
  // unique id 1 in 10^15 chance of collision
  if (typeof num === 'number') {
    const arr = [];
    for (let i = 0; i < num; i++) {
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
  let pgeTitle = Config.siteTitle;
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
      pgeTitle += ` - ${pathName}`;
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

const concatStr = (str, len) => {
  // shorten long movie plots
  let strConcat = str;
  if (typeof str === 'string' && str.length > len) {
    strConcat = strConcat.substring(0, len);
    const lastSpace = strConcat.lastIndexOf(' ');
    strConcat = `${strConcat.substring(0, lastSpace)}...`;
  }
  return strConcat;
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
    default:
      return Config.nowPlayingURL;
  }
};

const toggleList = e => {
  // show/hide cast/similar on show page
  const text = e.target.innerText;
  const target = `.${e.target.id}.hide`;
  $(target).toggleClass('reveal');
  e.target.innerText =
    text.indexOf('more') === -1
      ? text.replace('less', 'more')
      : text.replace('more', 'less');
};

const error = err => console.log(new Error(err));
function fetchSingle(url) {
  if (url && typeof url === 'string') {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(this);
        this.setState({ data });
        hideLoadingPH();
      })
      .catch(err => error(err));
  }
}

function fetchMultiple(urls, page) {
  if (Array.isArray(urls)) {
    const apiRequests = [];
    for (let i = 0; i < urls.length; i++) {
      apiRequests[i] = fetch(urls[i])
        .then(response => response.json())
        .catch(err => console.log(new Error(err)));
    }

    Promise.all(apiRequests)
      .then(data => {
        if (page === 'home') {
          const combinedData = [];
          data.forEach((arr, ind) => {
            if (arr && arr.results) {
              const arr3Items = arr.results
                .sort(() => 0.5 - Math.random())
                .slice(0, Config.homePageResultsLimit); // just return top 3 results
              for (let j = 0; j < arr3Items.length; j++) {
                // add category css class for different styling
                const el = arr3Items[j];
                el.css_class = this.categorys[ind];
              }
              // create 4 arrays, one with title and 3 with data
              arr3Items.unshift(this.categorys[ind]);
              combinedData.push(arr3Items);
              // console.log(fourArr);

              // combinedData = combinedData
              //   .concat(this.categorys[ind])
              //   .concat(arr.results.slice(0, 3));
            }
          });
          this.setState({ data: combinedData });
        } else {
          this.setState({ data });
        }
        hideLoadingPH();
      })

      .then(() => {
        // bootstrap carousel on actor page
        if (page === 'actor') {
          $('#carouselActor').on('slide.bs.carousel', e => {
            const $e = $(e.relatedTarget);
            const idx = $e.index();
            const itemsPerSlide = 4;
            const totalItems = $('.carousel-item').length;

            if (idx >= totalItems - (itemsPerSlide - 1)) {
              const it = itemsPerSlide - (totalItems - idx);
              const carItem = $('.carousel-item');
              for (let i = 0; i < it; i++) {
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
  concatStr,
  showCatURL,
  toggleList,
  uniqueId
};

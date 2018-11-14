// __mocks__/request.js

'use strict';

const users = {
  4: { name: 'Mark' },
  5: { name: 'Paulx' },
  18918: {
    birthday: '1972-05-02',
    deathday: '2009-05-02',
    id: 18918,
    name: 'Dwayne Johnson',
    also_known_as: ['The Rock'],
    gender: 2,
    biography:
      'Dwayne Douglas Johnson (born May 2, 1972), also known by his ring name The Rock, is an American and Canadian actor, producer and semi-retired professional wrestler, signed with WWE. ',
    popularity: 22.402836,
    place_of_birth: 'Hayward, California, USA',
    profile_path: '/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg',
    adult: false,
    imdb_id: 'nm0425005',
    homepage: 'http://www.dwayne-johnson.com'
  }
};

export default function request(url) {
  return new Promise((resolve, reject) => {
    console.debug(console.log(url));
    const userID = parseInt(url.substr('/actors/'.length), 10);
    console.debug(console.log(userID));

    process.nextTick(
      () =>
        users[userID]
          ? resolve(users[userID])
          : reject({
              error: 'User with ' + userID + ' not found.'
            })
    );
  });
}

[
  {
    birthday: '1972-05-02',
    deathday: '2009-05-02',
    id: 18918,
    name: 'Dwayne Johnson',
    also_known_as: [
      'The Rock',
      'Rocky Maivia',
      'The Brahma Bull',
      'The Corporate Champion',
      'Двейн Джонсон',
      'Скеля',
      'Big Bull'
    ],
    gender: 2,
    biography:
      'Dwayne Douglas Johnson (born May 2, 1972), also known by his ring name The Rock, is an American and Canadian actor, producer and semi-retired professional wrestler, signed with WWE. ',
    popularity: 22.402836,
    place_of_birth: 'Hayward, California, USA',
    profile_path: '/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg',
    adult: false,
    imdb_id: 'nm0425005',
    homepage: 'http://www.dwayne-johnson.com'
  },
  {
    cast: [
      {
        id: 1734,
        character: 'Mathayus the Scorpion King',
        original_title: 'The Mummy Returns',
        overview:
          "Rick and Evelyn O'Connell, along with their 8 year old son Alex, discover the key to the legendary Scorpion King's might, the fabled Bracelet of Anubis. Unfortunately, a newly resurrected Imhotep has designs on the bracelet as well, and isn't above kidnapping its new bearer, Alex, to gain control of Anubis' otherworldly army.",
        vote_count: 2828,
        video: false,
        media_type: 'movie',
        poster_path: '/hioiYUZVIuYIhagDGhIAjyNEUu0.jpg',
        backdrop_path: '/zlHeYjpHrHLpH4ylN5xYRdr7NlB.jpg',
        popularity: 26.20435,
        title: 'The Mummy Returns',
        original_language: 'en',
        genre_ids: [28, 12, 14],
        vote_average: 6.1,
        adult: false,
        release_date: '2001-04-28',
        credit_id: '52fe4312c3a36847f803841b'
      }
    ]
  },
  {
    profiles: [
      {
        iso_639_1: null,
        width: 1000,
        height: 1500,
        vote_count: 8,
        vote_average: 8.2246814218645,
        file_path: '/gQIWcpYo2W4MHw8UhTP2cW0jojF.jpg',
        aspect_ratio: 0.66666666666667
      }
    ]
  }
];

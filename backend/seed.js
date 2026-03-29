const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Video = require('./models/Video');
const Plan = require('./models/Plan');

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Video.deleteMany();
    await Plan.deleteMany();

    // Create admin user
    await User.create({
      name: 'Super Admin',
      email: 'admin@streamvibe.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin created: admin@streamvibe.com / admin123');

    // Create test user
    await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'user123',
      role: 'user'
    });
    console.log('Test user created: user@test.com / user123');

    // Create plans
    await Plan.create([
      {
        name: 'Basic',
        price: { monthly: 9.99, yearly: 99.99 },
        features: [
          'Access to a wide selection of movies and shows',
          'Watch on one device at a time',
          'Standard definition (SD) streaming',
          'Limited offline downloads'
        ],
        maxDevices: 1,
        quality: 'SD'
      },
      {
        name: 'Standard',
        price: { monthly: 12.99, yearly: 129.99 },
        features: [
          'Access to all movies and shows',
          'Watch on two devices at a time',
          'High definition (HD) streaming',
          'Offline downloads on 3 devices',
          'Ad-free experience'
        ],
        maxDevices: 2,
        quality: 'HD'
      },
      {
        name: 'Premium',
        price: { monthly: 14.99, yearly: 149.99 },
        features: [
          'Access to all movies and shows',
          'Watch on four devices at a time',
          'Ultra HD (4K) + HDR streaming',
          'Unlimited offline downloads',
          'Ad-free experience',
          'Early access to new releases'
        ],
        maxDevices: 4,
        quality: '4K + HDR'
      }
    ]);
    console.log('Plans created');

    // Create sample videos
    const sampleVideos = [
      {
        title: 'Kantara',
        description: 'A legend from centuries ago comes alive in the present day. Kantara takes you on a visual spectacle of culture, tradition, and a mystery that spans across time.',
        genre: ['Action', 'Drama', 'Thriller'],
        duration: '2h 28min',
        releaseYear: 2022,
        rating: 8.5,
        thumbnail: '/src/assets/Image (38).png',
        bannerImage: '/src/assets/Image (38).png',
        videoUrl: 'https://www.youtube.com/watch?v=ppKw0qj4F08',
        cast: [{ name: 'Rishab Shetty', character: 'Shiva', image: '' }]
      },
      {
        title: 'Stranger Things',
        description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
        genre: ['Drama', 'Horror', 'Sci-Fi'],
        duration: '51min',
        releaseYear: 2016,
        rating: 8.7,
        thumbnail: '/src/assets/Image (39).png',
        bannerImage: '/src/assets/Image (39).png',
        videoUrl: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
        cast: [{ name: 'Millie Bobby Brown', character: 'Eleven', image: '' }],
        type: 'show'
      },
      {
        title: 'The Dark Knight',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        genre: ['Action', 'Drama', 'Crime'],
        duration: '2h 32min',
        releaseYear: 2008,
        rating: 9.0,
        thumbnail: '/src/assets/Image (40).png',
        bannerImage: '/src/assets/Image (40).png',
        videoUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
        cast: [{ name: 'Christian Bale', character: 'Bruce Wayne / Batman', image: '' }]
      },
      {
        title: 'Breaking Bad',
        description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
        genre: ['Drama', 'Crime', 'Thriller'],
        duration: '49min',
        releaseYear: 2008,
        rating: 9.5,
        thumbnail: '/src/assets/Image (41).png',
        bannerImage: '/src/assets/Image (41).png',
        videoUrl: 'https://www.youtube.com/watch?v=HhesaQXLuRY',
        cast: [{ name: 'Bryan Cranston', character: 'Walter White', image: '' }],
        type: 'show'
      },
      {
        title: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        duration: '2h 28min',
        releaseYear: 2010,
        rating: 8.8,
        thumbnail: '/src/assets/Image (43).png',
        bannerImage: '/src/assets/Image (43).png',
        videoUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
        cast: [{ name: 'Leonardo DiCaprio', character: 'Cobb', image: '' }]
      },
      {
        title: 'Money Heist',
        description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
        genre: ['Action', 'Crime', 'Drama'],
        duration: '1h 10min',
        releaseYear: 2017,
        rating: 8.2,
        thumbnail: '/src/assets/Image (44).png',
        bannerImage: '/src/assets/Image (44).png',
        videoUrl: 'https://www.youtube.com/watch?v=htUFPSImrPU',
        cast: [{ name: 'Álvaro Morte', character: 'El Profesor', image: '' }],
        type: 'show',
        language: 'Spanish'
      },
      {
        title: 'Interstellar',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival as Earth becomes uninhabitable.',
        genre: ['Adventure', 'Drama', 'Sci-Fi'],
        duration: '2h 49min',
        releaseYear: 2014,
        rating: 8.7,
        thumbnail: '/src/assets/Image (45).png',
        bannerImage: '/src/assets/Image (45).png',
        videoUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
        cast: [{ name: 'Matthew McConaughey', character: 'Cooper', image: '' }],
        featured: true
      },
      {
        title: 'The Witcher',
        description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
        genre: ['Action', 'Adventure', 'Drama'],
        duration: '1h',
        releaseYear: 2019,
        rating: 8.0,
        thumbnail: '/src/assets/Image (46).png',
        bannerImage: '/src/assets/Image (46).png',
        videoUrl: 'https://www.youtube.com/watch?v=ndl1W4ltcmg',
        cast: [{ name: 'Henry Cavill', character: 'Geralt', image: '' }],
        type: 'show'
      },
      {
        title: 'Avengers: Endgame',
        description: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos\' actions.',
        genre: ['Action', 'Adventure', 'Drama'],
        duration: '3h 1min',
        releaseYear: 2019,
        rating: 8.4,
        thumbnail: '/src/assets/Image (47).png',
        bannerImage: '/src/assets/avengers_endgame_hero.png',
        videoUrl: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
        cast: [{ name: 'Robert Downey Jr.', character: 'Tony Stark', image: '' }]
      },
      {
        title: 'Squid Game',
        description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
        genre: ['Drama', 'Thriller', 'Action'],
        duration: '55min',
        releaseYear: 2021,
        rating: 8.0,
        thumbnail: '/src/assets/Image (48).png',
        bannerImage: '/src/assets/Image (48).png',
        videoUrl: 'https://www.youtube.com/watch?v=oqxAJKy0ii4',
        cast: [{ name: 'Lee Jung-jae', character: 'Seong Gi-hun', image: '' }],
        type: 'show',
        language: 'Korean'
      },
      {
        title: 'The Shawshank Redemption',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        genre: ['Drama'],
        duration: '2h 22min',
        releaseYear: 1994,
        rating: 9.3,
        thumbnail: '/src/assets/Image (49).png',
        bannerImage: '/src/assets/Image (49).png',
        videoUrl: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
        cast: [{ name: 'Tim Robbins', character: 'Andy Dufresne', image: '' }]
      },
      {
        title: 'The Conjuring',
        description: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
        genre: ['Horror', 'Thriller'],
        duration: '1h 52min',
        releaseYear: 2013,
        rating: 7.5,
        thumbnail: '/src/assets/Image (50).png',
        bannerImage: '/src/assets/Image (50).png',
        videoUrl: 'https://www.youtube.com/watch?v=k10ETZ41q5o',
        cast: [{ name: 'Patrick Wilson', character: 'Ed Warren', image: '' }]
      },
      {
        title: 'Wednesday',
        description: 'Wednesday Addams is sent to Nevermore Academy, where she attempts to master her psychic ability and solve a mystery.',
        genre: ['Comedy', 'Crime', 'Horror'],
        duration: '45min',
        releaseYear: 2022,
        rating: 8.1,
        thumbnail: '/src/assets/Image (51).png',
        bannerImage: '/src/assets/Image (51).png',
        videoUrl: 'https://www.youtube.com/watch?v=Di310WS8zLk',
        cast: [{ name: 'Jenna Ortega', character: 'Wednesday', image: '' }],
        type: 'show'
      },
      {
        title: 'Jumanji: Welcome to the Jungle',
        description: 'Four teenagers are sucked into a magical video game, and the only way they can escape is to work together to finish the game.',
        genre: ['Action', 'Adventure', 'Comedy'],
        duration: '1h 59min',
        releaseYear: 2017,
        rating: 6.9,
        thumbnail: '/src/assets/Image (53).png',
        bannerImage: '/src/assets/Image (53).png',
        videoUrl: 'https://www.youtube.com/watch?v=2QKg5SZ_35I',
        cast: [{ name: 'Dwayne Johnson', character: 'Dr. Smolder Bravestone', image: '' }]
      },
      {
        title: 'Peaky Blinders',
        description: 'A gangster family epic set in 1900s England, centering on the Peaky Blinders gang and their ambitious boss Tommy Shelby.',
        genre: ['Crime', 'Drama'],
        duration: '1h',
        releaseYear: 2013,
        rating: 8.8,
        thumbnail: '/src/assets/Image (54).png',
        bannerImage: '/src/assets/Image (54).png',
        videoUrl: 'https://www.youtube.com/watch?v=oVzVdvGIC7U',
        cast: [{ name: 'Cillian Murphy', character: 'Tommy Shelby', image: '' }],
        type: 'show',
        isPremium: true
      },
      { title: 'The Matrix', description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.', genre: ['Action', 'Sci-Fi'], duration: '2h 16min', releaseYear: 1999, rating: 8.7, thumbnail: '/src/assets/Image (55).png', bannerImage: '/src/assets/Image (55).png', videoUrl: 'https://www.youtube.com/watch?v=vKQi3bBA1y8', cast: [], type: 'movie', views: 9100 },
      { title: 'Gladiator', description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', genre: ['Action', 'Adventure', 'Drama'], duration: '2h 35min', releaseYear: 2000, rating: 8.5, thumbnail: '/src/assets/Image (56).png', bannerImage: '/src/assets/Image (56).png', videoUrl: 'https://www.youtube.com/watch?v=owK1qxDselE', cast: [], type: 'movie', views: 5400 },
      { title: 'Dune: Part Two', description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.', genre: ['Action', 'Adventure', 'Drama'], duration: '2h 46min', releaseYear: 2024, rating: 8.9, thumbnail: '/src/assets/Image (57).png', bannerImage: '/src/assets/Image (57).png', videoUrl: 'https://www.youtube.com/watch?v=_YUzQa_1RCE', cast: [], type: 'movie', createdAt: '2024-03-01T00:00:00Z', views: 4000 },
      { title: 'Oppenheimer', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', genre: ['Biography', 'Drama', 'History'], duration: '3h', releaseYear: 2023, rating: 8.6, thumbnail: '/src/assets/Image (58).png', bannerImage: '/src/assets/Image (58).png', videoUrl: 'https://www.youtube.com/watch?v=uYPbbksJxIg', cast: [], type: 'movie', createdAt: '2023-07-21T00:00:00Z', views: 6000 },
      { title: 'John Wick: Chapter 4', description: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.', genre: ['Action', 'Crime', 'Thriller'], duration: '2h 49min', releaseYear: 2023, rating: 8.3, thumbnail: '/src/assets/Image (59).png', bannerImage: '/src/assets/Image (59).png', videoUrl: 'https://www.youtube.com/watch?v=qEVUtrk8_B4', cast: [], type: 'movie', createdAt: '2023-03-24T00:00:00Z', views: 8000 },
      { title: 'Spider-Man: Across the Spider-Verse', description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.', genre: ['Animation', 'Action', 'Adventure'], duration: '2h 20min', releaseYear: 2023, rating: 8.9, thumbnail: '/src/assets/Image (60).png', bannerImage: '/src/assets/Image (60).png', videoUrl: 'https://www.youtube.com/watch?v=cqGjhVJWtEg', cast: [], type: 'movie', createdAt: '2023-06-02T00:00:00Z', views: 7500 },
      { title: 'The Batman', description: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption.', genre: ['Action', 'Crime', 'Drama'], duration: '2h 56min', releaseYear: 2022, rating: 7.9, thumbnail: '/src/assets/Image (61).png', bannerImage: '/src/assets/Image (61).png', videoUrl: 'https://www.youtube.com/watch?v=mqqft2x_Aa4', cast: [], type: 'movie', createdAt: '2022-03-04T00:00:00Z', views: 5000 },
      { title: 'The Godfather', description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', genre: ['Crime', 'Drama'], duration: '2h 55min', releaseYear: 1972, rating: 9.2, thumbnail: '/src/assets/Image (62).png', bannerImage: '/src/assets/Image (62).png', videoUrl: 'https://www.youtube.com/watch?v=sY1S34973zA', cast: [], type: 'movie', views: 11000 },
      { title: 'Forrest Gump', description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.', genre: ['Drama', 'Romance'], duration: '2h 22min', releaseYear: 1994, rating: 8.8, thumbnail: '/src/assets/Image (63).png', bannerImage: '/src/assets/Image (63).png', videoUrl: 'https://www.youtube.com/watch?v=bLvqoHBptjg', cast: [], type: 'movie', views: 9500 },
      { title: 'Pulp Fiction', description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', genre: ['Crime', 'Drama'], duration: '2h 34min', releaseYear: 1994, rating: 8.9, thumbnail: '/src/assets/Image (64).png', bannerImage: '/src/assets/Image (64).png', videoUrl: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY', cast: [], type: 'movie', views: 8900 },
      { title: 'Fight Club', description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.', genre: ['Drama'], duration: '2h 19min', releaseYear: 1999, rating: 8.8, thumbnail: '/src/assets/Image (65).png', bannerImage: '/src/assets/Image (65).png', videoUrl: 'https://www.youtube.com/watch?v=qtRKdVHc-cE', cast: [], type: 'movie', views: 9200 },
      { title: 'The Boys', description: 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.', genre: ['Action', 'Comedy', 'Crime'], duration: '1h', releaseYear: 2019, rating: 8.7, thumbnail: '/src/assets/Image (66).png', bannerImage: '/src/assets/Image (66).png', videoUrl: 'https://www.youtube.com/watch?v=tcrNsIaQkb4', cast: [], type: 'show', views: 8200 },
      { title: 'House of the Dragon', description: 'An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.', genre: ['Action', 'Adventure', 'Drama'], duration: '1h 2min', releaseYear: 2022, rating: 8.5, thumbnail: '/src/assets/Image (67).png', bannerImage: '/src/assets/Image (67).png', videoUrl: 'https://www.youtube.com/watch?v=DotnJ7tTA34', cast: [], type: 'show', views: 6700 },
      { title: 'Succession', description: 'The Logan family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.', genre: ['Comedy', 'Drama'], duration: '1h', releaseYear: 2018, rating: 8.8, thumbnail: '/src/assets/Image (68).png', bannerImage: '/src/assets/Image (68).png', videoUrl: 'https://www.youtube.com/watch?v=OzYxJV_rmv8', cast: [], type: 'show', views: 5000 },
      { title: 'The Wire', description: 'The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.', genre: ['Crime', 'Drama', 'Thriller'], duration: '59min', releaseYear: 2002, rating: 9.3, thumbnail: '/src/assets/Image (69).png', bannerImage: '/src/assets/Image (69).png', videoUrl: 'https://www.youtube.com/watch?v=uqc1UpO1V40', cast: [], type: 'show', views: 8000 }
    ];

    await Video.create(sampleVideos);
    console.log(`${sampleVideos.length} videos created`);

    console.log('\\nSeed completed successfully!');
    console.log('Admin login: admin@streamvibe.com / admin123');
    console.log('User login: user@test.com / user123');
    process.exit();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();

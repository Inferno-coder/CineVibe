import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clean up existing data (optional, but good for development)
  // Note: Order matters due to foreign key constraints
  await prisma.bookingSeat.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.show.deleteMany();
  await prisma.seat.deleteMany();
  await prisma.screen.deleteMany();
  await prisma.theater.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleaned up existing data.');

  // 2. Create Users
  const user = await prisma.user.create({
    data: {
      email: 'demo@cinevibe.com',
      password: 'password123', // In a real app, this should be hashed
      name: 'Demo User',
      role: 'USER',
    },
  });
  console.log('Created user:', user.email);

  // 3. Create Movies
  const moviesData = [
    {
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
      duration: 148,
      genre: 'Sci-Fi',
      releaseDate: new Date('2010-07-16'),
      posterUrl: 'https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    },
    {
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.',
      duration: 152,
      genre: 'Action',
      releaseDate: new Date('2008-07-18'),
      posterUrl: 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    },
    {
      title: 'Interstellar',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      duration: 169,
      genre: 'Sci-Fi',
      releaseDate: new Date('2014-11-07'),
      posterUrl: 'https://image.tmdb.org/t/p/original/gEU2QniL6E8ahMcafHC7DC8p45w.jpg',
    },
    {
      title: 'Avengers: Endgame',
      description: 'After the devastating events of Infinity War, the universe is in ruins.',
      duration: 181,
      genre: 'Action',
      releaseDate: new Date('2019-04-26'),
      posterUrl: 'https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    },
    {
      title: 'Spider-Man: No Way Home',
      description: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help.',
      duration: 148,
      genre: 'Action',
      releaseDate: new Date('2021-12-17'),
      posterUrl: 'https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4GY0n.jpg',
    },
  ];

  const movies = [];
  for (const m of moviesData) {
    const movie = await prisma.movie.create({ data: m });
    movies.push(movie);
    console.log('Created movie:', movie.title);
  }

  // 4. Create Theaters and Screens
  const theatersData = [
    { name: 'PVR Cinemas', location: 'Downtown' },
    { name: 'INOX', location: 'Uptown' },
    { name: 'Cinepolis', location: 'Suburbs' },
  ];

  for (const t of theatersData) {
    const theater = await prisma.theater.create({
      data: {
        name: t.name,
        location: t.location,
        screens: {
          create: [
            {
              number: 1,
              seats: {
                create: Array.from({ length: 40 }, (_, i) => ({
                  row: String.fromCharCode(65 + Math.floor(i / 8)), // A-E
                  number: (i % 8) + 1,
                  type: 'STANDARD',
                })),
              },
            },
            {
              number: 2,
              seats: {
                create: Array.from({ length: 30 }, (_, i) => ({
                  row: String.fromCharCode(65 + Math.floor(i / 6)), // A-E
                  number: (i % 6) + 1,
                  type: 'PREMIUM',
                })),
              },
            },
          ],
        },
      },
      include: { screens: true },
    });
    console.log('Created theater:', theater.name);

    // 5. Create Shows for each screen
    for (const screen of theater.screens) {
      // Create shows for the next 3 days
      for (let day = 0; day < 3; day++) {
        const date = new Date();
        date.setDate(date.getDate() + day);
        
        // 3 shows per day
        const showTimes = [10, 14, 18]; // 10 AM, 2 PM, 6 PM

        for (const hour of showTimes) {
          const startTime = new Date(date);
          startTime.setHours(hour, 0, 0, 0);

          // Randomly select a movie
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];

          await prisma.show.create({
            data: {
              startTime: startTime,
              movieId: randomMovie.id,
              screenId: screen.id,
            },
          });
        }
      }
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

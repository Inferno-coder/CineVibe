import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany({ include: { bookings: true } }),
    user: (_: any, { id }: { id: string }) => prisma.user.findUnique({ where: { id: Number(id) }, include: { bookings: true } }),
    movies: () => prisma.movie.findMany({ include: { shows: true } }),
    movie: (_: any, { id }: { id: string }) => prisma.movie.findUnique({ where: { id: Number(id) }, include: { shows: true } }),
    theaters: () => prisma.theater.findMany({ include: { screens: true } }),
    theater: (_: any, { id }: { id: string }) => prisma.theater.findUnique({ where: { id: Number(id) }, include: { screens: true } }),
    show: (_: any, { id }: { id: string }) => prisma.show.findUnique({ where: { id: Number(id) }, include: { movie: true, screen: true, bookings: true } }),
  },
  Mutation: {
    createUser: (_: any, { email, name, password }: any) => {
      return prisma.user.create({
        data: {
          email,
          name,
          password, // In a real app, hash this password!
        },
      });
    },
    createMovie: (_: any, args: any) => {
      return prisma.movie.create({
        data: {
          title: args.title,
          duration: args.duration,
          genre: args.genre,
          releaseDate: new Date(args.releaseDate),
        },
      });
    },
    createTheater: (_: any, args: any) => {
      return prisma.theater.create({
        data: {
          name: args.name,
          location: args.location,
        },
      });
    },
    createShow: (_: any, args: any) => {
      return prisma.show.create({
        data: {
          movieId: Number(args.movieId),
          screenId: Number(args.screenId),
          startTime: new Date(args.startTime),
        },
      });
    },
    bookTicket: async (_: any, args: any) => {
      const { userId, showId, seatIds } = args;
      // Calculate total amount (simplified)
      const show = await prisma.show.findUnique({ where: { id: Number(showId) } });
      if (!show) throw new Error('Show not found');
      
      // Create booking with explicit BookingSeat records
      return prisma.booking.create({
        data: {
          userId: Number(userId),
          showId: Number(showId),
          totalAmount: 100 * seatIds.length, // Placeholder price
          bookingSeats: {
            create: seatIds.map((id: string) => ({
              seat: { connect: { id: Number(id) } }
            })),
          },
        },
        include: {
          user: true,
          show: true,
          bookingSeats: {
            include: { seat: true }
          }
        }
      });
    },
  },
  User: {
    bookings: (parent: any) => prisma.booking.findMany({ where: { userId: parent.id } }),
  },
  Movie: {
    shows: (parent: any) => prisma.show.findMany({ where: { movieId: parent.id } }),
  },
  Theater: {
    screens: (parent: any) => prisma.screen.findMany({ where: { theaterId: parent.id } }),
  },
  Screen: {
    theater: (parent: any) => prisma.theater.findUnique({ where: { id: parent.theaterId } }),
    seats: (parent: any) => prisma.seat.findMany({ where: { screenId: parent.id } }),
    shows: (parent: any) => prisma.show.findMany({ where: { screenId: parent.id } }),
  },
  Show: {
    movie: (parent: any) => prisma.movie.findUnique({ where: { id: parent.movieId } }),
    screen: (parent: any) => prisma.screen.findUnique({ where: { id: parent.screenId } }),
    bookings: (parent: any) => prisma.booking.findMany({ where: { showId: parent.id } }),
  },
  Booking: {
    user: (parent: any) => prisma.user.findUnique({ where: { id: parent.userId } }),
    show: (parent: any) => prisma.show.findUnique({ where: { id: parent.showId } }),
    // Map bookingSeats back to seats for the GraphQL schema
    seats: async (parent: any) => {
      const bookingSeats = await prisma.bookingSeat.findMany({
        where: { bookingId: parent.id },
        include: { seat: true }
      });
      return bookingSeats.map((bs: any) => bs.seat);
    },
  },
  Seat: {
    screen: (parent: any) => prisma.screen.findUnique({ where: { id: parent.screenId } }),
    isBooked: async (parent: any, { showId }: { showId: string }) => {
      const count = await prisma.bookingSeat.count({
        where: {
          booking: { showId: Number(showId) },
          seatId: parent.id,
        },
      });
      return count > 0;
    },
  },
};

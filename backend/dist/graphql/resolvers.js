"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.resolvers = {
    Query: {
        users: () => prisma.user.findMany({ include: { bookings: true } }),
        user: (_, { id }) => prisma.user.findUnique({ where: { id: Number(id) }, include: { bookings: true } }),
        movies: () => prisma.movie.findMany({ include: { shows: true } }),
        movie: (_, { id }) => prisma.movie.findUnique({ where: { id: Number(id) }, include: { shows: true } }),
        theaters: () => prisma.theater.findMany({ include: { screens: true } }),
        theater: (_, { id }) => prisma.theater.findUnique({ where: { id: Number(id) }, include: { screens: true } }),
        show: (_, { id }) => prisma.show.findUnique({ where: { id: Number(id) }, include: { movie: true, screen: true, bookings: true } }),
    },
    Mutation: {
        createUser: (_, { email, name, password }) => {
            return prisma.user.create({
                data: {
                    email,
                    name,
                    password, // In a real app, hash this password!
                },
            });
        },
        createMovie: (_, args) => {
            return prisma.movie.create({
                data: {
                    title: args.title,
                    duration: args.duration,
                    genre: args.genre,
                    releaseDate: new Date(args.releaseDate),
                },
            });
        },
        createTheater: (_, args) => {
            return prisma.theater.create({
                data: {
                    name: args.name,
                    location: args.location,
                },
            });
        },
        createShow: (_, args) => {
            return prisma.show.create({
                data: {
                    movieId: Number(args.movieId),
                    screenId: Number(args.screenId),
                    startTime: new Date(args.startTime),
                },
            });
        },
        bookTicket: async (_, args) => {
            const { userId, showId, seatIds } = args;
            // Calculate total amount (simplified)
            const show = await prisma.show.findUnique({ where: { id: Number(showId) } });
            if (!show)
                throw new Error('Show not found');
            // Create booking with explicit BookingSeat records
            return prisma.booking.create({
                data: {
                    userId: Number(userId),
                    showId: Number(showId),
                    totalAmount: 100 * seatIds.length, // Placeholder price
                    bookingSeats: {
                        create: seatIds.map((id) => ({
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
        bookings: (parent) => prisma.booking.findMany({ where: { userId: parent.id } }),
    },
    Movie: {
        shows: (parent) => prisma.show.findMany({ where: { movieId: parent.id } }),
    },
    Theater: {
        screens: (parent) => prisma.screen.findMany({ where: { theaterId: parent.id } }),
    },
    Screen: {
        theater: (parent) => prisma.theater.findUnique({ where: { id: parent.theaterId } }),
        seats: (parent) => prisma.seat.findMany({ where: { screenId: parent.id } }),
        shows: (parent) => prisma.show.findMany({ where: { screenId: parent.id } }),
    },
    Show: {
        movie: (parent) => prisma.movie.findUnique({ where: { id: parent.movieId } }),
        screen: (parent) => prisma.screen.findUnique({ where: { id: parent.screenId } }),
        bookings: (parent) => prisma.booking.findMany({ where: { showId: parent.id } }),
    },
    Booking: {
        user: (parent) => prisma.user.findUnique({ where: { id: parent.userId } }),
        show: (parent) => prisma.show.findUnique({ where: { id: parent.showId } }),
        // Map bookingSeats back to seats for the GraphQL schema
        seats: async (parent) => {
            const bookingSeats = await prisma.bookingSeat.findMany({
                where: { bookingId: parent.id },
                include: { seat: true }
            });
            return bookingSeats.map((bs) => bs.seat);
        },
    },
    Seat: {
        screen: (parent) => prisma.screen.findUnique({ where: { id: parent.screenId } }),
        isBooked: async (parent, { showId }) => {
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

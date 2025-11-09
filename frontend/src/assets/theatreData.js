import { LOCATIONS } from "./district";

export const THEATRE_DATA = {
  [LOCATIONS.CHENNAI]: [
    {
      name: "AGS Cinemas – Navalur",
      movies: [
        {
          title: "Leo",
          image:
            "https://image.tmdb.org/t/p/original/pA1H4LJ5H5t6UX3sGZ9KId8Kwh8.jpg",
          timings: ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"],
        },
        {
          title: "Jailer",
          image:
            "https://image.tmdb.org/t/p/original/r7XifzvtezNt31ypvsmb6Oqxw49.jpg",
          timings: ["9:30 AM", "12:45 PM", "4:00 PM", "7:15 PM", "10:30 PM"],
        },
      ],
    },
    {
      name: "PVR – Phoenix MarketCity Velachery",
      movies: [
        {
          title: "Vikram",
          image:
            "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
          timings: ["11:00 AM", "2:30 PM", "6:15 PM", "10:00 PM"],
        },
        {
          title: "Thunivu",
          image:
            "https://image.tmdb.org/t/p/original/5RtgHKFi4Jr6s1Wz3wBdVRtNq1S.jpg",
          timings: ["10:45 AM", "2:15 PM", "5:45 PM", "9:15 PM"],
        },
      ],
    },
    {
      name: "INOX – Chennai Citi Centre",
      movies: [
        {
          title: "Ponniyin Selvan: Part II",
          image:
            "https://image.tmdb.org/t/p/original/4eNIKZm8gYJxk7UPwC4MZ3kRr2n.jpg",
          timings: ["9:00 AM", "12:15 PM", "3:30 PM", "6:45 PM", "10:00 PM"],
        },
      ],
    },
  ],

  [LOCATIONS.COIMBATORE]: [
    {
      name: "KG Cinemas",
      movies: [
        {
          title: "Varisu",
          image:
            "https://image.tmdb.org/t/p/original/5DNRr2juXdwtvktwXxwUkWvU0qR.jpg",
          timings: ["9:30 AM", "1:00 PM", "4:00 PM", "7:30 PM"],
        },
        {
          title: "Beast",
          image:
            "https://image.tmdb.org/t/p/original/xqR4ABkFTFYe8NDJi3knwWX7zfn.jpg",
          timings: ["10:30 AM", "2:00 PM", "6:00 PM", "9:15 PM"],
        },
      ],
    },
    {
      name: "Fun Cinemas – Brookefields Mall",
      movies: [
        {
          title: "Maaveeran",
          image:
            "https://image.tmdb.org/t/p/original/9uYuwmR4fPZ1S7Kprn4XzCKVYyT.jpg",
          timings: ["10:00 AM", "1:15 PM", "4:45 PM", "8:00 PM"],
        },
      ],
    },
  ],

  [LOCATIONS.MADURAI]: [
    {
      name: "Vetri Cinemas",
      movies: [
        {
          title: "Leo",
          image:
            "https://image.tmdb.org/t/p/original/pA1H4LJ5H5t6UX3sGZ9KId8Kwh8.jpg",
          timings: ["9:00 AM", "12:30 PM", "4:00 PM", "7:30 PM"],
        },
        {
          title: "Vikram",
          image:
            "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
          timings: ["10:15 AM", "1:45 PM", "5:15 PM", "8:45 PM"],
        },
      ],
    },
    {
      name: "Cine Park Multiplex",
      movies: [
        {
          title: "Thunivu",
          image:
            "https://image.tmdb.org/t/p/original/5RtgHKFi4Jr6s1Wz3wBdVRtNq1S.jpg",
          timings: ["10:00 AM", "1:00 PM", "4:15 PM", "7:15 PM"],
        },
      ],
    },
  ],

  [LOCATIONS.SALEM]: [
    {
      name: "ARRS Multiplex",
      movies: [
        {
          title: "Ponniyin Selvan: Part I",
          image:
            "https://image.tmdb.org/t/p/original/3HVvV8Af4L2gzyfTqYdOqHZlYlO.jpg",
          timings: ["9:30 AM", "12:45 PM", "4:00 PM", "7:15 PM", "10:30 PM"],
        },
      ],
    },
    {
      name: "INOX – Reliance Mall Salem",
      movies: [
        {
          title: "Jailer",
          image:
            "https://image.tmdb.org/t/p/original/r7XifzvtezNt31ypvsmb6Oqxw49.jpg",
          timings: ["10:00 AM", "1:15 PM", "4:30 PM", "7:45 PM"],
        },
      ],
    },
  ],

  [LOCATIONS.TIRUCHIRAPPALLI]: [
    {
      name: "LA Cinemas – Trichy",
      movies: [
        {
          title: "Leo",
          image:
            "https://image.tmdb.org/t/p/original/pA1H4LJ5H5t6UX3sGZ9KId8Kwh8.jpg",
          timings: ["9:00 AM", "12:15 PM", "3:30 PM", "6:45 PM", "10:00 PM"],
        },
      ],
    },
    {
      name: "Ramba Theatre – Trichy",
      movies: [
        {
          title: "Jailer",
          image:
            "https://image.tmdb.org/t/p/original/r7XifzvtezNt31ypvsmb6Oqxw49.jpg",
          timings: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"],
        },
      ],
    },
  ],

  [LOCATIONS.TIRUNELVELI]: [
    {
      name: "Ram Cinemas – Palayamkottai",
      movies: [
        {
          title: "Vikram",
          image:
            "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
          timings: ["9:15 AM", "12:30 PM", "3:45 PM", "7:00 PM", "10:15 PM"],
        },
      ],
    },
    {
      name: "PSS Multiplex",
      movies: [
        {
          title: "Jailer",
          image:
            "https://image.tmdb.org/t/p/original/r7XifzvtezNt31ypvsmb6Oqxw49.jpg",
          timings: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
        },
      ],
    },
  ],

  [LOCATIONS.TIRUPPUR]: [
    {
      name: "Sakthi Cinemas",
      movies: [
        {
          title: "Maaveeran",
          image:
            "https://image.tmdb.org/t/p/original/9uYuwmR4fPZ1S7Kprn4XzCKVYyT.jpg",
          timings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
        },
      ],
    },
    {
      name: "KG Big Cinemas",
      movies: [
        {
          title: "Varisu",
          image:
            "https://image.tmdb.org/t/p/original/5DNRr2juXdwtvktwXxwUkWvU0qR.jpg",
          timings: ["9:30 AM", "12:45 PM", "4:00 PM", "7:15 PM", "10:30 PM"],
        },
      ],
    },
  ],
};

import Node from "../Components/ClassLib/Node";

const createMap = (movieInfo) => {
  const scheduleDetailMap = new Map();
  const movieCodeCount = new Map();

  movieInfo.forEach((item) => {
    const dateMap = scheduleDetailMap.has(item.date)
      ? scheduleDetailMap.get(item.date)
      : new Map();

    const venueMap = dateMap.has(item.venue_info)
      ? dateMap.get(item.venue_info)
      : new Map();

    let movieCode = item.code;
    if (movieCodeCount.has(movieCode)) {
      const count = movieCodeCount.get(movieCode);
      movieCodeCount.set(movieCode, count + 1);
      movieCode = `${movieCode}_${count + 1}`;
    } else {
      movieCodeCount.set(movieCode, 1);
    }

    venueMap.set(movieCode, item);
    dateMap.set(item.venue_info, venueMap);
    scheduleDetailMap.set(item.date, dateMap);
  });

  const testData = Array.from(scheduleDetailMap, ([date, venues]) => ({
    date,
    venue: Array.from(venues, ([name, screens]) => ({
      venueName: name,
      screens: Array.from(screens, ([screenName, screenInfo]) => ({
        screenTitle: screenName,
        filmTitle: screenInfo.movie_name,
        startTime: screenInfo.start_time,
        duration: screenInfo.screen_time,
        pageLocation: screenInfo.page_number,
        movieType: screenInfo.movie_type,
        filmDetailsText: 3,
        filmTitleText: 4,
        movieLink: screenInfo.movie_link,
      })),
    })),
  }));

  const parsedSchedule = testData
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item, index) => {
      item.id = index;
      item.venue.forEach((venue, i) => {
        venue.id = i;
        venue.screens.forEach((screen, ii) => {
          screen.customized = false;
          screen.id = ii;
        });
      });
      return item;
    });

  return parsedSchedule;
};

const parseGridScreensHelper = async (lines) => {
  const movieInfo = [];

  lines.forEach((line, i) => {
    if (i === lines.length - 1) return;

    const row = line.split("\t");

    // if (row.length < 9) {
    //   console.error("Skipping invalid row:", row);
    //   return;
    // }

    const [
      dateStr,
      movie_name,
      code,
      screen_time_min,
      screen_time,
      movie_type,
      start_time,
      venue_info,
      page_number,
      movie_link = "",
    ] = row;

    const date = new Date(dateStr);
    const formattedDate =
      date.toLocaleDateString("en-CA", { weekday: "long" }) +
      ", " +
      date.toLocaleDateString("en-CA", { month: "long", day: "numeric" });

    const node = new Node(
      formattedDate,
      movie_name,
      code,
      screen_time_min,
      screen_time,
      movie_type,
      start_time,
      venue_info,
      page_number.replace("\r", ""),
      row.length === 10 ? movie_link : ""
    );

    movieInfo.push(node);
  });

  return createMap(movieInfo);
};

const mapVenueNameHelper = async (parsedSchedule, parsedGridVenues) => {
  return parsedSchedule.map((entry) => {
    entry.venue = entry.venue.map((venueEntry) => {
      return {
        ...venueEntry,
        venueName: parsedGridVenues.has(venueEntry.venueName)
          ? parsedGridVenues.get(venueEntry.venueName)
          : venueEntry.venueName,
      };
    });
    return entry;
  });
};

export { parseGridScreensHelper, mapVenueNameHelper };

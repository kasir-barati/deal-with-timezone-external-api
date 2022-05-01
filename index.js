// @ts-check
const { DateTime } = require("luxon");

const dt = DateTime.fromISO("2022-05-30T06:25:00", {
  zone: "America/New_York",
});

console.log(dt.toUTC().toString());

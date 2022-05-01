# Why this repo created?

I was trying to deal with [Partocrs][partocrs] responses, its date part. Let me to break it into this mini parts:

1. I mean [Partocrs][partocrs] sends date as a string, in this format: `2022-05-30T06:25:00`. The bottom line was that it sends me dates without offset.
2. Another bottleneck was class-validator[class-validator], based on my configurations - `enableImplicitConversion: true` - it was converting anything for me, including the Dates. So my clients could not send me strings without offset too.
3. In Prisma[prisma] I defined to convert all Dates to UTC and when I was inserting a new record/document into my database I had to do `new Date` because of typescript and then ORM does it one more time added to my convert. So that was a completely chaos. I was converting it to server timezone regardless of its timezone and prisma was converting wrong value to UTC. My app was under the effect of Entropy. :joy:

# What did I do?

Searched for a library to normalize [Partocrs][partocrs] responses, at least its Date part. I ends up with [luxon][luxon]. Its documentation was great IMO. So here is some notes I learned from its documentation:

- Bear with me here. Time zones are a pain in the ass.
- Server should works with UTC as I mentioned above
- Communications should be done in [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html)
- Client have to convert times to local time if needed.
- I need to get a save more info in `airports` table/collection rather `countries` (TBH I am not sure about this part, BTW my reason is that each airport can be in a different timezone in the same country):
  - IANA codes: Because [luxon][luxon] needs IANA code to convert this string `2022-05-30T06:25:00` to a correct date with timezone

# Dictionary

- What is offset? An offset is a difference between the local time and the UTC time, such as +5 (hours) or -12:30. They may be expressed directly in minutes, or in hours, or in a combination of minutes and hours. Here we'll use hours.
- What the heck is UTC? It is timezone 0

[partocrs]: (https://www.partocrs.com/)
[class-validator]: (https://github.com/typestack/class-validator)
[prisma]: (https://www.prisma.io/)
[luxon]: (https://moment.github.io/luxon)

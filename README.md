# Team Match
This is project for devhacks #1, held 1.5. - 4.5.2020. Project was inspired by stuggles of
people who were trying to find partner for hackaton. Project should be useful for future 
devhacks, and why not for other hackatons also.

## Project idea
Simply said, to create service where people who don't have coding partner / team for a hackaton,
they could either browse entries from others in similar situation, or submit their own entry to database.
Minimum amount userinformation is to be collected, and this doesn't require for example email at all.

Once partner is found, entry can be removed from listing by code that was given while adding entry.

Idea is to be able to search suitable entries, for example by skills (which should be represented like tags).

## What works, what doesn't work?
Almost everything works as intented. You are able to add entry to database, you can see listing of all entries
and you can delete your entry from database.

Thing that didn't get implemented was search from database. This is currently limitation of database engine, which
doesn't provide any search capabilities. One solution could be to load all database entries into memory, and do
searching in browser.

Originally I thought of adding feature to be able to send email through this service. However, we get so much spam
that I am fairly sure that everyone is happy to not provide email. This way it streamlines process a lot.

Form validation is also one aspect that could be added. Right now it trusts that everyone wants good for system,
instead of trying to break it in every possible way.

## What did I learn?
Project was quite good for learning DETA platform. I started tinkering with it at the beginning of devhacks,
and I am happy to have finished project with it.

Along DETA, I also learned Pug, templating engine for Express. Haven't used that ever before, so it was also
interesting opportunity to try something new.

## Used technologies
Main platform is DETA (https://deta.sh), which was both development environment and final deployment platform.
On DETA I used nodejs, express, pug and bootstrap. Database is DETA's internal implementation.
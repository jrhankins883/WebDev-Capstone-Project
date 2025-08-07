# REELPLAY - For all the movie geeks, film nerds, cinephiles, screen fiends, or anyone that just loves movies.

## Project Overview:
This is a Code:You Web Development Capstone Project. I’ve created a website that lets you search for an actor, director, or screenwriter’s filmography — or pick a genre and get five random movies. 
The site uses The Movie Database (TMDb) API to fetch accurate and up-to-date film data. I built this using HTML, CSS, and JavaScript — combining what I’ve learned in class with what I picked up when 
coding was just a hobby.

I hope you enjoy my little "movie geek" website!

## Project Organization
### Homepage
![Homepage](./screenshots/homepage.png)
Users will land here and choose between Find Your Favorite or Shuffle & Watch. The homepage is built with semantic HTML5 elements and CSS style using Flexbox. 
JavaScript is used to add event listeners to the homepage buttons, allowing the user to navigate to either of the pages when clicked.

### Find Your Favorite
![Find Your Favorite - Before](./screenshots/findFave-before.png)
This page was also designed using semantic HTML5 and CSS style with Flexbox. Users will select a role (Actor/Actress, Director, or Writer) from the dropdown menu, enter a name into the search bar, click on a
profile photo that appears and then their filmography will show up next to the profile photo. For example, you can search for someone like Ben Affleck who has a filmography for each option. You can choose 
Actor/Actress first, click search and his acting filmography will appear once his photo has been clicked. Switch his role to Director, click search and click the photo, and his directing filmography will appear. 
The same for his screenwriting credits too.

![Find Your Favorite - After](./screenshots/findFave-after.png)
This is an example of what the page will look like when a filmography has been successfuly retrieved. In order to get the profile photo and filmography returned, this page uses a form with JavaScript event 
handling to collect user input and the selected role. Upon submission, it sends a request to the backend, which fetches data from the TMDb API. Results are filtered based on the selected role (Actor, Director, 
Screenwriter), and the relevant profile and filmography are displayed using DOM manipulation. It handles empty inputs, invalid names, and resets the display when new searches are made.

### Shuffle & Watch
![Shuffle and Watch - Before](./screenshots/randomPicks-before.png)
This page was also designed using semantic HTML5 and CSS style with Flexbox. Users can select a genre and get 5 completely random movies returned from that genre. Designed for the people who are in the mood for
a certain kind of movie yet cannot decide on something to watch (myself included).

![Shuffle and Watch - After](./screenshots/randomPicks-after.png)
This is an example of what the page will look like when a user has clicked on a genre of their choice and receive five randomly selected movies. When a user clicks a genre button, the frontend sends a request to 
the backend with the selected genre ID. The backend then calls the TMDb “Discover” endpoint using the genre filter to retrieve movies. The backend filters the genre, fetches results, and returns a randomized list 
of 5 movies using Math.random(). These results are dynamically rendered on the page with their poster and title. The frontend dynamically renders these results using DOM manipulation, displaying each movie’s poster 
and title in styled cards.


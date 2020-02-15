# the-daily-mail

## App Name
Mongo Scraper

## App Overview

Mongo Scraper is a node.js web application that lets users view and leave a comment on the latest news from the Wall Street Journal.

* This app uses the below npm packages:

  * express

  * express-handlebars

  * mongoose

  * cheerio

  * axios

## App Instrustiions

1. Upon first visiting the site, users are given the option to scrape stories from the Wall Street Journal. When the "Scrape Articles" button is clicked, the latest articles are scraped from https://www.wsj.com/ via npm packages axios and cheerio and saved in the application's mongoDB. The following information is scraped and displayed for each article:

    * Headline - the title of the article

    * Summary - a short summary of the article

    * URL - the url to the original article

2. After scraping the latest WSJ articles, users can either clear the articles from the page or leave a comment on the articles. The comments are also saved to the database and associated with their articles allowing users to revisit the comments later on.
//Get Quotes from API
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loader
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//Show new quote
function newQuote() {
  loading();
  //Pick a random from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Searching for male terms and making them female

  //turn quote.text into an array this will make it easier to match the male terms and make them female
  //because if we tried to do .replace or .replaceAll it would replace parts of substrings as well
  let quoteArray = quote.text.split(" ");
  // now we are making a if statement to turn these generic terms into women specific terms
  console.log(quoteArray);
  let newArrayQuote = quoteArray.map((index) => {
    if (index === "he") {
      return "she";
    }
    if (index === "He") {
      return "She";
    }
    if (index === "him") {
      return "her";
    }
    if (index === "Him") {
      return "Her";
    }
    if (index === "men") {
      return "women";
    }
    if (index === "Men") {
      return "Women";
    }
    if (index === "man") {
      return "woman";
    }
    if (index === "Man") {
      return "Woman";
    }
    if (index === "himself") {
      return "herself";
    }
    if (index === "himself.") {
      return "herself.";
    } else {
      return index;
    }
  });
  //turning the newArrayQuote back into string
  let stringQuote = newArrayQuote.join(" ");

  console.log(stringQuote);

  //Check if Author field is blank and replace it with unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to determine the styling
  if (stringQuote.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //Set Quote, Hide Loader
  complete();

  quoteText.textContent = stringQuote;
}

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
    //catch error here
  }
}

//tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On load
getQuotes();

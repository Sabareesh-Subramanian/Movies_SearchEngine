GetMovieDetails = () => {
  let moviename = document.getElementById("inputname");
  console.log("moviename:", moviename.value);
  SearchResults(moviename.value);
  moviename.value = "";
};

async function SearchResults(movieName) {
  let res1 = await fetch(
    `http://www.omdbapi.com/?t=${movieName}&apikey=95dfc800`
  );
  let res2 = await res1.json();
  LoadResults(res2);
}

async function LoadResults(res) {
  //console.log(res);
  //let result = await res.json();
  var displaydiv = document.getElementById("displaydiv");
  console.log(res);
  if (res.Error == "Movie not found!") {
    displaydiv.innerHTML = "";
    let poster = document.createElement("img");
    poster.src =
      "https://i.pinimg.com/originals/b8/53/d8/b853d8810cc057da179e6bf8a0bd4ef5.png";
    displaydiv.append(poster);
  } else {
    displaydiv.innerHTML = "";
    let posterdiv = document.createElement("div");
    posterdiv.setAttribute("class", "posterdiv");
    posterdiv.innerHTML = "";
    let poster = document.createElement("img");
    poster.src = res.Poster;
    posterdiv.append(poster);

    let detailsdiv = document.createElement("div");
    detailsdiv.setAttribute("class", "detailsdiv");
    detailsdiv.innerHTML = "";
    let p_title = document.createElement("p");
    p_title.innerHTML = `Title: &nbsp ${res.Title}`;
    p_title.style.marginTop = "0%";
    let p_releaseddate = document.createElement("p");
    p_releaseddate.innerHTML = `Released Date: &nbsp ${res.Released}`;
    let p_runtime = document.createElement("p");
    p_runtime.innerHTML = `Runtime: &nbsp ${res.Runtime}`;
    let p_director = document.createElement("p");
    p_director.innerHTML = `Director: &nbsp ${res.Director}`;
    let p_genre = document.createElement("p");
    p_genre.innerHTML = `Genre: &nbsp ${res.Genre}`;
    let p_plot = document.createElement("p");
    p_plot.innerHTML = `Plot: &nbsp ${res.Plot}`;
    let p_imdb = document.createElement("p");
    p_imdb.innerHTML = `imdbRating: &nbsp ${res.imdbRating}`;
    let p_language = document.createElement("p");
    p_language.innerHTML = `Language: &nbsp ${res.Language}`;
    let p_actor = document.createElement("p");
    p_actor.innerHTML = `Cast & Crew: &nbsp ${res.Actors}`;
    let recommended = document.createElement("p");
    recommended.innerHTML = "SMART Recommended Movie";
    recommended.style.visibility = "hidden";
    recommended.style.color = "red";

    if (res.imdbRating > 8.5) {
      recommended.style.visibility = "visible";
      let flag = true;
      setInterval(function () {
        if (flag) {
          recommended.innerHTML = "";
          flag = false;
        } else {
          recommended.innerHTML = "SMART Recommended Movie";
          flag = true;
        }
      }, 1500);
    }

    detailsdiv.append(
      p_title,
      p_actor,
      p_director,
      p_releaseddate,
      p_runtime,
      p_genre,
      p_plot,
      p_language,
      p_imdb,
      recommended
    );

    displaydiv.append(posterdiv, detailsdiv);
  }
}

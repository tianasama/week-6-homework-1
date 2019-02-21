// client-side js
// run by the browser each time your view template is loaded

document.addEventListener("DOMContentLoaded", function(){
    
  fetch('/search-track').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
   //Display the track name
      var trackNameLink = document.createElement('a');
      var trackName = data.name;
      trackNameLink.innerText = data.external_urls.spotify + data.name;
      document.getElementById('search-track-container').appendChild(trackNameLink);
    
    // Display the artist name
    var artists = '';
    
    data.artists.forEach(function(item) {
      artists = artists + item.name + ' ';
    });
    
    let h5 = document.createElement('h5');
    h5.innerText = artists;
    document.getElementById('search-track-container').append(h5);
    
    // Display the album art
    //var img = $('<img/>');
    //img.attr('src', data.album.images[0].url);
    // img.appendTo('#search-track-container');
    
    
    //CONFUSED: Image outline showing up, but image itself not loading?
    var img = document.createElement('img');
    img.getAttribute('src', data.album.images[0].url);
    document.getElementById('search-track-container').appendChild(img);
    
  });
  

  
  
  
fetch('/audio-features').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // The audio features we want to show
    var keys = ["danceability", "energy", "acousticness", "speechiness", "loudness"]
    
    // Display the audio features - Question: What is the best way to carry out js in cases where there are multiple nested elements? i.e. <div><p><span>Content</div></p></span>
    keys.map(function(key, i) {
      if (data.hasOwnProperty(key)) {
        var feature = $('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
        feature.appendTo('#audio-features-container');
      }
    });
  });
  
  fetch('/artist').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    //Display the artist's image
    // var img = $('<img class="circle-image" />');
    // img.attr('src', data.images[0].url);
    // img.appendTo('#artist-container');
    
    //CONFUSED: Image outline showing up, but image itself not loading?
    var img = document.createElement('img');
    img.className = 'circle-image';
    document.querySelector('img').setAttribute('src', data.images[0].url);
    document.getElementById('artist-container').appendChild(img);
    
    
    
    // Display the artist name - JQUERY
    // var trackName = $('<h3>' + data.name + '</h3>');
    // trackName.appendTo('#artist-container');
    
    var trackName = document.createElement('h3')
    trackName.innerText = data.name
    document.getElementById('artist-container').appendChild(trackName);
    
    
    // Display the artist's genres - JQUERY
    data.genres.map(function(genre, i) {
      // var genreItem = $('<p>' + genre + '</p>');
      // genreItem.appendTo('#artist-container');
      
      var genreItem = document.createElement('p');
      genreItem.innerText = genre;
      document.getElementById('artist-container').appendChild(genreItem);
      console.log('yeah buddy');
      
    });
  });
  
  
fetch('/artist-top-tracks').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the audio features
    data.map(function(track, i) {
      // var trackName = $('<li>' + track.name + '</li>');
      // trackName.appendTo('#top-tracks-container');
      
      var trackName = document.createElement('li');
      trackName.innerText = track.name;
      document.getElementById('top-tracks-container').appendChild(trackName);
      
       });
      });
  
  
  fetch('/category-playlists').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the covers of the playlists; still unsure how to do ${c.name}
    data.forEach((c) => {
      $('#category-playlists-container').append(`<br><h1>${c.name}</h1><br>`) 
  //var playlistItem - document.createElement();  
  //document.getElementById('category-playlists-container').appendChild(x);
  
      c.data.playlists.items.map(function(playlist, i) {
      // var img = $('<img class="cover-image"/>');
      // img.attr('src', playlist.images[0].url);
      // img.appendTo('#category-playlists-container');
    
    
    //Same issue with images again! :( Hmmm.....will investigate later
      var img = document.createElement('img');
      img.addClass='cover-image';
      img.getAttribute('src', playlist.images[0].url);
      document.getElementById('category-playlists-container').appendChild(img);
    
    
      });
    });
  });
  
  });
  
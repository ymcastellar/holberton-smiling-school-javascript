function createQuotes(name, pic_url, text, title) {
  $('#addQuotes').append(`
    <div class="carousel-item">
        <div class="row justify-content-around">
            <div class="col-sm-1">
                <img class="rounded-circle mx-auto my-3 d-block" src="${pic_url}" width="150" height="150" alt="First slide">
            </div>
            <div class="col-sm-6 mx-3">
                <p>${text}</p>
                <p><span class="font-weight-bold">${name}</span><br>
                    <span class="font-italic">${title}</span></p>
            </div>
        </div>
    </div>
    `);
}

function createTutorials(
  id,
  thumb_url,
  title,
  subtitle,
  author_pic_url,
  author,
  duration,
  star
) {
  let row = 1;
  if (id > 4) {
    row = 2;
  }
  $('#addTutorials' + row).append(`
    <div class="mx-1 tutorial${id}">
        <div class="card video-card mx-auto my-3">
            <img class="card-img-top" src="${thumb_url}" alt="Thumbnail" width="255" height="154">
            <img class="play-img" src="images/play.png" alt="Play" width="64" height="64">
            <div class="card-body">
                <p class="font-weight-bold">${title}<br>
                    <span class="text-secondary font-14 font-weight-normal">${subtitle}</span>
                </p>
                <div class="row justify-content-start font-14 purple-text">
                    <div class="col-2">
                        <img class="rounded-circle" src="${author_pic_url}" width="30" height="30" alt="Profile" loading="lazy">
                    </div>
                    <div class="col mt-1">
                        ${author}
                    </div>
                </div>
                <div class="row justify-content-between mt-2">
                    <div class="col" id="stars-${id}">
                    </div>
                    <div class="col-4 text-right purple-text">
                        ${duration}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `);

  for (let i = 0; i < 5; i++) {
    if (i < star) {
      $('#stars-' + id).append(
        '<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy">'
      );
    } else {
      $('#stars-' + id).append(
        '<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy">'
      );
    }
  }
}

function createLatest(
  id,
  thumb_url,
  title,
  subtitle,
  author_pic_url,
  author,
  duration,
  star
) {
  for (let row = 1; row < 3; row++) {
    $('#addLatest' + row).append(`
      <div class="mx-1 tutorial${id}">
          <div class="card video-card mx-auto my-3">
              <img class="card-img-top" src="${thumb_url}" alt="Thumbnail" width="255" height="154">
              <img class="play-img" src="images/play.png" alt="Play" width="64" height="64">
              <div class="card-body">
                  <p class="font-weight-bold">${title}<br>
                      <span class="text-secondary font-14 font-weight-normal">${subtitle}</span>
                  </p>
                  <div class="row justify-content-start font-14 purple-text">
                      <div class="col-2">
                          <img class="rounded-circle" src="${author_pic_url}" width="30" height="30" alt="Profile" loading="lazy">
                      </div>
                      <div class="col mt-1">
                          ${author}
                      </div>
                  </div>
                  <div class="row justify-content-between mt-2">
                      <div class="col" id="stars-latest-${id}">
                      </div>
                      <div class="col-4 text-right purple-text">
                          ${duration}
                      </div>
                  </div>
              </div>
          </div>
      </div>
      `);
  }
  for (let i = 0; i < 5; i++) {
    if (i < star) {
      $(`#stars-latest-${id}:nth-child(1)`).append(
        '<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy">'
      );
    } else {
      $(`#stars-latest-${id}:nth-child(1)`).append(
        '<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy">'
      );
    }
  }
}

function createDropdowns(data) {
  $('.topicDefault').html(data.topics[0]);
  $('.sortDefault').html(data.sorts[0].replace('_', ' '));
  data.topics.forEach(function (topic) {
    $('#topicDropdown').append(
      `<a class="dropdown-item" sectionId="${topic}">${topic}</a>`
    );
  });
  data.sorts.forEach(function (sort) {
    $('#sortDropdown').append(
      `<a class="dropdown-item" sectionId="${sort}">${sort.replace(
        '_',
        ' '
      )}</a>`
    );
  });
  $('input').change(function () {
    displayCourseVideos(
      $('input').val(),
      $('.topicDefault').html(),
      $('.sortDefault').html().replace(' ', '_')
    );
  });
  $('#topicDropdown a').click(function () {
    $('.topicDefault').html($(this).attr('sectionId'));
    displayCourseVideos(
      $('input').val(),
      $('.topicDefault').html(),
      $('.sortDefault').html().replace(' ', '_')
    );
  });
  $('#sortDropdown a').click(function () {
    $('.sortDefault').html($(this).attr('sectionId').replace('_', ' '));
    displayCourseVideos(
      $('input').val(),
      $('.topicDefault').html(),
      $('.sortDefault').html().replace(' ', '_')
    );
  });
}

function displayCourseVideos(q, topic, sort) {
  $('.loader').show();
  $.ajax({
    type: 'GET',
    url: 'https://smileschool-api.hbtn.info/courses',
    dataType: 'json',
    data: {
      q,
      topic,
      sort,
    },
    success: function (response) {
      if (response.courses.length == 1) {
        $('#videoCount').html(`1 video`);
      } else {
        $('#videoCount').html(`${response.courses.length} videos`);
      }
      $('#courseResults').empty();
      response.courses.forEach(function (course) {
        $('#courseResults').append(`
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="card video-card my-3 mx-2">
                    <img class="card-img-top" src="${course.thumb_url}" alt="Thumbnail" width="255" height="154">
                    <img class="play-img" src="images/play.png" alt="Play" width="64" height="64">
                    <div class="card-body">
                        <p class="font-weight-bold">${course.title}<br>
                            <span class="text-secondary font-14 font-weight-normal">${course['sub-title']}</span>
                        </p>
                        <div class="row justify-content-start font-14 purple-text">
                            <div class="col-2">
                                <img class="rounded-circle" src="images/profile_1.jpg" width="30" height="30" alt="Profile 1" loading="lazy">
                            </div>
                            <div class="col mt-1">
                                ${course.author}
                            </div>
                        </div>
                        <div class="row justify-content-between mt-2">
                            <div class="col" id="stars-course-${course.id}">
                            </div>
                            <div class="col-4 text-right purple-text">
                                ${course.duration}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        for (let i = 0; i < 5; i++) {
          if (i < course.star) {
            $(`#stars-course-${course.id}:nth-child(1)`).append(
              '<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy">'
            );
          } else {
            $(`#stars-course-${course.id}:nth-child(1)`).append(
              '<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy">'
            );
          }
        }
      });
      $('.loader').hide();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function queryQuotes() {
  $('.loader').show();
  let request = new XMLHttpRequest();
  let xmlDoc;
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      xmlDoc = request.responseXML;
      for (let i = 0; i < xmlDoc.getElementsByTagName('quote').length; i++) {
        createQuotes(
          xmlDoc.getElementsByTagName('name')[i].textContent,
          xmlDoc.getElementsByTagName('pic_url')[i].textContent,
          xmlDoc.getElementsByTagName('text')[i].textContent,
          xmlDoc.getElementsByTagName('title')[i].textContent
        );
      }
      $('.carousel .carousel-item:first').addClass('active');
      $('.loader').hide();
    }
  };
  request.open('GET', 'https://smileschool-api.hbtn.info/xml/quotes');
  request.send();
}

function queryTutorials() {
  $('.loader').show();
  let request = new XMLHttpRequest();
  let xmlDoc;
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      xmlDoc = request.responseXML;
      for (let i = 0; i < xmlDoc.getElementsByTagName('video').length; i++) {
        createTutorials(
          xmlDoc.getElementsByTagName('video')[i].getAttribute('id'),
          xmlDoc.getElementsByTagName('thumb_url')[i].textContent,
          xmlDoc.getElementsByTagName('title')[i].textContent,
          xmlDoc.getElementsByTagName('sub-title')[i].textContent,
          xmlDoc.getElementsByTagName('author_pic_url')[i].textContent,
          xmlDoc.getElementsByTagName('author')[i].textContent,
          xmlDoc.getElementsByTagName('duration')[i].textContent,
          xmlDoc.getElementsByTagName('video')[i].getAttribute('star')
        );
      }
      $('.tutorial2').addClass('d-none d-md-flex');
      $('.tutorial3').addClass('d-none d-lg-flex');
      $('.tutorial4').addClass('d-none d-lg-flex');
      $('.tutorial6').addClass('d-none d-md-flex');
      $('.tutorial7').addClass('d-none d-lg-flex');
      $('.loader').hide();
      $('.carousel .carousel-item:first').addClass('active');
      $('.loader').hide();
    }
  };
  request.open(
    'GET',
    'https://smileschool-api.hbtn.info/xml/popular-tutorials'
  );
  request.send();
}

function queryLatest() {
  $('.loader').show();

  let request = new XMLHttpRequest();
  let xmlDoc;
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      xmlDoc = request.responseXML;
      for (let i = 0; i < xmlDoc.getElementsByTagName('video').length; i++) {
        createLatest(
          xmlDoc.getElementsByTagName('video')[i].getAttribute('id'),
          xmlDoc.getElementsByTagName('thumb_url')[i].textContent,
          xmlDoc.getElementsByTagName('title')[i].textContent,
          xmlDoc.getElementsByTagName('sub-title')[i].textContent,
          xmlDoc.getElementsByTagName('author_pic_url')[i].textContent,
          xmlDoc.getElementsByTagName('author')[i].textContent,
          xmlDoc.getElementsByTagName('duration')[i].textContent,
          xmlDoc.getElementsByTagName('video')[i].getAttribute('star')
        );
      }
      $('.latest2').addClass('d-none d-md-flex');
      $('.latest3').addClass('d-none d-lg-flex');
      $('.latest4').addClass('d-none d-lg-flex');
      $('.loader').hide();
    }
  };
  request.open('GET', 'https://smileschool-api.hbtn.info/xml/latest-videos');
  request.send();
}

function queryCourses() {
  $('.loader').show();
  $.ajax({
    type: 'GET',
    url: 'https://smileschool-api.hbtn.info/courses',
    dataType: 'json',
    success: function (response) {
      createDropdowns(response);
      $('.loader').hide();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

queryQuotes();
queryTutorials();
queryLatest();
queryCourses();
displayCourseVideos();

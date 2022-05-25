let headersList = {
  Accept: 'application/json',
};

fetch(
  'https://jobsearch.api.jobtechdev.se/search?municipality=1880&municipality=1980&municipality=0484&q=.NET&offset=0&limit=100&sort=pubdate-desc',
  {
    method: 'GET',
    headers: headersList,
  }
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  })
  .then((responseJson) => {
    var jobs = responseJson.hits;
    console.log(jobs);
    let table = '<table class="table table-striped">';
    table +=
      '<tr><th>Titel</th><th>Företag</th><th>Sök senast</th><th>Typ</th><th>Ort</th></tr>';
    jobs.forEach((item) => {
      table += `<tr>
      
          <td><a href="${item.webpage_url}" target="_blank">${item.headline}</a></td>
          <td>${item.employer.name}</td>
          <td>${item.application_deadline}</td>
          <td>${item.duration.label}</td>
          <td>${item.workplace_address.municipality}</td>
      </tr>
      `;
    });
    table += '</table>';
    document.getElementById('main').innerHTML = table;
  })
  .catch((error) => {
    console.log(error);
  });

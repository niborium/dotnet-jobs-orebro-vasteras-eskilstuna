fetch(
  'https://jobsearch.api.jobtechdev.se/search?municipality=1880&municipality=1980&municipality=0484&q=.NET&offset=0&limit=100&sort=pubdate-desc',
  {
    method: 'GET',
    Accept: 'application/json',
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
    let table = '<table class="table table-striped"><tbody id="tableData">';
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
    table += '<tbody></table>';
    document.getElementById('main').innerHTML = table;
  })
  .catch((error) => {
    console.log(error);
  });

info = `<h1>.NET jobb i Västerås, Örebro & Eskilstuna via Arbetsförmedlingen</h1>
  <div id="morejobs">
    <a href="https://www.linkedin.com/jobs/" target="_blank" class="btn btn-primary" role="button">Sök fler jobb på LinkedIn</a>
    <a href="https://ledigajobb.se/" target="_blank" class="btn btn-primary" role="button">Sök fler jobb på ledigajobb</a>
    <a href="https://se.indeed.com/" target="_blank" class="btn btn-primary" role="button">Sök fler jobb på indeed</a>
    </div><br>`;
document.getElementById('info').innerHTML = info;

$(document).ready(function () {
  $('#myInput').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#tableData tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

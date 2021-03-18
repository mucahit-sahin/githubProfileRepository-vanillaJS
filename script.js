var closePanel = document.createElement("div");
closePanel.style.display = "none";
closePanel.style.background = "transparent";
closePanel.style.position = "absolute";
closePanel.style.left = 0;
closePanel.style.top = 0;
closePanel.style.width = "100vw";
closePanel.style.height = "100vh";
closePanel.style.zIndex = 20;

var container = document.querySelector(".container");
container.appendChild(closePanel);

var navActionMenu = document.querySelector(".navActionMenu");
var navProfileAvatar = document.querySelector(".navProfileAvatar");

navActionMenu.addEventListener("click", () => {
  closePanel.style.display = "block";
});
navProfileAvatar.addEventListener("click", () => {
  closePanel.style.display = "block";
});
closePanel.addEventListener("click", () => {
  closePanel.style.display = "none";
  navActionMenu.open = false;
  navProfileAvatar.open = false;
});

/* Github Api GET Repositories*/

var profileRepositories = document.querySelector(".profileRepositories");
var repoList = [];
getGithubRepos();

function getGithubRepos() {
  fetch("https://api.github.com/users/mucahit-sahin/repos")
    .then((response) => response.json())
    .then((data) => {
      data.map((repo) => {
        repoList.push(repo);
        var repositoryElement = `<div class="repository">
        <div class="repositoryHeader">
            <a href="${repo.html_url}">${repo.name}</a>
            <div>
                <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16"
                    height="16" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                    </path>
                </svg>
                <span>Star</span>
            </div>
        </div>
        ${
          repo.description !== null
            ? `
            <div class="repositoryDescription">
              <span>${repo.description}</span>
            </div>
          `
            : ``
        }
        <div class="repositoryInfo">
            <div class="programLang">
                <span> </span>
                <span>${repo.language}</span>
            </div>
            <div class="repositoryDate">
                <span>${repo.updated_at}</span>
            </div>
        </div>
    </div>`;
        profileRepositories.innerHTML += repositoryElement;
      });
    });
}

/*Repository Filter */

var searchInput = document.querySelector(".profileReposColHeader input");
console.log(searchInput);
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  let pattern = new RegExp(e.target.value);
  var filterList = repoList.filter(function (repo) {
    return repo.name.match(pattern);
  });
  profileRepositories.innerHTML = "";
  filterList.map((repo) => {
    var repositoryElement = `<div class="repository">
    <div class="repositoryHeader">
        <a>${repo.name}</a>
        <div>
            <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16"
                height="16" aria-hidden="true">
                <path fill-rule="evenodd"
                    d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                </path>
            </svg>
            <span>Star</span>
        </div>
    </div>
    ${
      repo.description !== null
        ? `
        <div class="repositoryDescription">
          <span>${repo.description}</span>
        </div>
      `
        : ``
    }
    <div class="repositoryInfo">
        <div class="programLang">
            <span> </span>
            <span>${repo.language}</span>
        </div>
        <div class="repositoryDate">
            <span>${repo.updated_at}</span>
        </div>
    </div>
</div>`;
    profileRepositories.innerHTML += repositoryElement;
  });
});

/* Mobile Menu Open */

var menuButtonDiv = document.querySelector(".menu");
var menuButton = document.querySelector(".mobileMenu button");

menuButton.addEventListener("click", () => {
  menuButtonDiv.classList.toggle("active");
});

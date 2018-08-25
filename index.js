var nunjucks = require("nunjucks");

// nunjucks.configure({ autoescape: true });
// nunjucks.renderString("Hello {{ username }}", { username: "James" });

// console.log(nunjucks.render("index.njk", { dinner: "Pizza" }));

nunjucks.render("index.njk", {
  page_title: "Cool Product",
  features: [
    {
      name: "Speed",
      description: "It's fast."
    },
    {
      name: "Reliability",
      description: "You can count on it."
    },
    {
      name: "Security",
      description: "You don't have to worry about it."
    }
  ]
});

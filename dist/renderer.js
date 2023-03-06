class Renderer {
  render(recipes) {
    $("#container").empty();
    $("#notFound").empty();
    const source = $("#releventRecipes").html();
    const template = Handlebars.compile(source);
    let newElem = template({ recipes });
    $("#container").append(newElem);
  }
}

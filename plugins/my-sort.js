module.exports =
  function mySort (pages, metalsmith) { // todo : manual sort as the collection sort is messed up..
    var pList = metalsmith._metadata.collections.articles
    pList.sort(
      function (a, b) {
        return new Date(b.published) - new Date(a.published)
      }
    )
    pList.reverse() // reverse only for sorting code readability.

    for (var i = 0; i < pList.length; i++) {
      // pList[i].next = null
      // pList[i].previous = null
      if (i === 0) {
        pList[i].next = pList[i + 1]
        pList[i].previous = null
      } else if (i === pList.length - 1) {
        pList[i].previous = pList[i - 1]
        pList[i].next = null
      } else {
        pList[i].next = pList[i + 1]
        pList[i].previous = pList[i - 1]
      }
    }
    pList.reverse() // reverse back for index page..
  }

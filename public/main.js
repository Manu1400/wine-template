jQuery.getJSON( "wines.json", function( data ) {
  var container = jQuery('.row.wines .row.wine')

  // For future, to build dynamic filters
  /*
  function getRegions() {
    var regions = []
    data.forEach(function (data, i) {
      if (regions.indexOf(data.region) == -1) {
          regions.push(data.region)
      }
    })
    return regions
  }
  */

  data.forEach(function (data, i) {
    // Add content from JSON
    var clone = container.find(".wine-item").clone()

    clone.find(".content")
      .html(data.domain + '<br>' +
            data.appellation + '<br>' +
            data.millesime
      )
    clone.find(".price_vp_bundle").text(data.price_vp_bundle)

    // Add all attributes (to can filter by all attributes)
    Object.keys(data).forEach(function (key) {
      clone.attr(key, data[key])
    })

    clone.prependTo(".wines")
  })

  // mask template
  container.hide()

  function updateCounter() {
    var nbArticles = jQuery(".wine-item:visible").length
    jQuery(".navbar-brand").text(nbArticles + " articles")
  }

  function getArr(filterType) {
    var arr = []

    jQuery(".form-check-"+filterType+" input").each(function() {
      if ($(this).is(':checked')) {
        var value = $(this).attr("value")
        //console.log(value)
        arr.push("["+filterType+"="+value+"]")
      }
    })

    return arr
  }

  function updateFilter() {
    // display all
    $(".wine-item").show()

    var types = ["color", "price_range", "region"]
    types.forEach(function (type) {
      var arr = getArr(type)
      if (arr.length) {
        // filter
        $(".wine-item:not("+arr.join(',')+")").hide()
      }
    })

    // then update counter
    updateCounter()
  }

  // first time
  updateCounter()

  jQuery(".form-check input").on('change', updateFilter)
})

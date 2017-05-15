document.onreadystatechange = function(e) {
  if (document.readyState != "complete") {
    var all = document.getElementsByTagName("*");
    for (var i = 0, max = all.length; i < max; i++) {
      set_ele(all[i]);
    }
  }
}

function check_element(ele) {
  var all = document.getElementsByTagName("*");
  var totalele = all.length;
  var per_inc = 100 / all.length;
  var $progressBar = $("#progress-bar"); 
  var $progressPercent = $("#progress-bar .percent"); 
  var $progressWidth= $("#progress-bar input[name=progress_width]"); 
  if ($(ele).on()) {
    var prog_width = per_inc + Number($progressWidth.val());
    $progressWidth.val(prog_width);
    $progressPercent.css('width', prog_width + '%');

    if(Math.round(prog_width) >= 100) {
      $progressBar.fadeOut('slow');
    }
    // $progressPercent.animate({
    //   width: prog_width + "%"
    // }, 5, function() {
    //   if ($progressPercent.attr('style') ==  'width: 100%;' ) {
    //     $progressBar.fadeOut("slow");
    //   }
    // });
  } else {
    set_ele(ele);
  }
}

function set_ele(set_element) {
  check_element(set_element);
}

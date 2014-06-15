$(function () {

 var nextDataNumber = 5;

 var ulNode = $('ul.timeline');

 function initLiNodes() {
     var liNodes = ulNode.find('li'),
         count = liNodes.length,
         i, liNode, leftCount = nextDataNumber * 20;
     for (i = 0; i < count; i++) {
         liNode = $(liNodes.get(i));
         if (i % 2 !== 0) {
             liNode.addClass('alt');
         } else {
             liNode.removeClass('alt');
         }
//         liNode.find('.day').text(leftCount + count - i);
     }
 }

 initLiNodes();

});

$(document).ready(function(){
    $("#polzunok").slider({
        animate: "slow",
        range: true,
        values: [ 10, 65 ],
        slide : function(event, ui) {
            $("#result-polzunok").text("$" + ui.values[ 0 ]  );
            $("#result-polzunok_2").text("$"+ ui.values[ 1 ] );
        }
    });

});
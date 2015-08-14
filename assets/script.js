$("#response").hide();

$("#send").click(function() {
    $.ajax({
        type: "POST",
        url: "/send",
        data: {
            recipient: $("#recipient").val(),
            content: $("#content").val()
        },
        success: function(res) {
            if(typeof res == "object") res = JSON.parse(res);
            $("#response").val(res);
            $("#response").show();
        }
    });
});

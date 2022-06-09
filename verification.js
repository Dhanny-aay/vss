var result;
$('#sendotp').one("click", function(){
    var phone_number = $("#phone_number").val();
    if (phone_number.length > 10 && phone_number != null){
        $(".btn_warning").show();
        timer(60);
        $(".timer").show();
        disableResend()
        $.ajax({
            type: 'POST',
            url : "https://cice-web-gateway-nodejs.herokuapp.com/v1/auth/start-phone-number-verification",
            data: JSON.stringify({
                phone_number
            }),
            datatype:"json",
            contentType: "application/json",
            success:function(status){
                result = status;
                console.log(status);

                if (status = true){
                    document.getElementById("status").innerHTML = result.message;
                    
                }
            },
            error: function(){
                document.getElementById("status").innerHTML="Please check number and try again";
                return false;
            },
        })   
    }
});
    $('#sendotp').one('click',function(){
      
        var phone_number = $('#phone_number').val()
        var verification_code = $('#otpbox').val();
        var verification_id = result.data.verification_id;
        if (otp.length == 6 && otp != null){
            $.ajax({
                url:"http://cice-web-gateway-nodejs.herokuapp.com/v1/auth/complete-phone-number-verification",
                type:"POST",
                data:JSON.stringify({
                    phone_number,
                    verification_id,
                      verification_code,
                      
                    }),
                datatype:"json",
                contentType: "application/json",

                success:function(){
                    console.log();
                    document.getElementById("status").innerHTML="VErified";
                    window.open("alertpage.html")
                    
                },
                error:function(){
                    console.log()
                    document.getElementById("status").innerHTML="Please OTP and try again";
                    ;
                },
            });
        };
});

    // resend otp bit 
    $('#resendotp').on('click', function(){
        timer(60);
        disableResend()
        var phone_number = $("#phone_number").val();
            $.ajax({
                url:"https://cice-web-gateway-nodejs.herokuapp.com/v1/auth/start-phone-number-verification",
                type:"POST",
                data: JSON.stringify({
                    phone_number
                }),
                datatype:"json",
                contentType: "application/json",

                success: function(status){
                    result = status;
                    console.log(status);
                    document.getElementById("status").innerHTML=result.message;
                },
                error: function(){
                    document.getElementById("status").innerHTML="Please check number and try again";
                    return false;
                }
            });
    });
    function disableResend(){
        $("#resendotp").attr("disabled", true);
        timer(60);

        setTimeout(function(){
            $("#resendotp").removeAttr("disabled");

        },60000);
    }
// timer
let timerOn = true;

function timer(remaining){
    var m= Math.floor(remaining/60);
    var s= remaining % 60;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer').innerHTML = m + ':' + s;
    remaining -=1;

    if(remaining >= 0 && timerOn) {
        setTimeout(function(){
            timer(remaining);
        }, 1000);
        return;
    }

} 






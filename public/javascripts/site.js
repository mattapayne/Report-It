$(function() {
    var countDown = window.session_length;
    var INTERVAL = 1000;
    var MINIMUM = 30000;
    var warningDialogVisible = false;
    var declineSessionExtension = false;
    
    $('a#remaining-session-time').on('click', function(e) {
        e.preventDefault();
        $.get('/session_keepalive', function() {
            countDown = window.session_length;
        });
    });
    
    $('#session-timeout-dialog').on('shown.bs.modal', function() {
        warningDialogVisible = true;
        $("#extend-session-button").on('click', extendSession);
        $("#no-extend-session-button").on('click', doNotExtendSession);
    });
    
    $('#session-timeout-dialog').on('hidden.bs.modal', function() {
        warningDialogVisible = false;
        $("#extend-session-button").off('click', extendSession);
        $("#no-extend-session-button").off('click', doNotExtendSession);
    });
    
    var doNotExtendSession = function() {
        declineSessionExtension = true;
        $("#session-timeout-dialog").modal('hide');
    };
    
    var extendSession = function() {
        $.get('/session_keepalive', function() {
            countDown = window.session_length;
            $("#session-timeout-dialog").modal('hide');
        });
    };
    
    var showWarningDialog = function() {
        $("#session-timeout-dialog").modal({
            show: true
        })
    };
    
    var displayRemaining = function(remaining) {
        if (remaining <= 0) {
            return;
        }
        
        var format = remaining > 60000 ? 'Minutes' : 'Seconds'
        var obj = moment.duration(remaining, 'milliseconds');
        
        var timeRemaining = Math.floor(obj["as" + format]());
        
        $("a#remaining-session-time").
            text("Time remaining in your session: " + timeRemaining + " " + format.toLowerCase());
        
        if (warningDialogVisible) {
            $("#session-timeout-dialog #session-time-remaining").
                text("Your session will expire in " + timeRemaining + " " + format.toLowerCase() + ".");
        }
    };
    
    var checkForSessionExpiry = function() {
          countDown -= INTERVAL;
          displayRemaining(countDown);
          
          if (countDown <= 0) {
            //session expired - redirect to landing page
            window.location = '/';
          }
          if (countDown <= MINIMUM && !warningDialogVisible && !declineSessionExtension) {
            showWarningDialog();
          }
          
          setTimeout(checkForSessionExpiry, INTERVAL);
    };
    
    setTimeout(checkForSessionExpiry, INTERVAL);
});
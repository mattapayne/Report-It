(function(w, _) {
    var units = [
        { label: 'milliseconds', mod: 1000, order: 5 },
        { label: 'seconds', mod: 60, order: 4 },
        { label: 'minutes', mod: 60, order: 3 },
        { label: 'hours', mod: 24, order: 2 },
        { label: 'days', mod: 7, order: 1 },
        { label: 'weeks', mod: 52, order: 0 }
    ];
    
    w.friendlyTime = function(milliseconds) {
        var x = milliseconds;
        var durations = [];
        
        for (var i=0; i < units.length; i++) {
            var tmp = x % units[i].mod;
            durations.push({label: units[i].label, value: tmp, order: units[i].order });
            x = (x - tmp) / units[i].mod;
        }
        
        durations = _.map(_.reject(_.sortBy(durations, function(unit) {
            return unit.order
        }), function(unit) {
            return unit.value <= 0;    
        }), function(unit) {
            return unit.value + " " + unit.label;    
        });
        
        return durations.join(', ');
    }
})(window, _);

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
        
        var timeRemaining = window.friendlyTime(remaining);
        
        $("a#remaining-session-time").
            text("Time remaining in your session: " + timeRemaining);
        
        if (warningDialogVisible) {
            $("#session-timeout-dialog #session-time-remaining").
                text("Your session will expire in " + timeRemaining);
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
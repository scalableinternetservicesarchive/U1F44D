//= require jquery

/*
 * Retrieve a cookie.
 *
 * @param string c_name Cookie name
 * @return mixed The cookie value, if set, otherwise null.
 */
var get_cookie = function( c_name ) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + c_name + '=');
    if (parts.length == 2) return parts.pop().split(";").shift();
};

/**
 * Set a cookie.
 * We use sensible defaults here, and set the cookie to the `/` path for a date
 * absurdly far into the future.
 *
 * @param string c_name Cookie name
 * @param string c_val Cookie value
 * @return void
 */
var set_cookie = function( c_name, c_val ) {
    document.cookie = c_name + '=' + c_val + '; expires=Wed, 1 Jan 2020 00:00:00 UTC; path=/'
}

$( document ).ready( function() {
    // First, let's see what the current values are
    $( '#browser_cookie strong' ).html( get_cookie( 'snapyak_sid' ) );
    $( '#browser_local strong' ).html( localStorage.getItem( 'snapyak_sid' ) );

    // Does this browser support local storage?
    if( typeof( Storage ) !== 'undefined' ) {
        // Now, let's make sure that local storage matches the cookie,
        // if it's empty. This saves the session information in localstorage
        // to make it a little more persistent.
        if( !localStorage.getItem( 'snapyak_sid' ) && get_cookie( 'snapyak_sid' ) ) {
            localStorage.setItem( 'snapyak_sid', get_cookie( 'snapyak_sid' ) );
        }

        // Finally, let's make sure the cookie matches local storage, if
        // the opposite is true. This is useful for "restoring" session information
        // if the user happens to clear their cookies, because it's harder
        // to clear localstorage inadvertantly.
        if( !get_cookie( 'snapyak_sid' ) && localStorage.getItem( 'snapyak_sid' ) ) {
           set_cookie( 'snapyak_sid', localStorage.getItem( 'snapyak_sid' ) ); 
        }

        // If the cookie and local storage don't match, blow away the cookie.
        if( get_cookie( 'snapyak_sid' ) && localStorage.getItem( 'snapyak_sid' ) && get_cookie( 'snapyak_sid' ) !== localStorage.getItem( 'snapyak_sid' ) ) {
            set_cookie( 'snapyak_sid', localStorage.getItem( 'snapyak_sid' ) );
        }
    }
} );

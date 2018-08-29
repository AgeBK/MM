// Check for browser support of service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./src/sw.js')
    .then(function(registration) {
      console.log(
        'Hooray. Registration successful, scope is:',
        registration.scope
      );
    })
    .catch(function(err) {
      console.log('Whoops. Service worker registration failed, error:', err);
    });

    document.getElementById();
    function funcName(){
      
    } 
    (function(){
      


    })()    

    
}

export let consoleColorfulMessage = function (msg) {
    let style = [
        'padding : 30px 20px',
        'margin : 20px 0',
        'font-size : 50px',
        'font-weight : bold',
        'text-align : center',
        'color : #9370DB'
    ].join(';');

    console.log('%c ' + msg, style);
}
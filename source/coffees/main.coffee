$ ->
    console.log("DOM is ready")
    console.log("teste")
    console.log("terceiro console")
    $ '.div-lorem'
        .delay 5000
        .fadeOut 'slow'
        .delay 5000
        .fadeIn 'slow'
    $ '#nav'
        .delay 5000
        .fadeOut 'slow'
        .delay 5000
        .fadeIn 'slow'
    $ '.lorem p' 
        .animate
            opacity: .2
            2000
            ->
                $ '.lorem'
                    .fadeOut 'slow'
                    .delay 2000
                    .fadeIn 'slow'
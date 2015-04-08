========================================
header          css .header
navigation      css .navigation
main            css .main-container
banner-panel    css .banner-panel
footer          css .footer
========================================

@ Header | *
----------------------------------------
header
    inside: screen 0px top left right
    height: 60px

@ Navigation | *
----------------------------------------
navigation
    inside: screen 0px left
    below: header 0px

@^ | desktop
----------------------------------------
navigation
    width: 300px
    aligned horizontally all: main
    near: main 0px left

@^ | tablet
----------------------------------------
navigation
    inside: screen 0px left right
    above: main 0px
    height: 75px

@^ | mobile
----------------------------------------
navigation
    inside: screen 0px left right
    above: main 0px
    height: > 60px

@ Main section | desktop
----------------------------------------
main
    below: header 0px

@^ | tablet
----------------------------------------
main
    inside: screen 0px left

@^ | mobile
----------------------------------------
main
    inside: screen 0px left right
    above: banner-panel 0px


@ Banner | desktop
----------------------------------------
banner-panel
    below: header 0px

@^ | desktop, tablet
----------------------------------------
banner-panel
    inside: screen 0px right
    width: 300px
    near: main 0px right
    aligned horizontally all: main

@^ | tablet
----------------------------------------
banner-panel
    below: navigation 0px

@^ | mobile
----------------------------------------
banner-panel
    inside: screen 0px left right
    height: > 50px

@ Footer | *
----------------------------------------
footer
    % inside: screen 0px left right
    below: banner-panel 0px
    height: 100px

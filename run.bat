title Helium Console
color 0D
@echo off
cls
:foreverrun
cls
set /P c=Do you want this bot to automatically restart on error? [Y/N/Q]
if /I "%c%" EQU "Y" goto :forever
if /I "%c%" EQU "N" goto :once
if /I "%c%" EQU "Q" goto :quit
goto :foreverrun

:forever
cls
echo Launching Helium... PressCtrl + C to kill the process.
node Helium.js
goto :forever

:once
cls
echo Launching Helium...
node Helium.js
goto :foreverrun

:quit
cls
echo Exited.
echo Thanks for trying out Helium.

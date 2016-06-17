title Helium Console
color 0D
@echo off
:foreverrun
cls
set /P c=Do you want this bot to automatically restart on error? [Y/N/Q]
if /I "%c%" EQU "Y" goto :forever
if /I "%c%" EQU "N" goto :once
if /I "%c%" EQU "Q" goto :quit
goto :foreverrun

:forever
cls
echo Launching Helium... (Forever Run enabled. Quit application by pressing CTRL + C)
node Helium.js
goto :forever

:once
cls
echo Launching Helium...
node Helium.js
goto :foreverrun

:quit
cls
echo OK! I'm quitting the application now.
echo Thanks for trying out Helium.

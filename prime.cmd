@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\cli\prime.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\cli\prime.js" %*
)
@echo off
set VMNAME=Ubuntu26_04_1_RAW
set OUT=Ubuntu26_04_1_RAW.ova

echo OVA export: %VMNAME% -^> %OUT%
VBoxManage export "%VMNAME%" --output "%OUT%" --ovf20

if errorlevel 1 (
  echo.
  echo HIBA: az export nem sikerult.
  echo Ellenorizd a VM nevet es hogy ki van-e kapcsolva.
  pause
  exit /b 1
)

echo.
echo Kesz: %OUT%
certutil -hashfile "%OUT%" SHA256
pause

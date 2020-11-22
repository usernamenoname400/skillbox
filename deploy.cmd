echo Build site
call npm run build
if %errorlevel% neq 0 exit /b %errorlevel%

cd dist

echo Init git
git init
if %errorlevel% neq 0 exit /b %errorlevel%

rem Добавляем настройку, чтобы git не переделывал и не ругался на перевод каретки
echo autocrlf = false >> .git\config

echo Add changes to git
git add -A
if %errorlevel% neq 0 exit /b %errorlevel%

echo Git commit
git commit -m "Deploy"
if %errorlevel% neq 0 exit /b %errorlevel%

git push -f https://github.com/usernamenoname400/vue-app.git master:gh-pages
if %errorlevel% neq 0 exit /b %errorlevel%

cd ..

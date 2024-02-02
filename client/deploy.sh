echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r  build/* root@128.199.123.86:/var/www/html/
echo "Done!"
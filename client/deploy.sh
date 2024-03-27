echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r  build/* root@128.199.126.249:/var/www/html/
echo "Done!"
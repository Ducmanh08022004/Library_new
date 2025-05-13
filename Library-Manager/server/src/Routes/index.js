const userRoute = require('../User/User.route');
const bookRoute = require('../Books/Book.route');
const borrowbooksRoute = require('../BorrowBooks/BorrowBooks.route');
const adminRoute = require('../Admin/Admin.route');
const notificationRoute = require('../Notifications/Notifications.route');


function route(app) {
    app.post('/api/register', userRoute);
    app.post('/api/login', userRoute);
    app.post('/api/resetpassword', userRoute);
    app.post('/api/forgotpassword', userRoute);

    app.get('/api/books', bookRoute);
    app.post('/api/createbook', bookRoute);
    app.get('/api/search', bookRoute);
    app.post('/api/delete', bookRoute);

    app.post('/api/borrowbooks', borrowbooksRoute);
    app.get('/api/getborrowbooks', borrowbooksRoute);

    // Admin
    app.get('/api/users', adminRoute);
    app.get('/api/bookss', adminRoute);

    app.get('/api/topauthor', adminRoute);
    app.get('/api/topbooks', adminRoute);

    //Notifications
    app.use('/api/notifications', notificationRoute);
    
}

module.exports = route;

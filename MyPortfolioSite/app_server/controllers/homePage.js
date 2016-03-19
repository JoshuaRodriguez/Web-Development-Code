module.exports.home = function(req, res) {
    res.render('layout', {
        title: 'Welcome to my Home Page',
        myFullName: 'Joshua Rodriguez',
        pageHeader: 'Home',
        skillsText: 'Web Developer - Mobile App Developer - Software Engineer'
    });
};
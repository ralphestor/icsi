module.exports.renderAbout = (req, res, next) => {
    res.render('about');
}

module.exports.renderAdmission = (req, res, next) => {
    res.render('admission');
}

module.exports.renderContact = (req, res, next) => {
    res.render('contact');
}

module.exports.renderArticles = (req, res, next) => {
    res.render('articles');
}

module.exports.renderNewPost = (req, res, next) => {
    res.render('./admin/newpost');
}
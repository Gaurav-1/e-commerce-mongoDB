const express = require('express');
const router = express.Router();

const {
    show_login,
    login_user,
    show_signup,
    signup_user,
    logout_user,
    verify_mail,
    change_password,
    update_password,
    send_forget_mail,
    forget_password,
} = require('../controllers/user_controller')



router
.route('/login')
.get(show_login)
.post(login_user)

router
.route('/signup')
.get(show_signup)
.post(signup_user)

router.post('/logout',logout_user);

router.get('/verify/:id',verify_mail);

router.route('/change_password/:id')
.get(change_password)
.post(update_password);

router.route('/change_password')
.get(change_password)
.post(update_password);


router.route('/forget_password')
.get(forget_password)
.post(send_forget_mail)


module.exports = router;
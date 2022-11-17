const passport = require('passport')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const sgMail = require('@sendgrid/mail')

exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect('/dashboard')
    }
    res.render('login', {
        title: 'Login'
    })
}

exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        res.redirect('/')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) {
            req.flash('errors', info)
            res.redirect('/')
        }
        req.logIn(user, (err) => {
            if (err) { return next(err) }
            req.flash('success', { msg: 'Success! You are logged in.' })
            res.redirect(req.session.returnTo || `/dashboard/${user.company}`)
        })
    })(req, res, next)
}

exports.logout = (req, res, next) => {
    // logout logic

    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.user = null
    req.session.save(function (err) {
        if (err) next(err)

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/')
        })
    })
}

exports.getAddUser = (req, res) => {
    // if (req.user.admin) {
    res.render('addUser', { title: 'Create Account' })
    // } else {
    //     res.redirect(`/dashboard/${req.user.company}`)
    // }
}

exports.getRecover = (req, res) => {
    res.render('recover', { title: 'Recover Account' })
}

// Recover Password - Generates token and sends password reset email
// Public

exports.recover = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(401).json({ message: `The email ${req.body.email} is not associated with any account.` })
        // Generate and set password reset token
        user.generatePasswordReset()
        // Save the updated user object
        user.save()
        let link = `http://${req.headers.host}/reset/${user.resetPasswordToken}`

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: req.body.email,
            from: process.env.FROM_EMAIL, // Use the email address or domain you verified above
            subject: 'Password change request',
            text: `Hey ${user.fName}, \n 
            Please click on the following link ${link} to reset your password. \n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        }
        await sgMail.send(msg);
        res.redirect('/')
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    }
}

// Reset Password - Validate password reset token and shows the password reset view
// Public

exports.reset = async (req, res) => {
    try {
        const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
        if (!user) return res.status(401).json({ message: 'Password reset token is invalid or has expired.' })

        // Redirect user to form with the email address
        res.render('reset', { user })
    } catch (error) {
        console.log(error)
    }
}

// Reset Password
// Public

exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
        if (!user) return res.status(401).json({ message: 'Password reset token is invalid or has expired.' })
        // Set new password
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        // Save
        user.save((err) => {
            if (err) return res.status(500).json({ message: err.message })

            // Send email
            const mailOptions = {
                to: user.email,
                from: process.env.FROM_EMAIL,
                subject: "Your password has been changed",
                text: `Hey ${user.fName}, \n
           This is a confirmation that the password for your account has been changed.\n`
            }

            sgMail.send(mailOptions, (error, result) => {
                if (error) return res.status(500).json({ message: error.message })
            })
        })
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

exports.postAddUser = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 chara cters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })

    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        res.redirect('/addUser')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company,
        password: req.body.password,
        admin: req.body.admin
    })

    User.findOne({
        $or: [
            { email: req.body.email }
        ]
    }, (err, existingUser) => {
        if (err) {
            return next(err)
        }
        if (existingUser) {
            req.flash('errors', { msg: 'Account with that email address or username already exists.' })
            res.redirect('/addUser')
        }
        user.save((err) => {
            if (err) { return next(err) }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err)
                }
                res.redirect(`/dashboard/${req.user.company}`)
            })
        })
    })
}